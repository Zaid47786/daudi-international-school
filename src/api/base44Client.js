/**
 * DIS — Standalone API Client (Asura Hosting backend)
 * Drop-in replacement for the Base44 SDK client.
 * All entity methods (.list, .filter, .get, .create, .update, .delete)
 * have identical signatures to the original Base44 SDK.
 */

const BASE_URL = import.meta.env.VITE_API_URL || "/api";

// ── Token storage ──────────────────────────────────────────────────────────────
function getToken() { return localStorage.getItem("dis_token"); }
function setToken(t) { localStorage.setItem("dis_token", t); }
function clearToken() { localStorage.removeItem("dis_token"); }

// ── Core fetch ─────────────────────────────────────────────────────────────────
async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    let errMsg = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      errMsg = body.error || errMsg;
    } catch { /* non-JSON error body */ }
    throw new Error(errMsg);
  }

  return res.json();
}

// ── Entity path map ────────────────────────────────────────────────────────────
const ENTITY_PATH = {
  Stat:             "/stats",
  Event:            "/events",
  GalleryPhoto:     "/gallery",
  BlogPost:         "/blog",
  Testimonial:      "/testimonials",
  SchoolSettings:   "/settings",
  AdmissionInquiry: "/inquiries",
};

// ── Entity factory — replicates base44.entities.X interface ───────────────────
function makeEntity(name) {
  const apiPath = ENTITY_PATH[name];
  if (!apiPath) throw new Error(`Unknown entity: "${name}". Check ENTITY_PATH in base44Client.js`);

  return {
    list: async (_sort, _limit) => apiFetch(apiPath),

    filter: async (filters = {}, _sort, _limit) => {
      const qs = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== undefined && v !== null) qs.set(k, String(v));
      });
      const q = qs.toString() ? `?${qs}` : "";
      return apiFetch(`${apiPath}${q}`);
    },

    get: async (id) => apiFetch(`${apiPath}/${id}`),

    create: async (data) =>
      apiFetch(apiPath, { method: "POST", body: JSON.stringify(data) }),

    bulkCreate: async (dataArray) =>
      Promise.all(
        dataArray.map((d) => apiFetch(apiPath, { method: "POST", body: JSON.stringify(d) }))
      ),

    update: async (id, data) =>
      apiFetch(`${apiPath}/${id}`, { method: "PUT", body: JSON.stringify(data) }),

    delete: async (id) =>
      apiFetch(`${apiPath}/${id}`, { method: "DELETE" }),

    schema: async () => ({}),
  };
}

// ── Auth ───────────────────────────────────────────────────────────────────────
const auth = {
  async me() {
    const token = getToken();
    if (!token) throw new Error("Not authenticated");
    return apiFetch("/auth/me");
  },

  async isAuthenticated() {
    try {
      await this.me();
      return true;
    } catch {
      return false;
    }
  },

  async login(email, password) {
    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setToken(data.token);
    return data.user;
  },

  logout(redirectUrl) {
    clearToken();
    window.location.href = redirectUrl || "/";
  },

  redirectToLogin(nextUrl) {
    clearToken();
    window.location.href = `/admin${nextUrl ? `?next=${encodeURIComponent(nextUrl)}` : ""}`;
  },

  async updateMe(data) {
    return apiFetch("/auth/me", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};

// ── Integrations shim ─────────────────────────────────────────────────────────
const integrations = {
  Core: {
    async UploadFile({ file }) {
      const token = getToken();
      const form = new FormData();
      form.append("file", file);
      const res = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: form,
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Upload failed");
      }
      return res.json();
    },

    async InvokeLLM() {
      throw new Error("InvokeLLM is not available in self-hosted mode.");
    },

    async SendEmail() {
      throw new Error("SendEmail is not configured in self-hosted mode.");
    },
  },
};

// ── Exported base44 object — identical shape to Base44 SDK ────────────────────
export const base44 = {
  entities: new Proxy(
    {},
    {
      get(_, name) {
        return makeEntity(String(name));
      },
    }
  ),
  auth,
  integrations,
  analytics: {
    track(event) {
      if (import.meta.env.DEV) console.debug("[analytics]", event);
    },
  },
};

export default base44;
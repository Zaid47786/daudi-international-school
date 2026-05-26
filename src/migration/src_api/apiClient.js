/**
 * Drop-in API client — mirrors base44Client interface exactly.
 * 
 * USAGE — in your exported frontend, replace:
 *   import { base44 } from "@/api/base44Client";
 * with:
 *   import { base44 } from "@/api/apiClient";
 *
 * All methods have identical signatures.
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

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }

  return res.json();
}

// ── Entity factory — replicates base44.entities.X interface ───────────────────
function makeEntity(name) {
  // Map entity name to API path
  const pathMap = {
    Stat:              "/stats",
    Event:             "/events",
    GalleryPhoto:      "/gallery",
    BlogPost:          "/blog",
    Testimonial:       "/testimonials",
    SchoolSettings:    "/settings",
    AdmissionInquiry:  "/inquiries",
    User:              "/auth",
  };
  const apiPath = pathMap[name];
  if (!apiPath) throw new Error(`Unknown entity: ${name}`);

  return {
    /** list(sortField?, limit?) — sort/limit handled server-side */
    list: async (_sort, _limit) => {
      return apiFetch(apiPath);
    },

    /** filter(filters, sort?, limit?) */
    filter: async (filters = {}) => {
      const qs = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== undefined && v !== null) qs.set(k, v);
      });
      const q = qs.toString() ? `?${qs}` : "";
      return apiFetch(`${apiPath}${q}`);
    },

    /** get(id) */
    get: async (id) => apiFetch(`${apiPath}/${id}`),

    /** create(data) */
    create: async (data) => apiFetch(apiPath, {
      method: "POST",
      body: JSON.stringify(data),
    }),

    /** bulkCreate(dataArray) */
    bulkCreate: async (dataArray) => {
      return Promise.all(dataArray.map((d) => apiFetch(apiPath, {
        method: "POST",
        body: JSON.stringify(d),
      })));
    },

    /** update(id, data) */
    update: async (id, data) => apiFetch(`${apiPath}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

    /** delete(id) */
    delete: async (id) => apiFetch(`${apiPath}/${id}`, { method: "DELETE" }),

    /** schema() — not needed after migration; returns empty */
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
    window.location.href = redirectUrl || "/admin";
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

// ── Integrations shim — maps InvokeLLM / UploadFile ──────────────────────────
const integrations = {
  Core: {
    async UploadFile({ file }) {
      const form = new FormData();
      form.append("file", file);
      const token = getToken();
      const res = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: form,
      });
      if (!res.ok) throw new Error("Upload failed");
      return res.json(); // { file_url }
    },

    async InvokeLLM() {
      throw new Error("InvokeLLM is not available in self-hosted mode");
    },

    async SendEmail() {
      throw new Error("SendEmail not configured. Set up SMTP in server/routes/inquiries.js");
    },
  },
};

// ── Exported base44 object — same shape as Base44 SDK ─────────────────────────
export const base44 = {
  entities: new Proxy({}, {
    get(_, name) {
      return makeEntity(String(name));
    },
  }),
  auth,
  integrations,
  analytics: {
    track: (event) => {
      // No-op in self-hosted mode; wire up your own analytics if needed
      if (import.meta.env.DEV) console.debug("[analytics]", event);
    },
  },
};

export default base44;
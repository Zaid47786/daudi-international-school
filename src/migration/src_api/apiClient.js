/**
 * Drop-in API client — mirrors base44Client interface exactly.
 *
 * After migration, copy this file to: src/api/apiClient.js
 * Then replace ALL occurrences of:
 *   import { base44 } from "@/api/base44Client";
 * with:
 *   import { base44 } from "@/api/apiClient";
 *
 * All entity methods (.list, .filter, .get, .create, .update, .delete) have
 * identical signatures to the Base44 SDK.
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
  if (!apiPath) throw new Error(`Unknown entity: "${name}". Check ENTITY_PATH in apiClient.js`);

  return {
    /**
     * list(_sort?, _limit?) — returns all records (server handles ordering).
     * Sort/limit params are accepted but ignored; server applies sensible defaults.
     */
    list: async (_sort, _limit) => apiFetch(apiPath),

    /**
     * filter(filters, _sort?, _limit?) — passes filters as query-string params.
     * For BlogPost, passing { slug: "my-slug" } hits GET /api/blog?slug=my-slug
     * which returns a single-element array, matching Base44 filter() behaviour.
     */
    filter: async (filters = {}, _sort, _limit) => {
      const qs = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== undefined && v !== null) qs.set(k, String(v));
      });
      const q = qs.toString() ? `?${qs}` : "";
      return apiFetch(`${apiPath}${q}`);
    },

    /** get(id) — fetch a single record by its UUID */
    get: async (id) => apiFetch(`${apiPath}/${id}`),

    /** create(data) — POST new record; returns created object */
    create: async (data) =>
      apiFetch(apiPath, { method: "POST", body: JSON.stringify(data) }),

    /** bulkCreate(dataArray) — creates each record in parallel */
    bulkCreate: async (dataArray) =>
      Promise.all(
        dataArray.map((d) => apiFetch(apiPath, { method: "POST", body: JSON.stringify(d) }))
      ),

    /** update(id, data) — PUT partial update; returns updated object */
    update: async (id, data) =>
      apiFetch(`${apiPath}/${id}`, { method: "PUT", body: JSON.stringify(data) }),

    /** delete(id) — DELETE record; returns { id, deleted: true } */
    delete: async (id) =>
      apiFetch(`${apiPath}/${id}`, { method: "DELETE" }),

    /** schema() — not needed post-migration; returns empty object */
    schema: async () => ({}),
  };
}

// ── Auth ───────────────────────────────────────────────────────────────────────
const auth = {
  /** Returns current user object or throws if not authenticated */
  async me() {
    const token = getToken();
    if (!token) throw new Error("Not authenticated");
    return apiFetch("/auth/me");
  },

  /** Returns true if a valid JWT exists and the server accepts it */
  async isAuthenticated() {
    try {
      await this.me();
      return true;
    } catch {
      return false;
    }
  },

  /** Logs in, stores JWT, returns user object */
  async login(email, password) {
    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setToken(data.token);
    return data.user;
  },

  /** Clears JWT and redirects */
  logout(redirectUrl) {
    clearToken();
    window.location.href = redirectUrl || "/";
  },

  /** Clears JWT and redirects to login, with optional return URL */
  redirectToLogin(nextUrl) {
    clearToken();
    window.location.href = `/admin/login${nextUrl ? `?next=${encodeURIComponent(nextUrl)}` : ""}`;
  },

  /** Updates the current user's own profile (full_name only) */
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
    /** Upload a File object; returns { file_url: "/uploads/images/..." } */
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

    /** Not available in self-hosted mode */
    async InvokeLLM() {
      throw new Error("InvokeLLM is not available in self-hosted mode.");
    },

    /** Not configured by default — set up nodemailer in server/routes/inquiries.js */
    async SendEmail() {
      throw new Error(
        "SendEmail is not configured. Add nodemailer to the server and implement the /api/email endpoint."
      );
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
    /** No-op in self-hosted mode; logs in dev */
    track(event) {
      if (import.meta.env.DEV) console.debug("[analytics]", event);
    },
  },
};

export default base44;
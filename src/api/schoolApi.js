const API_ROOT = import.meta.env.VITE_API_URL || "/api";
const TOKEN_STORAGE_KEY = "dis_token";

function getToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

function setToken(token) {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

function clearToken() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

async function request(path, options = {}) {
  const token = getToken();
  const response = await fetch(`${API_ROOT}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = await response.json();
      message = body.error || message;
    } catch {
      // Preserve the status-based message for non-JSON responses.
    }
    throw new Error(message);
  }

  return response.json();
}

const RESOURCE_PATHS = {
  Stat: "/stats",
  Event: "/events",
  GalleryPhoto: "/gallery",
  BlogPost: "/blog",
  Testimonial: "/testimonials",
  SchoolSettings: "/settings",
  AdmissionInquiry: "/inquiries",
};

function createResource(name) {
  const path = RESOURCE_PATHS[name];
  if (!path) throw new Error(`Unknown school API resource: "${name}"`);

  function withQuery(filters = {}, sort, limit) {
    const query = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) query.set(key, String(value));
    });
    if (sort) query.set("sort", String(sort));
    if (limit) query.set("limit", String(limit));
    return query.size ? `${path}?${query}` : path;
  }

  return {
    list: (sort, limit) => request(withQuery({}, sort, limit)),
    filter: (filters = {}, sort, limit) => request(withQuery(filters, sort, limit)),
    get: (id) => request(`${path}/${id}`),
    create: (data) => request(path, { method: "POST", body: JSON.stringify(data) }),
    bulkCreate: (rows) => Promise.all(rows.map((row) => request(path, { method: "POST", body: JSON.stringify(row) }))),
    update: (id, data) => request(`${path}/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id) => request(`${path}/${id}`, { method: "DELETE" }),
  };
}

const resources = Object.fromEntries(
  Object.keys(RESOURCE_PATHS).map((name) => [name, createResource(name)])
);

const auth = {
  async me() {
    if (!getToken()) throw new Error("Not authenticated");
    return request("/auth/me");
  },

  async isAuthenticated() {
    try {
      await this.me();
      return true;
    } catch {
      return false;
    }
  },

  async login(password) {
    const data = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });
    setToken(data.token);
    return data.user;
  },

  async portalLogin(email, password) {
    const data = await request("/auth/portal-login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setToken(data.token);
    return data.user;
  },

  portalMe: () => request("/auth/portal-me"),
  portalBootstrap: () => request("/portal/bootstrap"),

  portalManage(resource, options = {}) {
    const { id, method = "GET", body } = options;
    return request(`/portal/manage/${resource}${id ? `/${id}` : ""}`, {
      method,
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
  },

  logout(redirectUrl = "/") {
    clearToken();
    window.location.href = redirectUrl;
  },

  redirectToLogin(nextUrl) {
    clearToken();
    window.location.href = `/admin${nextUrl ? `?next=${encodeURIComponent(nextUrl)}` : ""}`;
  },

  updateMe: (data) => request("/auth/me", { method: "PUT", body: JSON.stringify(data) }),
};

const media = {
  async uploadImage(file) {
    if (!file) throw new Error("Choose an image before uploading.");
    if (!String(file.type || "").startsWith("image/")) throw new Error("Only image files can be uploaded.");
    if (file.size > 8 * 1024 * 1024) throw new Error("Images must be smaller than 8 MB.");

    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Could not read the selected image."));
      reader.readAsDataURL(file);
    });

    return request("/upload", {
      method: "POST",
      body: JSON.stringify({
        filename: file.name,
        content_type: file.type,
        data_url: dataUrl,
      }),
    });
  },
};

export const schoolApi = { resources, auth, media };
export default schoolApi;

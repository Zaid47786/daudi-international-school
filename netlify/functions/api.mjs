import crypto from "node:crypto";
import { getStore } from "@netlify/blobs";

const STORE_NAME = "dis-school-data";
const STORE_REGION = "ap-southeast-1";
const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;

const COLLECTIONS = {
  stats: "Stat",
  events: "Event",
  gallery: "GalleryPhoto",
  blog: "BlogPost",
  testimonials: "Testimonial",
  settings: "SchoolSettings",
  inquiries: "AdmissionInquiry",
};

const PUBLIC_COLLECTIONS = new Set([
  "stats",
  "events",
  "gallery",
  "blog",
  "testimonials",
  "settings",
]);

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
};

function response(statusCode, payload) {
  return {
    statusCode,
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  };
}

function ok(payload, statusCode = 200) {
  return response(statusCode, payload);
}

function getStoreInstance() {
  // Site-wide storage survives deploys and is automatically authorised inside
  // Netlify Functions. The region is fixed so every invocation sees one store.
  return getStore({ name: STORE_NAME, region: STORE_REGION });
}

function decodeBody(event) {
  if (!event.body) return {};
  const raw = event.isBase64Encoded
    ? Buffer.from(event.body, "base64").toString("utf8")
    : event.body;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function base64url(value) {
  return Buffer.from(value).toString("base64url");
}

function signToken(payload) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not configured");
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64url(JSON.stringify(payload));
  const unsigned = `${header}.${body}`;
  const signature = crypto.createHmac("sha256", secret).update(unsigned).digest("base64url");
  return `${unsigned}.${signature}`;
}

function verifyToken(token) {
  const secret = process.env.JWT_SECRET;
  if (!secret || !token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const unsigned = `${parts[0]}.${parts[1]}`;
  const expected = crypto.createHmac("sha256", secret).update(unsigned).digest("base64url");
  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(parts[2]);
  if (expectedBuffer.length !== actualBuffer.length || !crypto.timingSafeEqual(expectedBuffer, actualBuffer)) {
    return null;
  }
  try {
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

function tokenFromEvent(event) {
  const header = event.headers?.authorization || event.headers?.Authorization || "";
  return header.startsWith("Bearer ") ? header.slice(7) : null;
}

function currentAdmin(event) {
  const payload = verifyToken(tokenFromEvent(event));
  return payload?.role === "admin" ? payload : null;
}

function requireAdmin(event) {
  return currentAdmin(event) ? null : response(401, { error: "Unauthorized" });
}

function normaliseBooleanFields(record) {
  const booleanFields = ["published", "featured", "is_real", "is_featured"];
  const output = { ...record };
  for (const field of booleanFields) {
    if (field in output) output[field] = Boolean(output[field]);
  }
  return output;
}

function presentRecord(collection, record) {
  if (!record) return null;
  const output = normaliseBooleanFields(record);
  if (collection === "SchoolSettings") {
    output.key = output.key_name;
    output.group = output.group_name;
  }
  return output;
}

function sortRecords(records, entity, query) {
  const rows = [...records];
  const direction = query.sort?.startsWith("-") ? -1 : 1;
  const sortField = (query.sort || "").replace(/^-/, "");

  if (sortField) {
    rows.sort((a, b) => String(a[sortField] ?? "").localeCompare(String(b[sortField] ?? "")) * direction);
  } else if (entity === "AdmissionInquiry" || entity === "BlogPost") {
    rows.sort((a, b) => String(b.created_date ?? "").localeCompare(String(a.created_date ?? "")));
  } else if (entity === "Event") {
    rows.sort((a, b) => String(a.date ?? "").localeCompare(String(b.date ?? "")));
  } else {
    rows.sort((a, b) => Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0));
  }

  return rows;
}

async function listRecords(collection, query, admin) {
  const store = getStoreInstance();
  const { blobs = [] } = await store.list({ prefix: `${collection}/` });
  const rows = (await Promise.all(
    blobs.map(({ key }) => store.get(key, { type: "json" }))
  )).filter(Boolean).map((row) => presentRecord(collection, row));

  let filtered = rows;
  if (collection === "BlogPost" && !admin) filtered = filtered.filter((row) => row.published);
  for (const [key, value] of Object.entries(query)) {
    if (key === "sort" || key === "limit" || key === "offset") continue;
    if (key === "featured" && collection === "BlogPost") {
      filtered = filtered.filter((row) => row.featured === (value === "true" || value === "1"));
    } else if (key === "status" || key === "category") {
      filtered = filtered.filter((row) => String(row[key] ?? "") === String(value));
    }
  }

  const ordered = sortRecords(filtered, collection, query);
  const offset = Math.max(Number.parseInt(query.offset || "0", 10) || 0, 0);
  const limit = Math.min(Math.max(Number.parseInt(query.limit || "200", 10) || 200, 1), 500);
  return ordered.slice(offset, offset + limit);
}

async function getRecord(collection, id) {
  return getStoreInstance().get(`${collection}/${id}`, { type: "json" });
}

function cleanRecord(collection, input, isCreate = false) {
  const data = input && typeof input === "object" ? { ...input } : {};
  delete data.id;
  delete data.created_date;
  delete data.updated_date;

  if (collection === "SchoolSettings") {
    if (data.key && !data.key_name) data.key_name = data.key;
    if (data.group && !data.group_name) data.group_name = data.group;
    delete data.key;
    delete data.group;
  }
  if (collection === "BlogPost" && !data.slug && data.title) {
    data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  if (collection === "AdmissionInquiry") {
    const allowed = ["parent_name", "child_name", "grade", "phone", "email", "message"];
    const inquiry = Object.fromEntries(allowed.filter((key) => key in data).map((key) => [key, String(data[key] ?? "").trim()]));
    if (isCreate) inquiry.status = "new";
    else if (data.status) inquiry.status = data.status;
    if (!isCreate && data.notes !== undefined) inquiry.notes = String(data.notes).trim();
    return inquiry;
  }
  return data;
}

async function createRecord(collection, input) {
  const data = cleanRecord(collection, input, true);
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const row = normaliseBooleanFields({ ...data, id, created_date: now, updated_date: now });
  await getStoreInstance().setJSON(`${collection}/${id}`, row);
  return presentRecord(collection, row);
}

async function updateRecord(collection, id, input) {
  const existing = await getRecord(collection, id);
  if (!existing) return null;
  const data = cleanRecord(collection, input);
  const row = normaliseBooleanFields({ ...existing, ...data, id, updated_date: new Date().toISOString() });
  await getStoreInstance().setJSON(`${collection}/${id}`, row);
  return presentRecord(collection, row);
}

async function deleteRecord(collection, id) {
  const existing = await getRecord(collection, id);
  if (!existing) return null;
  await getStoreInstance().delete(`${collection}/${id}`);
  return { id, deleted: true };
}

function requestPath(event) {
  const rawPath = event.path || new URL(event.rawUrl || "https://netlify.local/").pathname;
  const apiIndex = rawPath.indexOf("/api/");
  if (apiIndex >= 0) return rawPath.slice(apiIndex + 5).replace(/^\/+|\/+$/g, "");
  return rawPath.replace(/^\/\.netlify\/functions\/api\/?/, "").replace(/^\/+|\/+$/g, "");
}

function publicUser() {
  return {
    id: "netlify-admin",
    full_name: process.env.ADMIN_NAME || "DIS Administrator",
    email: process.env.ADMIN_EMAIL,
    role: "admin",
  };
}

async function handleAuth(path, event, body) {
  if (path === "auth/login" && event.httpMethod === "POST") {
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const configuredEmail = String(process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    const configuredPassword = String(process.env.ADMIN_PASSWORD || "");
    if (!configuredEmail || !configuredPassword || !process.env.JWT_SECRET) {
      return response(503, { error: "Admin authentication is not configured on Netlify." });
    }
    const emailMatches = email === configuredEmail;
    const passwordMatches = Buffer.byteLength(password) === Buffer.byteLength(configuredPassword)
      && crypto.timingSafeEqual(Buffer.from(password), Buffer.from(configuredPassword));
    if (!emailMatches || !passwordMatches) return response(401, { error: "Invalid credentials" });
    const now = Math.floor(Date.now() / 1000);
    const token = signToken({ ...publicUser(), iat: now, exp: now + TOKEN_TTL_SECONDS });
    return ok({ token, user: publicUser() });
  }

  if (path === "auth/me" && event.httpMethod === "GET") {
    const admin = currentAdmin(event);
    return admin ? ok(publicUser()) : response(401, { error: "Unauthorized" });
  }

  if (path === "auth/logout" && event.httpMethod === "POST") return ok({ message: "Logged out" });
  return response(404, { error: "Not found" });
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: JSON_HEADERS, body: "" };

  const path = requestPath(event);
  const body = decodeBody(event);
  if (body === null) return response(400, { error: "Request body must be valid JSON" });
  if (path.startsWith("auth/")) return handleAuth(path, event, body);

  const [resource, id] = path.split("/");
  const collection = COLLECTIONS[resource];
  if (!collection) return response(404, { error: "Not found" });

  if (event.httpMethod === "GET") {
    if (!PUBLIC_COLLECTIONS.has(resource) && !currentAdmin(event)) return response(401, { error: "Unauthorized" });
    if (id) {
      const row = await getRecord(collection, id);
      return row ? ok(presentRecord(collection, row)) : response(404, { error: "Not found" });
    }
    const query = Object.fromEntries(new URLSearchParams(event.rawQuery || ""));
    if (resource === "blog" && query.slug) {
      const rows = await listRecords(collection, query, currentAdmin(event));
      return ok(rows.filter((row) => row.slug === query.slug));
    }
    return ok(await listRecords(collection, query, currentAdmin(event)));
  }

  const adminError = requireAdmin(event);
  if (resource === "inquiries" && event.httpMethod === "POST") {
    const required = ["parent_name", "child_name", "phone", "grade"];
    if (required.some((key) => !String(body[key] || "").trim())) {
      return response(400, { error: "parent_name, child_name, phone, and grade are required" });
    }
    return ok(await createRecord(collection, body), 201);
  }
  if (adminError) return adminError;

  if (event.httpMethod === "POST" && !id) return ok(await createRecord(collection, body), 201);
  if (event.httpMethod === "PUT" && id) {
    const row = await updateRecord(collection, id, body);
    return row ? ok(row) : response(404, { error: "Not found" });
  }
  if (event.httpMethod === "DELETE" && id) {
    const result = await deleteRecord(collection, id);
    return result ? ok(result) : response(404, { error: "Not found" });
  }
  return response(405, { error: "Method not allowed" });
}

export default { handler };

import crypto from "node:crypto";
import { getStore as getNetlifyStore } from "@netlify/blobs";
import { del as deleteVercelBlob, get as getVercelBlob, list as listVercelBlobs, put as putVercelBlob } from "@vercel/blob";

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

const PORTAL_COLLECTIONS = {
  users: "PortalUser",
  students: "PortalStudent",
  teachers: "PortalTeacher",
  parents: "PortalParent",
  classes: "PortalClass",
  subjects: "PortalSubject",
  timetable: "PortalTimetable",
  attendance: "PortalAttendance",
  exams: "PortalExam",
  results: "PortalResult",
  fees: "PortalFee",
  notices: "PortalNotice",
  calendar: "PortalCalendar",
  notifications: "PortalNotification",
  audit: "PortalAuditLog",
};

const PORTAL_ROLES = new Set(["admin", "teacher", "student", "parent"]);
const PORTAL_MANAGED_RESOURCES = new Set(Object.keys(PORTAL_COLLECTIONS));

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

function binaryResponse(statusCode, body, contentType, extraHeaders = {}) {
  return {
    statusCode,
    isBase64Encoded: true,
    headers: {
      "Content-Type": contentType || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders,
    },
    body: Buffer.from(body).toString("base64"),
  };
}

function getStoreInstance() {
  if (process.env.VERCEL || process.env.VERCEL_ENV) {
    return {
      async setJSON(key, data) {
        await putVercelBlob(key, JSON.stringify(data), {
          access: "private",
          addRandomSuffix: false,
          allowOverwrite: true,
          contentType: "application/json",
        });
      },
      async get(key, options = {}) {
        const result = await getVercelBlob(key, { access: "private", useCache: false });
        if (!result) return null;
        if (options.type === "json") return JSON.parse(await new Response(result.stream).text());
        return result;
      },
      async list({ prefix }) {
        const blobs = [];
        let cursor;
        do {
          const page = await listVercelBlobs({ prefix, cursor, limit: 1000, mode: "expanded" });
          blobs.push(...page.blobs.map((blob) => ({ key: blob.pathname })));
          cursor = page.hasMore ? page.cursor : undefined;
        } while (cursor);
        return { blobs };
      },
      async delete(key) {
        await deleteVercelBlob(key);
      },
    };
  }

  // Site-wide storage survives deploys and is automatically authorised inside
  // Netlify Functions. The region is fixed so every invocation sees one store.
  return getNetlifyStore({ name: STORE_NAME, region: STORE_REGION });
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

function safeMediaName(filename = "upload") {
  const cleaned = String(filename).trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  return cleaned || "upload";
}

function decodeUploadData(input) {
  const raw = String(input || "");
  const match = raw.match(/^data:([^;,]+)?;base64,(.+)$/s);
  if (match) return { contentType: match[1] || "application/octet-stream", buffer: Buffer.from(match[2], "base64") };
  return { contentType: "application/octet-stream", buffer: Buffer.from(raw, "base64") };
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
  if (collection === "PortalUser") {
    delete output.password_hash;
    delete output.password_salt;
  }
  return output;
}

function rawPortalUser(record) {
  return record && record.role && PORTAL_ROLES.has(record.role) ? record : null;
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  return {
    password_salt: salt,
    password_hash: crypto.scryptSync(String(password), salt, 64).toString("hex"),
  };
}

function verifyPassword(password, record) {
  if (!record?.password_hash || !record?.password_salt) return false;
  const candidate = crypto.scryptSync(String(password), record.password_salt, 64).toString("hex");
  const expected = Buffer.from(record.password_hash, "hex");
  const actual = Buffer.from(candidate, "hex");
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

async function listPortalRows(resource, query = {}) {
  return listRecords(PORTAL_COLLECTIONS[resource], query, true);
}

async function findPortalUserByEmail(email) {
  const store = getStoreInstance();
  const { blobs = [] } = await store.list({ prefix: "PortalUser/" });
  const rows = await Promise.all(blobs.map(({ key }) => store.get(key, { type: "json" })));
  return rows.find((row) => String(row?.email || "").toLowerCase() === String(email || "").trim().toLowerCase()) || null;
}

async function findPortalUserById(id) {
  return rawPortalUser(await getRecord("PortalUser", id));
}

async function teacherForUser(user) {
  if (user.role !== "teacher") return null;
  const teachers = await listPortalRows("teachers");
  return teachers.find((row) => row.user_id === user.id || row.id === user.profile_id) || null;
}

async function portalRowsForUser(user) {
  const students = await listPortalRows("students");
  const teachers = await listPortalRows("teachers");
  const parents = await listPortalRows("parents");
  const teacher = user.role === "teacher" ? teachers.find((row) => row.user_id === user.id || row.id === user.profile_id) : null;
  const teacherClassIds = teacher?.class_ids || [];
  const studentIds = user.role === "student"
    ? students.filter((row) => row.user_id === user.id || row.id === user.profile_id).map((row) => row.id)
    : user.role === "parent"
      ? students.filter((row) => (user.child_ids || []).includes(row.id) || row.parent_ids?.includes(user.id)).map((row) => row.id)
      : [];
  const parent = user.role === "parent" ? parents.find((row) => row.user_id === user.id || row.id === user.profile_id) : null;
  const linkedChildIds = new Set([...(parent?.child_ids || []), ...(user.child_ids || [])]);
  const selectedStudents = user.role === "teacher"
    ? students.filter((row) => teacherClassIds.includes(row.class_id))
    : user.role === "parent" && parent
    ? students.filter((row) => linkedChildIds.has(row.id) || (row.parent_ids || []).includes(user.id))
    : students.filter((row) => studentIds.includes(row.id));

  const allAttendance = await listPortalRows("attendance");
  const allExams = await listPortalRows("exams");
  const allResults = await listPortalRows("results");
  const allFees = await listPortalRows("fees");
  const allTimetable = await listPortalRows("timetable");
  const allNotices = await listPortalRows("notices");
  const allCalendar = await listPortalRows("calendar");

  const classIds = selectedStudents.map((row) => row.class_id).filter(Boolean);
  const sectionIds = selectedStudents.map((row) => row.section_id).filter(Boolean);
  const audienceMatches = (notice) => {
    if (notice.status && notice.status !== "published") return false;
    if (notice.audience === "school" || notice.audience === "all") return true;
    if (notice.audience_role && notice.audience_role !== user.role) return false;
    if (notice.class_id && !classIds.includes(notice.class_id) && !teacherClassIds.includes(notice.class_id)) return false;
    if (notice.section_id && !sectionIds.includes(notice.section_id)) return false;
    return true;
  };

  const visibleIds = new Set(selectedStudents.map((row) => row.id));
  const scopedParents = parents.filter((row) => row.user_id === user.id || row.id === user.profile_id || (row.child_ids || []).some((id) => visibleIds.has(id)));
  const scoped = {
    students: selectedStudents,
    teacher,
    parent,
    attendance: allAttendance.filter((row) => visibleIds.has(row.student_id) || (teacher && (teacher.class_ids || []).includes(row.class_id))),
    exams: allExams.filter((row) => !row.class_id || classIds.includes(row.class_id) || teacherClassIds.includes(row.class_id)),
    results: allResults.filter((row) => visibleIds.has(row.student_id) || (teacher && teacherClassIds.includes(row.class_id))),
    fees: allFees.filter((row) => visibleIds.has(row.student_id)),
    timetable: allTimetable.filter((row) => classIds.includes(row.class_id) || teacherClassIds.includes(row.class_id) || row.teacher_id === user.id),
    notices: allNotices.filter(audienceMatches),
    calendar: allCalendar,
    parents: scopedParents,
  };

  return scoped;
}

function averageAttendance(rows) {
  if (!rows.length) return 0;
  const present = rows.filter((row) => row.status === "present" || row.status === "late").length;
  return Math.round((present / rows.length) * 100);
}

function gradeForPercentage(percentage) {
  const score = Number(percentage || 0);
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
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

function portalSafeUser(user) {
  if (!user) return null;
  const output = presentRecord("PortalUser", user);
  return {
    ...output,
    name: output.full_name || output.name || output.email,
  };
}

async function writeAudit(user, action, resource, recordId, before, after) {
  const now = new Date().toISOString();
  await createRecord("PortalAuditLog", {
    user_id: user?.id || "system",
    user_name: user?.full_name || user?.name || "System",
    action,
    resource,
    record_id: recordId || "",
    previous_value: before ? JSON.stringify(before) : "",
    new_value: after ? JSON.stringify(after) : "",
    created_date: now,
  });
}

async function createPortalManaged(resource, input, user) {
  const collection = PORTAL_COLLECTIONS[resource];
  const payload = { ...(input || {}) };
  if (resource === "users") {
    const password = payload.password || "ChangeMe123!";
    Object.assign(payload, hashPassword(password));
    delete payload.password;
    payload.role = PORTAL_ROLES.has(payload.role) ? payload.role : "student";
    payload.active = payload.active !== false;
  }
  const row = await createRecord(collection, payload);
  await writeAudit(user, "create", resource, row.id, null, row);
  return row;
}

async function updatePortalManaged(resource, id, input, user) {
  const collection = PORTAL_COLLECTIONS[resource];
  const before = await getRecord(collection, id);
  if (!before) return null;
  const payload = { ...(input || {}) };
  if (resource === "users") {
    if (payload.password) Object.assign(payload, hashPassword(payload.password));
    delete payload.password;
    if (payload.role && !PORTAL_ROLES.has(payload.role)) delete payload.role;
  }
  const row = await updateRecord(collection, id, payload);
  await writeAudit(user, "update", resource, id, presentRecord(collection, before), row);
  return row;
}

async function deletePortalManaged(resource, id, user) {
  const collection = PORTAL_COLLECTIONS[resource];
  const before = await getRecord(collection, id);
  if (!before) return null;
  const row = await deleteRecord(collection, id);
  await writeAudit(user, "delete", resource, id, presentRecord(collection, before), null);
  return row;
}

async function portalBootstrap(user) {
  if (user.role === "admin") {
    const [students, teachers, parents, classes, subjects, exams, attendance, results, fees, notices, calendar, users, audit] = await Promise.all([
      listPortalRows("students"), listPortalRows("teachers"), listPortalRows("parents"), listPortalRows("classes"),
      listPortalRows("subjects"), listPortalRows("exams"), listPortalRows("attendance"), listPortalRows("results"),
      listPortalRows("fees"), listPortalRows("notices"), listPortalRows("calendar"), listPortalRows("users"), listPortalRows("audit"),
    ]);
    const totalFees = fees.reduce((sum, row) => sum + Number(row.amount || row.total_amount || 0), 0);
    const paidFees = fees.filter((row) => row.status === "paid").reduce((sum, row) => sum + Number(row.amount || 0), 0);
    return ok({
      user: portalSafeUser(user),
      role: "admin",
      dashboard: {
        counts: { students: students.length, teachers: teachers.length, parents: parents.length, classes: classes.length },
        attendance: averageAttendance(attendance),
        exams: exams.filter((row) => new Date(row.date) >= new Date()).slice(0, 5),
        fees: { total: totalFees, collected: paidFees, pending: Math.max(totalFees - paidFees, 0) },
        notices: notices.slice(0, 5),
        calendar: calendar.slice(0, 8),
      },
      data: { students, teachers, parents, classes, subjects, exams, attendance, results, fees, notices, calendar, users, audit },
    });
  }

  const scoped = await portalRowsForUser(user);
  const ownAttendance = scoped.attendance.filter((row) => scoped.students.some((student) => student.id === row.student_id));
  const upcomingExams = scoped.exams.filter((row) => row.status !== "cancelled").sort((a, b) => String(a.date).localeCompare(String(b.date))).slice(0, 8);
  const publishedResults = scoped.results.filter((row) => row.published !== false);
  const pendingFees = scoped.fees.filter((row) => row.status !== "paid").reduce((sum, row) => sum + Number(row.amount || row.pending_amount || 0), 0);
  return ok({
    user: portalSafeUser(user),
    role: user.role,
    profile: scoped.students[0] || scoped.teacher || scoped.parent || null,
    children: scoped.students,
    dashboard: {
      attendance: averageAttendance(ownAttendance),
      upcomingExams,
      latestResult: publishedResults[0] || null,
      feeStatus: { pending: pendingFees, paid: scoped.fees.filter((row) => row.status === "paid").reduce((sum, row) => sum + Number(row.amount || 0), 0) },
      notices: scoped.notices.slice(0, 6),
      timetable: scoped.timetable,
      calendar: scoped.calendar,
    },
    data: scoped,
  });
}

async function teacherManagedRows(resource, user) {
  const scoped = await portalRowsForUser(user);
  if (resource === "users") return null;
  if (resource === "teachers") return scoped.teacher ? [scoped.teacher] : [];
  if (resource === "students") return scoped.students;
  if (resource === "parents") return scoped.parents;
  if (resource === "attendance") return scoped.attendance;
  if (resource === "results") return scoped.results;
  if (resource === "exams") return scoped.exams;
  if (resource === "timetable") return scoped.timetable;
  if (resource === "notices") return scoped.notices;
  if (resource === "calendar") return scoped.calendar;
  const teacher = await teacherForUser(user);
  const classIds = new Set(teacher?.class_ids || []);
  if (resource === "classes") return (await listPortalRows("classes")).filter((row) => classIds.has(row.id));
  if (resource === "subjects") return (await listPortalRows("subjects")).filter((row) => (row.class_ids || []).some((id) => classIds.has(id)) || (row.teacher_ids || []).some((id) => id === teacher?.id || id === user.id));
  return [];
}

async function handlePortal(path, event, body, user) {
  if (path === "portal/bootstrap" && event.httpMethod === "GET") return portalBootstrap(user);
  const parts = path.split("/");
  if (parts[0] !== "portal") return response(404, { error: "Not found" });

  if (parts[1] === "manage" && PORTAL_MANAGED_RESOURCES.has(parts[2])) {
    const resource = parts[2];
    const id = parts[3];
    const teacherCanWrite = user.role === "teacher" && ["attendance", "results"].includes(resource);
    if (user.role !== "admin" && !teacherCanWrite && event.httpMethod !== "GET") return response(403, { error: "Forbidden: insufficient permissions" });
    if (event.httpMethod === "GET") {
      if (user.role === "admin") return ok(id ? presentRecord(PORTAL_COLLECTIONS[resource], await getRecord(PORTAL_COLLECTIONS[resource], id)) : await listPortalRows(resource));
      const rows = await teacherManagedRows(resource, user);
      if (!rows) return response(403, { error: "Forbidden: teachers cannot access portal accounts" });
      if (id) {
        const row = rows.find((item) => item.id === id);
        return row ? ok(row) : response(404, { error: "Not found" });
      }
      return ok(rows);
    }
    if (teacherCanWrite) {
      const teacher = await teacherForUser(user);
      const classIds = new Set(teacher?.class_ids || []);
      let classId = body.class_id;
      if (!classId && body.student_id) classId = (await getRecord("PortalStudent", body.student_id))?.class_id;
      if (!classId || !classIds.has(classId)) return response(403, { error: "You are not assigned to this class" });
      body.class_id = classId;
    }
    if (event.httpMethod === "POST" && !id) return ok(await createPortalManaged(resource, body, user), 201);
    if (event.httpMethod === "PUT" && id) {
      if (teacherCanWrite) {
        const existing = await getRecord(PORTAL_COLLECTIONS[resource], id);
        const teacher = await teacherForUser(user);
        if (existing?.class_id && !(teacher?.class_ids || []).includes(existing.class_id)) return response(403, { error: "You are not assigned to this class" });
      }
      const row = await updatePortalManaged(resource, id, body, user);
      return row ? ok(row) : response(404, { error: "Not found" });
    }
    if (event.httpMethod === "DELETE" && id) {
      const row = await deletePortalManaged(resource, id, user);
      return row ? ok(row) : response(404, { error: "Not found" });
    }
  }
  return response(404, { error: "Not found" });
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
    role: "admin",
  };
}

async function handleAuth(path, event, body) {
  if (path === "auth/login" && event.httpMethod === "POST") {
    const password = String(body.password || "");
    const configuredPassword = String(process.env.ADMIN_PASSWORD || "");
    if (!configuredPassword || !process.env.JWT_SECRET) {
      return response(503, { error: "Admin authentication is not configured." });
    }
    const passwordMatches = Buffer.byteLength(password) === Buffer.byteLength(configuredPassword)
      && crypto.timingSafeEqual(Buffer.from(password), Buffer.from(configuredPassword));
    if (!passwordMatches) return response(401, { error: "Invalid password" });
    const now = Math.floor(Date.now() / 1000);
    const token = signToken({ ...publicUser(), iat: now, exp: now + TOKEN_TTL_SECONDS });
    return ok({ token, user: publicUser() });
  }

  if (path === "auth/portal-login" && event.httpMethod === "POST") {
    if (!process.env.JWT_SECRET) return response(503, { error: "Portal authentication is not configured." });
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    if (!email || !password) return response(400, { error: "Email and password are required" });
    const portalUser = await findPortalUserByEmail(email);
    if (!portalUser || portalUser.active === false || !verifyPassword(password, portalUser)) {
      return response(401, { error: "Invalid email or password" });
    }
    const now = Math.floor(Date.now() / 1000);
    const token = signToken({ ...portalSafeUser(portalUser), iat: now, exp: now + TOKEN_TTL_SECONDS });
    return ok({ token, user: portalSafeUser(portalUser) });
  }

  if (path === "auth/me" && event.httpMethod === "GET") {
    const admin = currentAdmin(event);
    return admin ? ok(publicUser()) : response(401, { error: "Unauthorized" });
  }

  if (path === "auth/portal-me" && event.httpMethod === "GET") {
    const payload = verifyToken(tokenFromEvent(event));
    if (!payload || !PORTAL_ROLES.has(payload.role)) return response(401, { error: "Unauthorized" });
    if (payload.role === "admin") return ok(publicUser());
    const portalUser = await findPortalUserById(payload.id);
    return portalUser ? ok(portalSafeUser(portalUser)) : response(401, { error: "User not found" });
  }

  if (path === "auth/logout" && event.httpMethod === "POST") return ok({ message: "Logged out" });
  return response(404, { error: "Not found" });
}

async function handleMedia(path, event, body) {
  if (!(process.env.VERCEL || process.env.VERCEL_ENV)) return response(503, { error: "Media storage is not configured on this host." });
  if (path === "upload" && event.httpMethod === "POST") {
    const adminError = requireAdmin(event);
    if (adminError) return adminError;
    const { contentType, buffer } = decodeUploadData(body.data_url);
    const requestedType = String(body.content_type || contentType || "").toLowerCase();
    if (!requestedType.startsWith("image/") || !contentType.startsWith("image/")) return response(400, { error: "Only image files can be uploaded." });
    if (!buffer.length || buffer.length > 8 * 1024 * 1024) return response(400, { error: "Images must be smaller than 8 MB." });
    const pathname = `media/${crypto.randomUUID()}-${safeMediaName(body.filename || "image")}`;
    await putVercelBlob(pathname, buffer, { access: "private", addRandomSuffix: false, allowOverwrite: false, contentType: requestedType, cacheControlMaxAge: 31536000 });
    return ok({ file_url: `/api/media?pathname=${encodeURIComponent(pathname)}`, pathname, content_type: requestedType }, 201);
  }
  if (path === "media" && event.httpMethod === "GET") {
    const query = new URLSearchParams(event.rawQuery || "");
    const pathname = query.get("pathname") || "";
    if (!pathname.startsWith("media/") || pathname.includes("..")) return response(400, { error: "Invalid media path" });
    const result = await getVercelBlob(pathname, { access: "private", useCache: true });
    if (!result || result.statusCode !== 200) return response(404, { error: "Media not found" });
    const bytes = Buffer.from(await new Response(result.stream).arrayBuffer());
    return binaryResponse(200, bytes, result.blob.contentType, { ETag: result.blob.etag });
  }
  return response(404, { error: "Not found" });
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: JSON_HEADERS, body: "" };

  const path = requestPath(event);
  const body = decodeBody(event);
  if (body === null) return response(400, { error: "Request body must be valid JSON" });
  if (path === "upload" || path === "media") return handleMedia(path, event, body);
  if (path.startsWith("auth/")) return handleAuth(path, event, body);
  if (path.startsWith("portal/")) {
    const payload = verifyToken(tokenFromEvent(event));
    if (!payload || !PORTAL_ROLES.has(payload.role)) return response(401, { error: "Unauthorized" });
    return handlePortal(path, event, body, payload);
  }

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

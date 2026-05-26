/* eslint-env node */
/**
 * Generic CRUD helpers for better-sqlite3
 * Keeps route files thin.
 */
import { v4 as uuidv4 } from "uuid";
import db from "../database/db.js";

/** Build a WHERE clause from a flat filter object */
function buildWhere(filters = {}) {
  const keys = Object.keys(filters).filter((k) => filters[k] !== undefined);
  if (!keys.length) return { clause: "", params: [] };
  const clause = "WHERE " + keys.map((k) => `${k} = ?`).join(" AND ");
  return { clause, params: keys.map((k) => filters[k]) };
}

/** Convert boolean-like values so SQLite stores 0/1 */
function boolToInt(val) {
  if (val === true || val === 1 || val === "true") return 1;
  if (val === false || val === 0 || val === "false") return 0;
  return val;
}

function normalise(data) {
  const out = {};
  for (const [k, v] of Object.entries(data)) {
    out[k] = typeof v === "boolean" ? boolToInt(v) : v;
  }
  return out;
}

/** Convert row from DB (integers back to booleans for known fields) */
const BOOL_FIELDS = ["published", "featured", "is_real", "is_featured"];
function toRow(row) {
  if (!row) return null;
  const out = { ...row };
  for (const f of BOOL_FIELDS) {
    if (f in out) out[f] = out[f] === 1;
  }
  return out;
}

export function listRows(table, { filters = {}, orderBy = "sort_order ASC, created_date DESC", limit = 200, offset = 0 } = {}) {
  const { clause, params } = buildWhere(filters);
  const rows = db.prepare(`SELECT * FROM ${table} ${clause} ORDER BY ${orderBy} LIMIT ? OFFSET ?`)
    .all(...params, limit, offset);
  return rows.map(toRow);
}

export function getRow(table, id) {
  return toRow(db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id));
}

export function createRow(table, data) {
  const id = uuidv4();
  const now = new Date().toISOString();
  const payload = normalise({ ...data, id, created_date: now, updated_date: now });
  const keys = Object.keys(payload);
  db.prepare(`INSERT INTO ${table} (${keys.join(",")}) VALUES (${keys.map(() => "?").join(",")})`)
    .run(...Object.values(payload));
  return getRow(table, id);
}

export function updateRow(table, id, data) {
  const now = new Date().toISOString();
  const payload = normalise({ ...data, updated_date: now });
  // Never update id or created_date
  delete payload.id;
  delete payload.created_date;
  const keys = Object.keys(payload);
  if (!keys.length) return getRow(table, id);
  db.prepare(`UPDATE ${table} SET ${keys.map((k) => `${k} = ?`).join(",")} WHERE id = ?`)
    .run(...Object.values(payload), id);
  return getRow(table, id);
}

export function deleteRow(table, id) {
  db.prepare(`DELETE FROM ${table} WHERE id = ?`).run(id);
  return { id, deleted: true };
}
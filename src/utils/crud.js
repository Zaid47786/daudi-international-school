/* eslint-env node */
import { v4 as uuidv4 } from "uuid";
import db from "../database/db.js";

function buildWhere(filters = {}) {
  const keys = Object.keys(filters).filter((k) => filters[k] !== undefined);
  if (!keys.length) return { clause: "", params: [] };
  return {
    clause: "WHERE " + keys.map((k) => `${k} = ?`).join(" AND "),
    params: keys.map((k) => filters[k]),
  };
}

const BOOL_FIELDS = ["published", "featured", "is_real", "is_featured"];

function toRow(row) {
  if (!row) return null;
  const out = { ...row };
  for (const f of BOOL_FIELDS) { if (f in out) out[f] = out[f] === 1; }
  return out;
}

function normalise(data) {
  const out = {};
  for (const [k, v] of Object.entries(data)) {
    out[k] = (v === true || v === "true") ? 1 : (v === false || v === "false") ? 0 : v;
  }
  return out;
}

export function listRows(table, { filters = {}, orderBy = "sort_order ASC, created_date DESC", limit = 200, offset = 0 } = {}) {
  const { clause, params } = buildWhere(filters);
  return db.prepare(`SELECT * FROM ${table} ${clause} ORDER BY ${orderBy} LIMIT ? OFFSET ?`)
    .all(...params, limit, offset).map(toRow);
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
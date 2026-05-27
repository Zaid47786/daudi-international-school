/* eslint-env node */
import { Router } from "express";
import db from "../database/db.js";
import { createRow, updateRow } from "../utils/crud.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();
const TABLE = "school_settings";

router.get("/", (_req, res) => {
  const rows = db.prepare(`SELECT * FROM ${TABLE}`).all();
  res.json(rows.map((r) => ({ ...r, key: r.key_name, group: r.group_name })));
});

router.put("/:id", requireAdmin, (req, res) => res.json(updateRow(TABLE, req.params.id, req.body)));

router.post("/", requireAdmin, (req, res) => {
  const data = { ...req.body };
  if (data.key) { data.key_name = data.key; delete data.key; }
  if (data.group) { data.group_name = data.group; delete data.group; }
  res.status(201).json(createRow(TABLE, data));
});

export default router;
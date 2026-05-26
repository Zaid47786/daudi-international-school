import { Router } from "express";
import db from "../database/db.js";
import { createRow, updateRow } from "../utils/crud.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();
const TABLE = "school_settings";

// Public: read all settings as key→value map
router.get("/", (_req, res) => {
  const rows = db.prepare(`SELECT * FROM ${TABLE}`).all();
  // Return as array (same shape Base44 returned)
  res.json(rows.map((r) => ({ ...r, key: r.key_name, group: r.group_name })));
});

// Admin: update a single setting by id
router.put("/:id", requireAdmin, (req, res) => {
  res.json(updateRow(TABLE, req.params.id, req.body));
});

// Admin: create a new setting
router.post("/", requireAdmin, (req, res) => {
  const data = { ...req.body };
  if (data.key) { data.key_name = data.key; delete data.key; }
  if (data.group) { data.group_name = data.group; delete data.group; }
  res.status(201).json(createRow(TABLE, data));
});

export default router;
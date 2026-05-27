/* eslint-env node */
import { Router } from "express";
import { listRows, getRow, createRow, updateRow, deleteRow } from "../utils/crud.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();
const TABLE = "admission_inquiries";

// Public: submit new inquiry
router.post("/", (req, res) => {
  const { parent_name, child_name, phone, grade } = req.body;
  if (!parent_name || !child_name || !phone || !grade) {
    return res.status(400).json({ error: "parent_name, child_name, phone, and grade are required" });
  }
  res.status(201).json(createRow(TABLE, req.body));
});

// Admin only
router.get("/", requireAdmin, (req, res) => {
  const { status } = req.query;
  res.json(listRows(TABLE, { filters: status ? { status } : {}, orderBy: "created_date DESC" }));
});

router.get("/:id",    requireAdmin, (req, res) => {
  const row = getRow(TABLE, req.params.id);
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.put("/:id",    requireAdmin, (req, res) => res.json(updateRow(TABLE, req.params.id, req.body)));
router.delete("/:id", requireAdmin, (req, res) => res.json(deleteRow(TABLE, req.params.id)));

export default router;
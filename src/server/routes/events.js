/* eslint-env node */
import { Router } from "express";
import { listRows, getRow, createRow, updateRow, deleteRow } from "../utils/crud.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();
const TABLE = "events";

router.get("/", (req, res) => {
  const { status } = req.query;
  res.json(listRows(TABLE, { filters: status ? { status } : {}, orderBy: "date ASC" }));
});

router.get("/:id", (req, res) => {
  const row = getRow(TABLE, req.params.id);
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.post("/",      requireAdmin, (req, res) => res.status(201).json(createRow(TABLE, req.body)));
router.put("/:id",    requireAdmin, (req, res) => res.json(updateRow(TABLE, req.params.id, req.body)));
router.delete("/:id", requireAdmin, (req, res) => res.json(deleteRow(TABLE, req.params.id)));

export default router;
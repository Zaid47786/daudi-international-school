/* eslint-env node */
import { Router } from "express";
import { listRows, createRow, updateRow, deleteRow } from "../utils/crud.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();
const TABLE = "testimonials";

router.get("/", (req, res) => {
  const { featured } = req.query;
  const filters = featured ? { is_featured: 1 } : {};
  res.json(listRows(TABLE, { filters, orderBy: "sort_order ASC" }));
});

router.post("/",      requireAdmin, (req, res) => res.status(201).json(createRow(TABLE, req.body)));
router.put("/:id",    requireAdmin, (req, res) => res.json(updateRow(TABLE, req.params.id, req.body)));
router.delete("/:id", requireAdmin, (req, res) => res.json(deleteRow(TABLE, req.params.id)));

export default router;
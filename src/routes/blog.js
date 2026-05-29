/* eslint-env node */
import { Router } from "express";
import db from "../database/db.js";
import { listRows, getRow, createRow, updateRow, deleteRow } from "../utils/crud.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();
const TABLE = "blog_posts";

router.get("/", (req, res) => {
  const { category, featured, slug } = req.query;
  const isAdmin = req.headers.authorization;

  if (slug) {
    const row = db.prepare(`SELECT * FROM ${TABLE} WHERE slug = ?`).get(slug);
    if (!row) return res.json([]);
    return res.json([{ ...row, published: row.published === 1, featured: row.featured === 1 }]);
  }

  let sql = `SELECT * FROM ${TABLE}`;
  const conditions = [];
  const params = [];
  if (!isAdmin) { conditions.push("published = 1"); }
  if (category)  { conditions.push("category = ?"); params.push(category); }
  if (featured)  { conditions.push("featured = 1"); }
  if (conditions.length) sql += " WHERE " + conditions.join(" AND ");
  sql += " ORDER BY created_date DESC LIMIT 100";

  const rows = db.prepare(sql).all(...params).map((r) => ({ ...r, published: r.published === 1, featured: r.featured === 1 }));
  res.json(rows);
});

router.get("/slug/:slug", (req, res) => {
  const row = db.prepare(`SELECT * FROM ${TABLE} WHERE slug = ?`).get(req.params.slug);
  if (!row) return res.status(404).json({ error: "Post not found" });
  res.json({ ...row, published: row.published === 1, featured: row.featured === 1 });
});

router.get("/:id", (req, res) => {
  const row = getRow(TABLE, req.params.id);
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.post("/", requireAdmin, (req, res) => {
  if (!req.body.slug && req.body.title) {
    req.body.slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  res.status(201).json(createRow(TABLE, req.body));
});

router.put("/:id",    requireAdmin, (req, res) => res.json(updateRow(TABLE, req.params.id, req.body)));
router.delete("/:id", requireAdmin, (req, res) => res.json(deleteRow(TABLE, req.params.id)));

export default router;
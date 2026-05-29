/* eslint-disable no-undef */
import { Router } from "express";
import path from "path";
import fs from "fs";
import { upload, fileUrl } from "../middleware/upload.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

router.post("/", requireAdmin, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file received" });
  res.json({ file_url: fileUrl(req.file.filename) });
});

router.delete("/", requireAdmin, (req, res) => {
  const { filename } = req.body;
  if (!filename) return res.status(400).json({ error: "filename required" });
  const safe = path.basename(filename);
  const filePath = path.resolve(process.env.UPLOAD_DIR || "./uploads", "images", safe);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  res.json({ deleted: safe });
});

export default router;
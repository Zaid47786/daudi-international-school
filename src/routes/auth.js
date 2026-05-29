/* eslint-env node */
import { Router } from "express";
import bcrypt from "bcryptjs";
import db from "../database/db.js";
import { signToken, requireAuth } from "../middleware/auth.js";

const router = Router();

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password required" });
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email.trim().toLowerCase());
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ error: "Invalid credentials" });
  const token = signToken(user);
  const { password: _pw, ...safeUser } = user;
  res.json({ token, user: safeUser });
});

// GET /api/auth/me
router.get("/me", requireAuth, (req, res) => res.json(req.user));

// PUT /api/auth/me — update name only
router.put("/me", requireAuth, (req, res) => {
  const { full_name } = req.body;
  if (!full_name) return res.status(400).json({ error: "full_name required" });
  db.prepare("UPDATE users SET full_name = ?, updated_date = ? WHERE id = ?")
    .run(full_name, new Date().toISOString(), req.user.id);
  const updated = db.prepare("SELECT id, full_name, email, role, created_date FROM users WHERE id = ?").get(req.user.id);
  res.json(updated);
});

// POST /api/auth/logout
router.post("/logout", (_req, res) => res.json({ message: "Logged out" }));

// POST /api/auth/change-password
router.post("/change-password", requireAuth, (req, res) => {
  const { current_password, new_password } = req.body;
  if (!current_password || !new_password) return res.status(400).json({ error: "Both fields required" });
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.user.id);
  if (!bcrypt.compareSync(current_password, user.password)) return res.status(401).json({ error: "Current password incorrect" });
  const hash = bcrypt.hashSync(new_password, 12);
  db.prepare("UPDATE users SET password = ?, updated_date = ? WHERE id = ?")
    .run(hash, new Date().toISOString(), req.user.id);
  res.json({ message: "Password updated" });
});

export default router;
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

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = signToken(user);
  const { password: _pw, ...safeUser } = user;
  res.json({ token, user: safeUser });
});

// GET /api/auth/me  — returns current user from token
router.get("/me", requireAuth, (req, res) => {
  res.json(req.user);
});

// PUT /api/auth/me — update current user's own profile (name only; email/role locked)
router.put("/me", requireAuth, (req, res) => {
  const allowed = ["full_name"];
  const updates = {};
  for (const k of allowed) {
    if (req.body[k] !== undefined) updates[k] = req.body[k];
  }
  if (!Object.keys(updates).length) return res.status(400).json({ error: "No updatable fields provided" });
  db.prepare(`UPDATE users SET ${Object.keys(updates).map((k) => `${k} = ?`).join(",")} , updated_date = ? WHERE id = ?`)
    .run(...Object.values(updates), new Date().toISOString(), req.user.id);
  const updated = db.prepare("SELECT id, full_name, email, role, created_date FROM users WHERE id = ?").get(req.user.id);
  res.json(updated);
});

// POST /api/auth/logout — client just discards token; endpoint for completeness
router.post("/logout", (_req, res) => {
  res.json({ message: "Logged out" });
});

// POST /api/auth/change-password
router.post("/change-password", requireAuth, (req, res) => {
  const { current_password, new_password } = req.body;
  if (!current_password || !new_password) return res.status(400).json({ error: "Both fields required" });

  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.user.id);
  if (!bcrypt.compareSync(current_password, user.password))
    return res.status(401).json({ error: "Current password incorrect" });

  const hash = bcrypt.hashSync(new_password, 12);
  db.prepare("UPDATE users SET password = ?, updated_date = ? WHERE id = ?")
    .run(hash, new Date().toISOString(), req.user.id);
  res.json({ message: "Password updated" });
});

export default router;
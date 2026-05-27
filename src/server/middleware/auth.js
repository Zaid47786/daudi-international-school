/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import db from "../database/db.js";

const SECRET = process.env.JWT_SECRET || "CHANGE_THIS_SECRET";

export function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role, full_name: user.full_name },
    SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

export function decodeToken(token) {
  try { return jwt.verify(token, SECRET); }
  catch { return null; }
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  const payload = decodeToken(token);
  if (!payload) return res.status(401).json({ error: "Invalid or expired token" });
  const user = db.prepare("SELECT id, full_name, email, role, created_date FROM users WHERE id = ?").get(payload.id);
  if (!user) return res.status(401).json({ error: "User not found" });
  req.user = user;
  next();
}

export function requireAdmin(req, res, next) {
  requireAuth(req, res, () => {
    if (req.user.role !== "admin") return res.status(403).json({ error: "Forbidden: admin only" });
    next();
  });
}

export function optionalAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (token) {
    const payload = decodeToken(token);
    if (payload) req.user = db.prepare("SELECT id, full_name, email, role FROM users WHERE id = ?").get(payload.id) || null;
  }
  next();
}
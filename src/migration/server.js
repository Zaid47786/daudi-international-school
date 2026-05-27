/* eslint-disable no-undef */
/**
 * DIS — Daudi International School
 * Standalone Express server for Asura Hosting / cPanel Node.js
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import crypto from "crypto";
import { exec } from "child_process";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Routes ────────────────────────────────────────────────────────────────────
import authRoutes from "./routes/auth.js";
import statsRoutes from "./routes/stats.js";
import eventsRoutes from "./routes/events.js";
import galleryRoutes from "./routes/gallery.js";
import blogRoutes from "./routes/blog.js";
import testimonialsRoutes from "./routes/testimonials.js";
import settingsRoutes from "./routes/settings.js";
import inquiriesRoutes from "./routes/inquiries.js";
import uploadRoutes from "./routes/upload.js";

const app = express();
const PORT = process.env.PORT || 3000;

// ── Ensure upload dirs exist ───────────────────────────────────────────────────
["uploads/images", "logs"].forEach((dir) => {
  const full = path.join(__dirname, dir);
  if (!fs.existsSync(full)) fs.mkdirSync(full, { recursive: true });
});

// ── Middleware ─────────────────────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: false, // React needs inline scripts
  crossOriginEmbedderPolicy: false,
}));
app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Access log
const logStream = fs.createWriteStream(path.join(__dirname, "logs/access.log"), { flags: "a" });
app.use(morgan("combined", { stream: logStream }));

// ── Static files ───────────────────────────────────────────────────────────────
// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
  maxAge: "30d",
  etag: true,
}));

// Serve built React frontend
const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath, {
  maxAge: "1d",
  etag: true,
  index: false, // We handle this manually below
}));

// ── API Routes ─────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/testimonials", testimonialsRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/inquiries", inquiriesRoutes);
app.use("/api/upload", uploadRoutes);

// ── Health check ───────────────────────────────────────────────────────────────
app.get("/api/health", (_, res) => res.json({ status: "ok", ts: Date.now() }));

// ── GitHub Auto-Deploy Webhook ─────────────────────────────────────────────────
// Receives push events from GitHub and rebuilds + restarts the app.
// Set WEBHOOK_SECRET in DirectAdmin env vars to secure this endpoint.
app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const secret = process.env.WEBHOOK_SECRET || "";
  const signature = req.headers["x-hub-signature-256"] || "";

  // Verify GitHub signature if secret is set
  if (secret) {
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(req.body);
    const digest = `sha256=${hmac.digest("hex")}`;
    if (!crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature))) {
      console.warn("[webhook] Invalid signature — rejected");
      return res.status(401).json({ error: "Unauthorized" });
    }
  }

  let event;
  try {
    event = JSON.parse(req.body.toString());
  } catch {
    return res.status(400).json({ error: "Bad request" });
  }

  const branch = process.env.BRANCH || "main";
  const pushedBranch = (event.ref || "").replace("refs/heads/", "");

  if (pushedBranch !== branch) {
    console.log(`[webhook] Push to '${pushedBranch}' — skipping (watching '${branch}')`);
    return res.json({ status: "skipped" });
  }

  console.log(`[webhook] Push on '${pushedBranch}' — deploying...`);
  res.json({ status: "deploying" });

  // Pull latest code and rebuild frontend (runs after response is sent)
  const appDir = process.env.APP_DIR || __dirname;
  const deployCmd = `cd ${appDir} && git pull origin ${branch} && npm install --production && cd src && npm install && npm run build`;
  exec(deployCmd, (err, stdout, stderr) => {
    if (err) {
      console.error("[webhook] Deploy error:", err.message);
    } else {
      console.log("[webhook] Deploy complete ✓");
      if (stdout) console.log(stdout);
      if (stderr) console.error(stderr);
    }
  });
});

// ── SPA fallback ──────────────────────────────────────────────────────────────
// All non-API routes return index.html so React Router works
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "API route not found" });
  }
  const indexPath = path.join(distPath, "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(503).send("App not built yet. Run: npm run build");
  }
});

// ── Global error handler ───────────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`DIS server running on port ${PORT}`);
});

export default app;
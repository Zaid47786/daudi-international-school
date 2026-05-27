/* global process, Buffer */
/**
 * Auto-Deploy Webhook Server
 * Listens for GitHub push events → pulls latest code → rebuilds frontend → live!
 *
 * Deploy this on Asura alongside your main server.js
 * Run on a different port (default: 4000)
 */

import crypto from "crypto";
import { exec } from "child_process";
import { promisify } from "util";
import http from "http";

const execAsync = promisify(exec);

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "your_webhook_secret_here";
const PORT = process.env.WEBHOOK_PORT || 4000;

// ── Path to your app root on Asura (where package.json and server.js live)
const APP_DIR = process.env.APP_DIR || "/home/yourusername/dis-app";

// ── Verify GitHub signature to ensure request is genuine
function verifySignature(payload, signature) {
  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
  hmac.update(payload);
  const digest = "sha256=" + hmac.digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
  } catch {
    return false;
  }
}

// ── Run deploy commands
async function deploy() {
  console.log(`[${new Date().toISOString()}] 🚀 Deploy triggered!`);

  const commands = [
    `cd ${APP_DIR} && git pull origin main`,
    `cd ${APP_DIR} && npm install --omit=dev`,
    `cd ${APP_DIR} && npm run build`,
  ];

  for (const cmd of commands) {
    console.log(`▶ Running: ${cmd}`);
    const { stdout, stderr } = await execAsync(cmd);
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
  }

  console.log(`[${new Date().toISOString()}] ✅ Deploy complete! Site is live.`);
}

// ── HTTP server
const server = http.createServer(async (req, res) => {
  if (req.method !== "POST" || req.url !== "/deploy") {
    res.writeHead(404);
    return res.end("Not found");
  }

  // Collect body
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const body = Buffer.concat(chunks);

  // Verify GitHub signature
  const signature = req.headers["x-hub-signature-256"];
  if (!signature || !verifySignature(body, signature)) {
    console.warn("⚠️  Unauthorized webhook attempt");
    res.writeHead(401);
    return res.end("Unauthorized");
  }

  // Only deploy on push to main branch
  const payload = JSON.parse(body.toString());
  if (payload.ref !== "refs/heads/main") {
    res.writeHead(200);
    return res.end("Ignored (not main branch)");
  }

  res.writeHead(200);
  res.end("Deploy started");

  // Run deploy in background
  deploy().catch((err) => {
    console.error("❌ Deploy failed:", err.message);
  });
});

server.listen(PORT, () => {
  console.log(`🔗 Webhook server listening on port ${PORT}`);
  console.log(`   Endpoint: POST http://localhost:${PORT}/deploy`);
});
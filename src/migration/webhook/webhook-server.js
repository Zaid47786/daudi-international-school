/* eslint-env node */
/* global process, Buffer */
/**
 * webhook-server.js
 * 
 * Lightweight HTTP server that listens for GitHub push webhooks
 * and auto-deploys the latest code on your Asura hosting.
 * 
 * SETUP:
 *   1. Place this file in your server root (e.g. /home/username/webhook-server.js)
 *   2. Set environment variables (see below)
 *   3. Start with PM2: pm2 start webhook-server.js --name dis-webhook
 * 
 * ENVIRONMENT VARIABLES:
 *   WEBHOOK_SECRET   — GitHub webhook secret (set in GitHub repo → Settings → Webhooks)
 *   WEBHOOK_PORT     — Port to listen on (default: 9000)
 *   APP_DIR          — Absolute path to your app root (where server.js lives)
 *   BRANCH           — Branch to deploy (default: main)
 */

import http from "http";
import crypto from "crypto";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const SECRET      = process.env.WEBHOOK_SECRET || "";
const PORT        = parseInt(process.env.WEBHOOK_PORT || "9000", 10);
const APP_DIR     = process.env.APP_DIR || "/home/username/dis-app";
const BRANCH      = process.env.BRANCH || "main";
const FRONTEND_DIR = `${APP_DIR}/frontend`; // Base44 exported React app

// ── Verify GitHub signature ────────────────────────────────────────────────
function verifySignature(payload, signature) {
  if (!SECRET) return true; // skip verification if no secret set (not recommended)
  const hmac = crypto.createHmac("sha256", SECRET);
  hmac.update(payload);
  const digest = `sha256=${hmac.digest("hex")}`;
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}

// ── Deploy script ─────────────────────────────────────────────────────────
async function deploy(branch) {
  console.log(`[deploy] Starting deploy for branch: ${branch}`);

  const commands = [
    // 1. Pull latest code
    `cd ${APP_DIR} && git pull origin ${BRANCH}`,
    // 2. Install backend dependencies (if package.json changed)
    `cd ${APP_DIR} && npm install --production`,
    // 3. Build the React frontend
    `cd ${FRONTEND_DIR} && npm install && npm run build`,
    // 4. Restart the app server via PM2
    `pm2 restart dis-server`,
  ];

  for (const cmd of commands) {
    console.log(`[deploy] Running: ${cmd}`);
    const { stdout, stderr } = await execAsync(cmd);
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
  }

  console.log("[deploy] Deploy complete ✓");
}

// ── HTTP server ───────────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  if (req.method !== "POST" || req.url !== "/webhook") {
    res.writeHead(404);
    return res.end("Not found");
  }

  const chunks = [];
  req.on("data", (chunk) => chunks.push(chunk));
  req.on("end", async () => {
    const payload = Buffer.concat(chunks);
    const signature = req.headers["x-hub-signature-256"] || "";

    // Verify GitHub signature
    if (SECRET && !verifySignature(payload, signature)) {
      console.warn("[webhook] Invalid signature — rejected");
      res.writeHead(401);
      return res.end("Unauthorized");
    }

    let event;
    try {
      event = JSON.parse(payload.toString());
    } catch {
      res.writeHead(400);
      return res.end("Bad request");
    }

    // Only deploy on push to target branch
    const pushedBranch = (event.ref || "").replace("refs/heads/", "");
    if (pushedBranch !== BRANCH) {
      console.log(`[webhook] Push to '${pushedBranch}' — skipping (watching '${BRANCH}')`);
      res.writeHead(200);
      return res.end("Skipped");
    }

    console.log(`[webhook] Push received on '${pushedBranch}' — deploying...`);
    res.writeHead(200);
    res.end("Deploying...");

    // Run deploy async (don't block the response)
    deploy(pushedBranch).catch((err) => {
      console.error("[deploy] Error:", err.message);
    });
  });
});

server.listen(PORT, () => {
  console.log(`[webhook] Listening on port ${PORT}`);
  console.log(`[webhook] APP_DIR: ${APP_DIR}`);
  console.log(`[webhook] Branch: ${BRANCH}`);
  console.log(`[webhook] Secret: ${SECRET ? "set ✓" : "NOT SET (insecure!)"}`);
});
/**
 * server.cjs — CommonJS entry point shim
 * Delegates to server.mjs (ESM).
 * Use this if your host requires a .cjs entry point.
 *
 * Usage: node server.cjs
 */

// Dynamic import to load the ESM server
import("./server.mjs").catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
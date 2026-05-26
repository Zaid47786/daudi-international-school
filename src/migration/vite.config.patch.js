/* eslint-disable no-undef */
/**
 * vite.config.js — replace the one in your exported Base44 frontend root.
 *
 * PROJECT LAYOUT ASSUMPTIONS:
 *   dis-app/
 *   ├── server.js          ← Express server
 *   ├── package.json       ← from migration/package.json
 *   ├── frontend/          ← your Base44 export (React app)
 *   │   ├── vite.config.js ← REPLACE with this file
 *   │   ├── src/
 *   │   └── ...
 *   ├── dist/              ← built by Vite, served by Express (created on build)
 *   ├── database/
 *   └── uploads/
 *
 * If your frontend IS the root (not in a subfolder), change outDir to "./dist"
 * and make sure server.js lives in the same directory.
 *
 * Key changes vs Base44 default:
 *   - build.outDir points one level up (Express serves dist/ from server root)
 *   - /api and /uploads are proxied to Express in dev mode
 *   - @base44/vite-plugin removed (not needed without Base44 platform)
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => ({
  plugins: [react()],

  resolve: {
    alias: {
      // Keeps @/ imports working exactly as in Base44
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    // Output to ../dist (one level up, next to server.js)
    // Change to "./dist" if frontend and server.js are in the same directory
    outDir: "../dist",
    emptyOutDir: true,

    rollupOptions: {
      output: {
        // Split large chunks for better caching
        manualChunks: {
          vendor:   ["react", "react-dom", "react-router-dom"],
          ui:       ["framer-motion", "lucide-react"],
          charts:   ["recharts"],
          editor:   ["react-quill"],
        },
      },
    },
  },

  // Dev server: proxy API and uploads to the Express backend
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: `http://localhost:${process.env.PORT || 3000}`,
        changeOrigin: true,
      },
      "/uploads": {
        target: `http://localhost:${process.env.PORT || 3000}`,
        changeOrigin: true,
      },
    },
  },
}));
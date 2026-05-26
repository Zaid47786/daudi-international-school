/**
 * vite.config.js — replace the one in your exported frontend root.
 * 
 * Key changes vs Base44 default:
 *  - build.outDir points to ../dist (Express serves it)
 *  - proxy /api to Express in dev mode
 *  - No Base44 plugin
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
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    outDir: "../dist",   // Express serves from /dist next to server.js
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui:     ["framer-motion", "lucide-react"],
        },
      },
    },
  },

  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/uploads": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
}));
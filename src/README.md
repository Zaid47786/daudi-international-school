# Daudi International School — daudischool.in

This repository contains **two separate parts** of the website. They are kept together for convenience but are deployed independently.

---

## 📁 Project Structure

```
/ (repo root)
├── 📂 src/                  ← REACT FRONTEND (this is what Base44 builds & previews)
│   ├── pages/
│   ├── components/
│   ├── api/base44Client.js  ← API client that talks to the Express server
│   ├── App.jsx
│   └── ...
│
├── 📂 server/               ← EXPRESS BACKEND (deploy this to Asura hosting)
│   ├── server.js            ← Entry point — run: node server.js
│   ├── package.json         ← Server dependencies (separate from frontend)
│   ├── ecosystem.config.js  ← PM2 config for DirectAdmin
│   ├── .env.example         ← Copy to .env and fill in values
│   ├── database/
│   │   ├── schema.sql                 ← SQLite table definitions
│   │   ├── db.js                      ← Database connection
│   │   ├── init.js                    ← Run once: creates tables
│   │   ├── seed.js                    ← Run once: creates admin + settings
│   │   └── migrate-from-base44.sql    ← Run once: imports live data
│   ├── routes/              ← API route handlers
│   ├── middleware/          ← JWT auth + file upload
│   └── utils/               ← Shared CRUD helpers
│
├── package.json             ← FRONTEND dependencies (Vite + React)
├── vite.config.js           ← FRONTEND build config
└── index.html               ← FRONTEND entry point
```

---

## 🖥️ Frontend (React)

- **Location:** repo root (`src/`, `App.jsx`, `vite.config.js`, `package.json`)
- **Purpose:** The React website — all pages, components, and UI
- **Dev:** Edited and previewed on Base44
- **Build:** `npm run build` → outputs to `server/dist/`
- **API calls:** Go to `/api/...` which the Express server handles

## ⚙️ Backend (Express + SQLite)

- **Location:** `server/` folder
- **Purpose:** REST API, database, authentication, file uploads, auto-deploy webhook
- **Deploy:** Upload the `server/` folder to Asura (DirectAdmin Node.js app)
- **Start:** `node server.js` or `pm2 start ecosystem.config.js`

---

## 🚀 Deploying to Asura

```bash
# 1. On Asura — go to your app directory
cd /home/daudisch/domains/daudischool.in/app

# 2. Upload/clone the server/ folder contents here
#    The app directory should look like:
#      server.js, package.json, ecosystem.config.js, .env
#      database/, routes/, middleware/, utils/
#      uploads/, logs/, dist/

# 3. Install server dependencies
npm install

# 4. Set up environment
cp .env.example .env
nano .env   # set JWT_SECRET and ADMIN_PASSWORD

# 5. Initialize & seed the database (run once)
node database/init.js
node database/seed.js
sqlite3 dis.db < database/migrate-from-base44.sql

# 6. Build the React frontend (from repo root, on your local machine or CI)
npm run build
# Then upload the generated dist/ folder into the app directory on Asura

# 7. Start the server
pm2 start ecosystem.config.js
```

---

## 🔑 Key Rules

| Rule | Detail |
|------|--------|
| Never mix them | `server/package.json` is for Node/Express. Root `package.json` is for React/Vite. |
| Only one server.js | `server/server.js` is the ONLY server file. There is no other. |
| Frontend talks to backend | Via `src/api/base44Client.js` → `VITE_API_URL` env var (defaults to `/api`) |
| Admin login | Go to `/admin` on the live site. Credentials set in `.env` → `ADMIN_EMAIL` / `ADMIN_PASSWORD` |
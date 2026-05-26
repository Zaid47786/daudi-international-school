# Local Testing Guide

This guide walks you through verifying the full stack works on your local machine
before uploading to Asura Hosting.

---

## Prerequisites

- Node.js 18 or 20 installed (`node --version`)
- npm 9+ installed (`npm --version`)
- Git (optional but recommended)

---

## Step 1 — Set up the project

```bash
# Unzip Base44 export and set up
unzip your-base44-export.zip -d dis-app
cd dis-app

# Copy all server-side migration files to root
cp -r migration/database ./database
cp -r migration/middleware ./middleware
cp -r migration/routes ./routes
cp -r migration/utils ./utils
cp migration/server.js ./server.js
cp migration/package.json ./package.json
cp migration/ecosystem.config.js ./ecosystem.config.js
cp migration/.env.example ./.env.example
cp migration/.env.example ./.env

# Edit .env — minimum: set JWT_SECRET
nano .env
```

---

## Step 2 — Patch the frontend

```bash
# Patch API client
cp migration/src_api/apiClient.js src/api/apiClient.js
cp migration/src_api/AuthContext.jsx src/api/AuthContext.jsx
cp migration/src_api/AdminLoginPage.jsx src/pages/AdminLogin.jsx

# Patch vite config
cp migration/vite.config.patch.js vite.config.js

# Create frontend .env
echo "VITE_API_URL=/api" > .env   # or create a .env file in frontend/ if it's a subfolder

# Apply search & replace (see SEARCH_AND_REPLACE.md for exact patterns)
# Most important: replace all "base44Client" imports with "apiClient"
# and "lib/AuthContext" with "api/AuthContext"
```

**Patch `src/App.jsx`** — add AdminLogin route:

```jsx
// At top of file with other imports:
import AdminLogin from "./pages/AdminLogin";

// Inside <Routes>:
<Route path="/admin/login" element={<AdminLogin />} />
```

**Patch `src/pages/Admin.jsx`** — replace the hardcoded password block with JWT auth:

```jsx
// Add import at top:
import { useAuth } from "@/api/AuthContext";

// Replace the entire hardcoded password section:
const { user, isLoadingAuth } = useAuth();

if (isLoadingAuth) {
  return (
    <div className="min-h-screen bg-cobalt-deep flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-amber/30 border-t-amber rounded-full animate-spin" />
    </div>
  );
}

if (!user || user.role !== "admin") {
  window.location.href = "/admin/login";
  return null;
}
```

---

## Step 3 — Install dependencies and build

```bash
# Install server deps
npm install

# Install and build frontend
# (if frontend is a subfolder called "frontend/")
cd frontend
npm install
npm run build
cd ..

# (if frontend is the root directory — vite.config.js is in root)
npm install   # already done for server, this runs frontend deps
npm run build
```

---

## Step 4 — Initialise database

```bash
node database/init.js
# Output: Database initialised at: ./database/dis.db

node database/seed.js
# Output: Admin created: admin@daudischool.in
#         Default settings seeded.
#         Seed complete.
```

---

## Step 5 — Start the server

```bash
node server.js
# Output: DIS server running on port 3000
```

Open http://localhost:3000 — the homepage should load.

---

## Step 6 — Verify each feature

### Public pages
```
http://localhost:3000/          → Home page with stats and events
http://localhost:3000/about     → About page
http://localhost:3000/blog      → Blog list
http://localhost:3000/gallery   → Gallery
http://localhost:3000/admissions → Admissions with inquiry form
http://localhost:3000/events    → Events
http://localhost:3000/contact   → Contact
```

### API endpoints (test with curl or browser)
```bash
curl http://localhost:3000/api/health
# → {"status":"ok","ts":...}

curl http://localhost:3000/api/stats
# → [] (empty until you add stats in admin)

curl http://localhost:3000/api/settings
# → [{"id":"...","key":"school_name","value":"Daudi International School",...}, ...]

curl http://localhost:3000/api/events
# → []

curl http://localhost:3000/api/blog
# → []
```

### Admin login
```
http://localhost:3000/admin/login
```
Login with credentials set in `.env` (ADMIN_EMAIL / ADMIN_PASSWORD).
Default: `admin@daudischool.in` / `changeme123`

### Admin panel
After login, visit:
```
http://localhost:3000/admin
```
Try:
- Adding a Stat
- Creating a Blog post
- Uploading a Gallery photo (tests file upload)
- Submitting an Admission Inquiry from /admissions
- Viewing the inquiry in Admin → Inquiries

### SPA routing
```bash
# These must all return index.html (React Router handles them client-side)
curl -I http://localhost:3000/about
curl -I http://localhost:3000/blog/some-slug
curl -I http://localhost:3000/gallery
```

### Dev mode with hot-reload
Run two terminals simultaneously:

**Terminal 1 — Express server:**
```bash
NODE_ENV=development node --watch server.js
```

**Terminal 2 — Vite dev server:**
```bash
cd frontend   # or root if not in subfolder
npm run dev
# Open http://localhost:5173
# API calls proxy to http://localhost:3000
```

---

## Common Local Issues

| Symptom | Fix |
|---------|-----|
| `Cannot find module 'better-sqlite3'` | Run `npm install` in project root |
| `SQLITE_CANTOPEN` | Run `node database/init.js` |
| `401 Unauthorized` on admin API calls | Token expired — log in again at /admin/login |
| Images returning 404 | Check `UPLOAD_DIR` in `.env`; ensure `uploads/images/` exists |
| Blank page on http://localhost:3000 | Build the frontend: `cd frontend && npm run build` |
| React Router routes returning 404 | SPA fallback is handled by Express — only happens if static serving is broken |
| `Invalid token` | `JWT_SECRET` changed after login — clear localStorage and log in again |
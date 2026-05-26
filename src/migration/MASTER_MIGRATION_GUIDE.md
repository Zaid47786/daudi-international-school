# Master Migration Guide
## Daudi International School — Base44 Export → Asura Hosting

This is the single, definitive reference for the entire migration process.
Follow every step in order. Do not skip steps.

---

## Overview

You are moving from a hosted Base44 React app to a standalone Node.js stack:

| Before (Base44) | After (Self-hosted) |
|---|---|
| Base44 backend + SDK | Express.js + SQLite |
| Base44 auth (hosted) | JWT auth (your server) |
| Base44 entities API | REST API (your routes) |
| Base44 file storage | Local uploads/ directory |
| base44Client.js | apiClient.js (drop-in) |
| No server to maintain | Node.js process on Asura |

**Tech stack after migration:**
- Runtime: Node.js 18+ (ESM)
- Server: Express 4
- Database: SQLite via better-sqlite3 (no separate DB process, ~50–120MB RAM)
- Auth: JWT (jsonwebtoken + bcryptjs)
- Uploads: multer → `uploads/images/`
- Frontend: React 18 + Vite (same source, just different API client)

---

## Part 1 — Prepare Your Machine

### 1.1 Check Node.js version

```bash
node --version   # must be v18.0.0 or higher
npm --version    # must be v9 or higher
```

If Node.js is not installed or is older than v18:
- Windows/Mac: download from https://nodejs.org (LTS version)
- Ubuntu/Debian: `sudo apt install nodejs npm` (check version first)

### 1.2 Get the Base44 export

Export your app from the Base44 dashboard (Settings → Export → Download ZIP).

```bash
unzip your-base44-export.zip -d dis-app
cd dis-app
ls    # you should see: src/, public/, index.html, vite.config.js, package.json, etc.
```

---

## Part 2 — Copy Migration Files

All server-side files come from the `migration/` folder in this repository.

### 2.1 Copy server files to project root

```bash
# From inside dis-app/ (your Base44 export directory)

# Server
cp -r migration/database ./database
cp -r migration/middleware ./middleware
cp -r migration/routes ./routes
cp -r migration/utils ./utils
cp migration/server.js ./server.js
cp migration/package.json ./server-package.json   # rename to avoid conflicts!
cp migration/ecosystem.config.js ./ecosystem.config.js
cp migration/.env.example ./.env.example
```

**Important:** Your Base44 export already has a `package.json` for the React app.
The server has its own `package.json`. You have two choices:

**Option A (recommended) — separate directories:**
```bash
mkdir -p server
cp migration/server.js server/
cp -r migration/database server/database
cp -r migration/middleware server/middleware
cp -r migration/routes server/routes
cp -r migration/utils server/utils
cp migration/package.json server/package.json
cp migration/ecosystem.config.js server/ecosystem.config.js
cp migration/.env.example server/.env.example
```
Then all server commands are run from `server/`. The Vite `outDir` in `vite.config.js`
should be `"../server/dist"`.

**Option B — flat structure (server + frontend in same dir):**
```bash
# Merge server-package.json dependencies into your existing package.json manually
# Copy all server files to root
# Change vite outDir to "./dist"
```

This guide assumes **Option A** going forward.

### 2.2 Patch the frontend API client

```bash
# Create api/ directory if it doesn't exist
mkdir -p src/api

# Copy the drop-in clients
cp migration/src_api/apiClient.js src/api/apiClient.js
cp migration/src_api/AuthContext.jsx src/api/AuthContext.jsx

# Copy the admin login page
cp migration/src_api/AdminLoginPage.jsx src/pages/AdminLogin.jsx
```

### 2.3 Replace vite.config.js

```bash
cp migration/vite.config.patch.js vite.config.js
```

Edit `vite.config.js` and verify the `build.outDir` value:
- If frontend is in root and server is in `server/`: `outDir: "./server/dist"`
- If frontend is in `frontend/` subfolder next to server: `outDir: "../dist"`

### 2.4 Create frontend .env

Create a `.env` file in the frontend directory (same level as `vite.config.js`):

```bash
echo "VITE_API_URL=/api" > .env
```

This ensures Vite proxies API calls to Express in dev mode, and uses `/api` as the
base URL in production builds.

---

## Part 3 — Patch Frontend Source Code

### 3.1 Global import replacement

Open every `.jsx` and `.js` file in `src/` and apply these replacements:

**Replace 1 — API client:**
```
Find:    import { base44 } from "@/api/base44Client";
Replace: import { base44 } from "@/api/apiClient";
```

**Replace 2 — AuthContext (AuthProvider):**
```
Find:    import { AuthProvider, useAuth } from "@/lib/AuthContext";
Replace: import { AuthProvider, useAuth } from "@/api/AuthContext";
```

**Replace 3 — AuthContext (useAuth only):**
```
Find:    import { useAuth } from "@/lib/AuthContext";
Replace: import { useAuth } from "@/api/AuthContext";
```

**Replace 4 — Remove Base44 media URLs:**
```
Find:    https://media.base44.com/images/public/user_68a720ca6a1156f1068d37b1/9fb988c1a_dis.png
Replace: /dis.png
```
Download the DIS logo and save it as `public/dis.png`.

**Replace 5 — Remove createPageUrl:**
```
Find:    import { createPageUrl } from "@/utils";
Replace: (delete this import — use <Link to="/path"> instead)
```

**Replace 6 — Remove UserNotRegisteredError:**
```
Find:    import UserNotRegisteredError from "@/components/UserNotRegisteredError";
         <UserNotRegisteredError />
Replace: (delete both lines — not needed in self-hosted mode)
```

### 3.2 Patch `src/App.jsx`

Add the AdminLogin import and route:

```jsx
// At the top with other page imports:
import AdminLogin from "./pages/AdminLogin";

// Inside <Routes>, add this route:
<Route path="/admin/login" element={<AdminLogin />} />
```

Remove `UserNotRegisteredError` usage from `AuthenticatedApp` if present:

```jsx
// Remove this block entirely:
if (authError) {
  if (authError.type === 'user_not_registered') {
    return <UserNotRegisteredError />;
  } else if (authError.type === 'auth_required') {
    navigateToLogin();
    return null;
  }
}
```

The standalone `AuthContext` never sets typed errors — unauthenticated users are
simply `user: null`, and the admin route handles the redirect itself.

### 3.3 Patch `src/pages/Admin.jsx`

The current Admin page uses a hardcoded password (`"Me2DIS"`). Replace this with
proper JWT auth.

**Remove** the entire `const ADMIN_PASSWORD = "Me2DIS"` block and the `authenticated`
state + password form. Replace it with:

```jsx
// Add at top:
import { useAuth } from "@/api/AuthContext";

// Inside the Admin component, at the very top (before any hooks/state):
const { user, isLoadingAuth } = useAuth();

if (isLoadingAuth) {
  return (
    <div className="min-h-screen bg-cobalt-deep flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  );
}

if (!user || user.role !== "admin") {
  window.location.href = "/admin/login";
  return null;
}
```

**Update the logout handler:**

```jsx
const handleLogout = () => {
  base44.auth.logout("/");
};
```

This now calls `apiClient.auth.logout()` which clears the JWT and redirects.

### 3.4 Optional: delete `src/lib/AuthContext.jsx`

The standalone `AuthContext` replaces it. Keep the file if other components import
from `@/lib/AuthContext` — just make sure those imports have been updated to
`@/api/AuthContext`.

---

## Part 4 — Server Setup

### 4.1 Create `.env`

```bash
cd server/     # or project root if using flat structure
cp .env.example .env
```

Edit `.env` and set:

```env
NODE_ENV=production
PORT=3000
JWT_SECRET=<generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
JWT_EXPIRES_IN=7d
DB_PATH=./database/dis.db
UPLOAD_DIR=./uploads
MAX_FILE_SIZE_MB=10
ADMIN_EMAIL=admin@daudischool.in
ADMIN_PASSWORD=<your strong password>
ADMIN_NAME=DIS Administrator
FRONTEND_URL=https://daudischool.in
```

### 4.2 Install server dependencies

```bash
npm install
```

All dependencies are in `package.json`. Expected packages:
`express`, `cors`, `helmet`, `compression`, `morgan`, `better-sqlite3`,
`bcryptjs`, `jsonwebtoken`, `multer`, `uuid`, `dotenv`

### 4.3 Initialise the database

```bash
node database/init.js
# Creates database/dis.db with all tables (schema.sql applied automatically)
```

### 4.4 Seed the database

```bash
node database/seed.js
# Creates admin user
# Seeds 10 default school settings (school_name, phone, email, etc.)
```

### 4.5 Test locally

```bash
node server.js
```

Verify:
```bash
curl http://localhost:3000/api/health
# {"status":"ok","ts":...}

curl http://localhost:3000/api/settings
# [{...}, {...}]  ← default settings
```

---

## Part 5 — Frontend Build

### 5.1 Install frontend dependencies

```bash
cd ../   # back to frontend root (the Base44 export)
npm install
```

### 5.2 Build for production

```bash
npm run build
```

Vite builds to `../server/dist/` (or wherever `outDir` points in `vite.config.js`).

After build, verify:
```bash
ls server/dist/
# index.html  assets/
```

### 5.3 Full-stack test

With the server running on port 3000:
```bash
open http://localhost:3000
```

The homepage should load, pulling settings and stats from the SQLite database.

---

## Part 6 — Deploy to Asura Hosting

### 6.1 Prepare deployment archive

```bash
# From project root — include everything EXCEPT node_modules and .env
zip -r dis-app.zip server/ \
  --exclude "server/node_modules/*" \
  --exclude "server/*.db" \
  --exclude "server/logs/*" \
  --exclude "server/.env"

# The dist/ folder MUST be included — build it before zipping
```

### 6.2 Upload to server

**Via SSH (recommended):**
```bash
scp dis-app.zip username@your-server.com:~/
ssh username@your-server.com
cd ~
unzip dis-app.zip
mv server dis-app
cd dis-app
```

**Via cPanel File Manager:**
1. Open cPanel → File Manager
2. Navigate to your home directory
3. Upload `dis-app.zip`
4. Right-click → Extract
5. Rename extracted folder to `dis-app`

### 6.3 Install server dependencies on Asura

```bash
# SSH into server
cd ~/dis-app
npm install --omit=dev
```

### 6.4 Create `.env` on server

```bash
cp .env.example .env
nano .env   # fill in production values
```

### 6.5 Initialise database on server

```bash
node database/init.js
node database/seed.js
```

### 6.6 Configure cPanel Node.js App

1. Login to cPanel → **Setup Node.js App**
2. Click **+ Create Application**
3. Settings:
   - **Node.js version:** 18.x (or 20.x if available)
   - **Application mode:** Production
   - **Application root:** `dis-app` (relative to home, e.g. `/home/username/dis-app`)
   - **Application URL:** `daudischool.in` (your domain)
   - **Application startup file:** `server.js`
4. Click **Create**
5. Click **Run NPM Install** (or use SSH command above)
6. Click **Edit** → add environment variables:
   ```
   NODE_ENV = production
   PORT = 3000
   JWT_SECRET = <your long random string>
   JWT_EXPIRES_IN = 7d
   DB_PATH = ./database/dis.db
   UPLOAD_DIR = ./uploads
   MAX_FILE_SIZE_MB = 10
   FRONTEND_URL = https://daudischool.in
   ```
7. Click **Start Application**

### 6.7 Configure reverse proxy (.htaccess)

Asura uses LiteSpeed or Apache. Create/edit `.htaccess` in your domain's
**document root** (often `public_html/`):

```apache
RewriteEngine On

# Allow direct access to static assets
RewriteCond %{REQUEST_URI} ^/assets/ [OR]
RewriteCond %{REQUEST_URI} ^/uploads/ [OR]
RewriteCond %{REQUEST_URI} ^/dis\.png$
RewriteRule ^ - [L]

# Proxy everything else to the Node.js app
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]

ProxyPassReverse / http://127.0.0.1:3000/
```

If your Node app listens on a different port (check cPanel — it may assign one),
replace `3000` with that port.

### 6.8 Enable SSL

cPanel → **SSL/TLS** → **Let's Encrypt** → issue for `daudischool.in` and `www.daudischool.in`.

LiteSpeed handles HTTPS termination. Your Node app stays on HTTP internally.

---

## Part 7 — Post-Deployment Verification

Visit each URL and confirm it works:

```
https://daudischool.in/                      → Homepage (stats, events, testimonials)
https://daudischool.in/about                 → About page
https://daudischool.in/academics             → Academics
https://daudischool.in/admissions            → Admissions + inquiry form
https://daudischool.in/events                → Events list
https://daudischool.in/gallery               → Gallery with photos
https://daudischool.in/blog                  → Blog list
https://daudischool.in/blog/<slug>           → Individual blog post
https://daudischool.in/contact               → Contact page
https://daudischool.in/admin/login           → Admin login page
https://daudischool.in/admin                 → Admin panel (after login)
https://daudischool.in/api/health            → {"status":"ok","ts":...}
```

### Admin panel verification

1. Login at `/admin/login`
2. **School Info tab** — edit school name, save, refresh homepage to confirm it changed
3. **Stats tab** — add a stat, verify it appears on homepage
4. **Events tab** — create an event, verify it appears at /events
5. **Gallery tab** — upload an image, verify it appears at /gallery
6. **Blog tab** — create and publish a post, verify at /blog/[slug]
7. **Inquiries tab** — submit a form at /admissions, check it appears here

---

## Part 8 — API Endpoint Reference

All endpoints are prefixed with `/api`.

### Auth
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/auth/login` | public | `{email, password}` → `{token, user}` |
| GET | `/auth/me` | Bearer token | Returns current user |
| PUT | `/auth/me` | Bearer token | Update full_name |
| POST | `/auth/logout` | public | Client-side logout (token discard) |
| POST | `/auth/change-password` | Bearer token | `{current_password, new_password}` |

### Stats
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/stats` | public | List all stats (ordered by sort_order) |
| POST | `/stats` | admin | Create stat |
| PUT | `/stats/:id` | admin | Update stat |
| DELETE | `/stats/:id` | admin | Delete stat |

### Events
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/events` | public | List events; `?status=upcoming\|past` |
| GET | `/events/:id` | public | Get single event |
| POST | `/events` | admin | Create event |
| PUT | `/events/:id` | admin | Update event |
| DELETE | `/events/:id` | admin | Delete event |

### Gallery
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/gallery` | public | List photos; `?category=Campus\|Events\|...` |
| GET | `/gallery/:id` | public | Get single photo |
| POST | `/gallery` | admin | Create photo record |
| PUT | `/gallery/:id` | admin | Update photo |
| DELETE | `/gallery/:id` | admin | Delete photo |

### Blog
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/blog` | public | List published posts; `?slug=xxx`, `?category=...`, `?featured=1` |
| GET | `/blog/slug/:slug` | public | Get post by slug (alternative to ?slug=) |
| GET | `/blog/:id` | public | Get post by UUID |
| POST | `/blog` | admin | Create post (auto-generates slug from title if missing) |
| PUT | `/blog/:id` | admin | Update post |
| DELETE | `/blog/:id` | admin | Delete post |

### Testimonials
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/testimonials` | public | List; `?featured=1` for featured only |
| POST | `/testimonials` | admin | Create |
| PUT | `/testimonials/:id` | admin | Update |
| DELETE | `/testimonials/:id` | admin | Delete |

### Settings
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/settings` | public | All settings as array with `key` and `value` fields |
| POST | `/settings` | admin | Create new setting |
| PUT | `/settings/:id` | admin | Update setting by UUID |

### Inquiries
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/inquiries` | public | Submit admission inquiry |
| GET | `/inquiries` | admin | List all; `?status=new\|contacted\|...` |
| GET | `/inquiries/:id` | admin | Get single inquiry |
| PUT | `/inquiries/:id` | admin | Update status/notes |
| DELETE | `/inquiries/:id` | admin | Delete inquiry |

### Upload
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/upload` | admin | Multipart upload; field name `file`; returns `{file_url}` |
| DELETE | `/upload` | admin | `{filename}` body; deletes file from disk |

### Health
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/health` | public | Returns `{"status":"ok","ts":...}` |

---

## Part 9 — Database Schema Summary

All tables use TEXT UUIDs as primary keys (generated by `uuid` package).
Timestamps are ISO-8601 strings in UTC.

| Table | Entity | Key fields |
|---|---|---|
| `users` | (internal) | email UNIQUE, password (bcrypt), role |
| `stats` | Stat | label, value, icon, sort_order |
| `events` | Event | title, date, category, status, featured |
| `gallery_photos` | GalleryPhoto | title, src, category, sort_order, is_real |
| `blog_posts` | BlogPost | title, slug UNIQUE, published, featured, content |
| `testimonials` | Testimonial | parent_name, quote, rating, is_featured, sort_order |
| `school_settings` | SchoolSettings | key_name UNIQUE, value, group_name |
| `admission_inquiries` | AdmissionInquiry | parent_name, child_name, phone, grade, status |

Boolean fields (`published`, `featured`, `is_real`, `is_featured`) are stored as
`INTEGER 0/1` in SQLite and automatically converted to JavaScript booleans by `crud.js`.

---

## Part 10 — Troubleshooting

### Server won't start

```
Error: Cannot find module 'express'
```
→ Run `npm install` in the server directory.

```
SQLITE_CANTOPEN: unable to open database file
```
→ Run `node database/init.js`. Check that `DB_PATH` directory is writable.

```
Error: JWT_SECRET is not set
```
→ Ensure `.env` exists and `JWT_SECRET` has a value. The server starts anyway with the
   default insecure key, but you should always set it.

### Frontend shows blank page

→ Ensure `dist/index.html` exists. Run `npm run build` in the frontend directory.
→ Check Express can read `dist/` — verify the path in `server.js` (`../dist` or `./dist`).

### Login returns 401

→ Re-run `node database/seed.js` to ensure admin user exists.
→ Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env` match what you're typing.

### Admin page redirects back to /admin/login

→ JWT token in localStorage may be expired or corrupted.
→ Open DevTools → Application → Local Storage → delete `dis_token` → log in again.

### Images upload but don't display

→ Check `UPLOAD_DIR` in `.env` — it must be a writable directory.
→ Verify `app.use("/uploads", express.static(...))` in `server.js` uses the correct path.
→ Check `uploads/images/` directory permissions on server (chmod 755).

### API calls return HTML instead of JSON

→ The reverse proxy (.htaccess) is not routing `/api` requests to Node.js.
→ Verify mod_proxy is enabled on your Asura account. Contact their support.

### SPA routes return 404

→ The `.htaccess` proxy is not catching all routes. Verify the RewriteRule is correct.
→ Or, if the Node.js app isn't running, all routes will 404. Check cPanel app status.

### CORS errors in browser

→ Set `FRONTEND_URL=https://daudischool.in` in `.env`. Do not use `*` in production
   if you're using credentials (JWT via Authorization header is fine with `*`).

---

## Part 11 — Memory and Performance Notes

This stack is designed to run on shared hosting with limited RAM.

| Component | RAM usage |
|---|---|
| Node.js 18 (idle) | ~40–60 MB |
| Express + all routes loaded | ~70–90 MB |
| better-sqlite3 + 8MB cache | +10–15 MB |
| Total at idle | **~80–120 MB** |
| Under load (many requests) | ~120–180 MB |

PM2 is configured with `max_memory_restart: "256M"` — if the process exceeds 256MB
(unlikely with this stack), PM2 restarts it automatically.

SQLite WAL mode means read queries don't block writes.
The synchronous pragma is set to NORMAL (not FULL) for better write performance
without risking data loss on most hardware.

---

## Appendix A — Files Changed Summary

| File | Action | Reason |
|---|---|---|
| `src/api/apiClient.js` | **NEW** (copy from migration) | Replaces Base44 SDK |
| `src/api/AuthContext.jsx` | **NEW** (copy from migration) | Replaces Base44 hosted auth |
| `src/pages/AdminLogin.jsx` | **NEW** (copy from migration) | JWT login page |
| `src/pages/Admin.jsx` | **PATCH** | Remove hardcoded password, add JWT auth |
| `src/App.jsx` | **PATCH** | Add AdminLogin route, remove UserNotRegisteredError |
| `vite.config.js` | **REPLACE** | Remove Base44 plugin, add proxy, set outDir |
| `.env` (frontend) | **NEW** | `VITE_API_URL=/api` |
| `server.js` | **NEW** (from migration) | Express entry point |
| `package.json` (server) | **NEW** (from migration) | Server dependencies |
| `.env` (server) | **NEW** (from .env.example) | Server config |
| `database/` | **NEW** (from migration) | SQLite setup |
| `middleware/` | **NEW** (from migration) | JWT + multer |
| `routes/` | **NEW** (from migration) | All API routes |
| `utils/crud.js` | **NEW** (from migration) | CRUD helpers |

## Appendix B — Base44 SDK ↔ apiClient Mapping

| Base44 SDK call | apiClient equivalent | Notes |
|---|---|---|
| `base44.entities.X.list()` | same | server handles sort |
| `base44.entities.X.filter({k:v})` | same | passed as query string |
| `base44.entities.X.filter({slug})` | same | BlogPost: returns `[post]` array |
| `base44.entities.X.get(id)` | same | |
| `base44.entities.X.create(data)` | same | |
| `base44.entities.X.update(id, data)` | same | |
| `base44.entities.X.delete(id)` | same | |
| `base44.auth.me()` | same | hits `GET /api/auth/me` |
| `base44.auth.login(e, p)` | same | stores JWT |
| `base44.auth.logout(url)` | same | clears JWT, redirects |
| `base44.auth.isAuthenticated()` | same | |
| `base44.auth.updateMe(data)` | same | hits `PUT /api/auth/me` |
| `base44.auth.redirectToLogin(url)` | same | redirects to `/admin/login` |
| `base44.integrations.Core.UploadFile({file})` | same | hits `POST /api/upload` |
| `base44.integrations.Core.InvokeLLM(...)` | throws Error | not available self-hosted |
| `base44.analytics.track(...)` | no-op (logs in dev) | |
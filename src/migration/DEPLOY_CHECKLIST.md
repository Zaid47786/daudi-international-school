# Deployment Checklist

Work through this list top-to-bottom before going live.
Tick each item only when verified, not when assumed.

---

## Phase 1 — Local Preparation

- [ ] `node --version` returns 18.x or 20.x
- [ ] All migration files copied to correct locations (see FINAL_PROJECT_STRUCTURE.md)
- [ ] All import replacements applied (see SEARCH_AND_REPLACE.md)
- [ ] `src/pages/AdminLogin.jsx` exists and route `/admin/login` added to `App.jsx`
- [ ] `src/pages/Admin.jsx` patched — hardcoded password removed, JWT auth added
- [ ] `src/api/apiClient.js` in place (copied from `migration/src_api/apiClient.js`)
- [ ] `src/api/AuthContext.jsx` in place (copied from `migration/src_api/AuthContext.jsx`)
- [ ] `vite.config.js` replaced with `migration/vite.config.patch.js`
- [ ] `.env` created with all values filled in
- [ ] `JWT_SECRET` is a long random string (not the default)
- [ ] `ADMIN_EMAIL` and `ADMIN_PASSWORD` set to your desired credentials
- [ ] `npm install` succeeds (no errors)
- [ ] Frontend builds successfully (`cd frontend && npm run build`)
- [ ] `node database/init.js` runs without error
- [ ] `node database/seed.js` runs and reports "Admin created" or "Admin already exists"
- [ ] `node server.js` starts and logs `DIS server running on port 3000`
- [ ] Homepage loads at http://localhost:3000
- [ ] `/api/health` returns `{"status":"ok",...}`
- [ ] `/api/settings` returns array of school settings (not empty)
- [ ] Admin login works at http://localhost:3000/admin/login
- [ ] Admin panel loads all tabs without errors
- [ ] Image upload works in Admin → Gallery
- [ ] Admission inquiry form submits and appears in Admin → Inquiries
- [ ] Blog post can be created, published, and viewed publicly
- [ ] All SPA routes (About, Events, Gallery, etc.) load correctly

---

## Phase 2 — Server Upload

- [ ] Files zipped and uploaded to server (SSH or cPanel File Manager)
- [ ] Extracted to correct directory (e.g. `~/dis-app/` or cPanel app root)
- [ ] `dist/` folder (built frontend) included in upload OR rebuilt on server
- [ ] `node_modules/` is NOT uploaded — will be installed on server
- [ ] `.env` uploaded (with production values — NOT the same as local)
- [ ] `uploads/` directory exists and has write permission (chmod 755 or 775)
- [ ] `logs/` directory exists and has write permission
- [ ] `database/` directory exists and has write permission

---

## Phase 3 — Server Setup

- [ ] cPanel → Setup Node.js App → Node.js version set to 18.x or 20.x
- [ ] Application startup file set to `server.js`
- [ ] Application mode set to `Production`
- [ ] All environment variables set in cPanel panel:
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=3000` (or cPanel-assigned port)
  - [ ] `JWT_SECRET=<long random string>`
  - [ ] `JWT_EXPIRES_IN=7d`
  - [ ] `DB_PATH=./database/dis.db`
  - [ ] `UPLOAD_DIR=./uploads`
  - [ ] `MAX_FILE_SIZE_MB=10`
  - [ ] `FRONTEND_URL=https://daudischool.in`
- [ ] cPanel → Run NPM Install (or SSH: `npm install --omit=dev`)
- [ ] `node database/init.js` run on server
- [ ] `node database/seed.js` run on server
- [ ] App started in cPanel (or `pm2 start ecosystem.config.js --env production`)

---

## Phase 4 — DNS and Reverse Proxy

- [ ] Domain DNS pointing to Asura Hosting server
- [ ] `.htaccess` in domain document root with proxy rules (see ASURA_DEPLOYMENT.md Step 5)
- [ ] LiteSpeed / Apache mod_proxy is enabled (contact Asura support if unsure)
- [ ] SSL certificate issued (cPanel → SSL/TLS → Let's Encrypt)

---

## Phase 5 — Live Verification

- [ ] https://daudischool.in loads homepage
- [ ] https://daudischool.in/api/health returns `{"status":"ok",...}`
- [ ] https://daudischool.in/admin/login shows login form
- [ ] Login with production admin credentials succeeds
- [ ] Admin panel is fully functional (all 6 tabs)
- [ ] Image upload works in production
- [ ] Admission inquiry submitted from /admissions appears in Admin
- [ ] Blog post published and visible at /blog/[slug]
- [ ] All public pages load without errors
- [ ] No `media.base44.com` URLs visible (replaced with /dis.png and /uploads/...)
- [ ] `logs/access.log` is being written
- [ ] HTTPS redirect works (HTTP → HTTPS)
- [ ] Mobile layout correct on phone browser

---

## Phase 6 — Security Hardening

- [ ] `ADMIN_PASSWORD` is strong (not `changeme123`)
- [ ] `JWT_SECRET` is at least 32 random characters
- [ ] `.env` file is NOT accessible from the web (verify: `curl https://daudischool.in/.env` should return 404 or 403)
- [ ] `database/dis.db` is NOT accessible from the web
- [ ] `logs/` is NOT accessible from the web
- [ ] Only `dist/` and `uploads/images/` need to be web-accessible
- [ ] Consider enabling rate limiting (add `express-rate-limit` to server.js)

---

## Ongoing Maintenance

- Daily: Check `logs/access.log` for errors
- Weekly: Backup `database/dis.db`
- Monthly: Rotate logs (or set up logrotate)
- Before any code update: Back up `database/dis.db` and `uploads/
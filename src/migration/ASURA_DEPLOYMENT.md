# Asura Hosting — Full Deployment Guide
## cPanel / DirectAdmin Node.js + LiteSpeed

---

## Prerequisites

- Node.js 18+ enabled on your Asura account
- SSH access (recommended) or cPanel File Manager
- Domain pointed to your hosting account

---

## Step 1 — Prepare the project locally

```bash
# After exporting ZIP from Base44:
unzip your-app.zip -d dis-app
cd dis-app

# Copy migration files into project root
cp -r migration/* .

# Apply search & replace (see SEARCH_AND_REPLACE.md)
# Then copy API client:
cp migration/src_api/apiClient.js src/api/apiClient.js
cp migration/src_api/AuthContext.jsx src/api/AuthContext.jsx
cp migration/src_api/AdminLoginPage.jsx src/pages/AdminLogin.jsx

# Replace vite.config.js
cp migration/vite.config.patch.js vite.config.js

# Create .env files
cp migration/.env.example .env
cp migration/frontend.env frontend/.env   # or root .env if frontend is same dir

# Edit .env — set JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD, FRONTEND_URL

# Build frontend
npm install          # in frontend / root depending on structure
npm run build

# Install backend dependencies
npm install          # in server root (where package.json with express is)

# Init database
node database/init.js
node database/seed.js

# Test locally
node server.js
# Visit http://localhost:3000
```

---

## Step 2 — Upload to Asura Hosting

### Option A: via SSH (recommended)

```bash
# From your local machine
scp -r ./dis-app username@yourserver.com:~/dis-app

# SSH in
ssh username@yourserver.com
cd ~/dis-app
npm install --production
node database/init.js
node database/seed.js
```

### Option B: via cPanel File Manager

1. ZIP your local project after build
2. Upload via cPanel → File Manager → your domain root or `nodejs_apps/` folder
3. Extract

---

## Step 3 — cPanel Node.js App Setup

1. In cPanel → **Setup Node.js App**
2. Click **Create Application**
3. Fill in:
   - **Node.js version:** 18.x or 20.x
   - **Application mode:** Production
   - **Application root:** `dis-app/` (relative to home dir)
   - **Application URL:** your domain (e.g. `daudischool.in`)
   - **Application startup file:** `server.js`
4. Click **Create**
5. In the app panel, click **Run NPM Install**
6. Set environment variables (click **Edit** next to your app):
   ```
   NODE_ENV=production
   PORT=3000
   JWT_SECRET=your_long_random_secret
   ADMIN_EMAIL=admin@daudischool.in
   ADMIN_PASSWORD=your_strong_password
   FRONTEND_URL=https://daudischool.in
   DB_PATH=./database/dis.db
   UPLOAD_DIR=./uploads
   ```
7. Click **Start App**

---

## Step 4 — DirectAdmin Node.js Setup (alternative)

1. DirectAdmin → **Extra Features** → **Node.js**
2. Create new app:
   - Startup file: `server.js`
   - App directory: path to dis-app
   - Node version: 18
3. Set the same env variables as above
4. Start app

---

## Step 5 — LiteSpeed / Apache Reverse Proxy (.htaccess)

Place this `.htaccess` in your **domain's public_html** or document root:

```apache
RewriteEngine On

# Serve static dist files directly (fast)
RewriteCond %{REQUEST_URI} ^/assets/ [OR]
RewriteCond %{REQUEST_URI} ^/uploads/
RewriteRule ^ - [L]

# Proxy everything else to Node.js
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]

# Enable proxy headers
ProxyPassReverse / http://127.0.0.1:3000/
```

For **LiteSpeed** (use `.htaccess` as above — LiteSpeed reads it natively).

---

## Step 6 — PM2 (optional, if SSH root access)

```bash
npm install -g pm2
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup   # generates the systemd command — run it as shown
```

---

## Step 7 — SSL / HTTPS

In cPanel → **SSL/TLS** → **Let's Encrypt** → issue for your domain.
LiteSpeed handles HTTPS termination — your Node.js app stays on HTTP internally.

---

## Step 8 — Post-deployment checklist

```
[ ] Visit https://daudischool.in — homepage loads
[ ] Visit https://daudischool.in/admin/login — login page loads
[ ] Login with ADMIN_EMAIL / ADMIN_PASSWORD
[ ] Admin panel works (Events, Blog, Gallery, Settings, Inquiries)
[ ] Submit test admission inquiry from /admissions page
[ ] Upload test image in Admin → Gallery
[ ] Check /api/health returns {"status":"ok"}
[ ] Check logs/access.log is being written
[ ] Confirm Base44 URLs (media.base44.com) are replaced with local /uploads/
```

---

## RAM optimisation (low-resource shared hosting)

The server is already configured for minimal RAM:
- **better-sqlite3** — synchronous, no separate DB process
- **instances: 1** in PM2 ecosystem
- **max_memory_restart: 256M** — PM2 auto-restarts if it exceeds 256 MB
- **compression** middleware — reduces bandwidth
- SQLite WAL mode + 8 MB cache pragma

Expected RAM usage: **50–120 MB** at idle on Node.js 18.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Blank page | Check `dist/` folder exists; run `npm run build` first |
| 502 Bad Gateway | Node app not running; check cPanel Node.js panel |
| Login fails | Rerun `node database/seed.js`; check ADMIN_PASSWORD in .env |
| Images 404 | Ensure `uploads/` dir is writable; check UPLOAD_DIR in .env |
| API returns HTML | .htaccess proxy not active; check mod_proxy is enabled |
| DB locked error | Only one Node.js instance should run (instances:1 in PM2) |
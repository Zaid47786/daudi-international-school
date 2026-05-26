# Run Commands Reference

All commands assume you are in the **project root** (`dis-app/`) unless stated otherwise.

---

## Initial Setup (run once)

```bash
# 1. Install server dependencies
npm install

# 2. Create .env from template and fill in values
cp .env.example .env
nano .env        # or use any text editor

# 3. Initialise the SQLite database (creates all tables)
node database/init.js

# 4. Seed the database (creates admin user + default settings)
node database/seed.js

# 5. Build the React frontend
cd frontend
npm install
npm run build    # outputs to ../dist/
cd ..
```

---

## Running the Server

```bash
# Development mode (auto-restarts on file changes, verbose SQLite logging)
NODE_ENV=development node --watch server.js

# Production mode (direct Node.js)
node server.js

# Production mode with PM2 (persistent, auto-restart)
pm2 start ecosystem.config.js --env production
pm2 save         # persist across reboots
pm2 startup      # generate systemd unit command — run the output
```

---

## Rebuild Frontend After Code Changes

```bash
cd frontend
npm run build    # rebuilds ../dist/
cd ..
# No server restart needed — Express serves the new dist/ files immediately
```

---

## Database Operations

```bash
# Re-initialise schema only (safe — uses CREATE TABLE IF NOT EXISTS)
node database/init.js

# Re-seed default settings and admin (safe — uses INSERT OR IGNORE)
node database/seed.js

# Reset admin password (edit .env ADMIN_PASSWORD first, then):
node database/seed.js

# Open the database in SQLite CLI (read-only inspection)
sqlite3 database/dis.db ".tables"
sqlite3 database/dis.db "SELECT id, email, role FROM users;"

# Backup the database
cp database/dis.db database/dis.backup.$(date +%Y%m%d).db
```

---

## PM2 Commands

```bash
pm2 list                        # show running processes
pm2 logs dis-server             # tail live logs
pm2 restart dis-server          # restart app
pm2 stop dis-server             # stop app
pm2 delete dis-server           # remove from PM2
pm2 monit                       # live resource monitor
```

---

## Health Check

```bash
curl http://localhost:3000/api/health
# Expected: {"status":"ok","ts":1234567890}
```

---

## Environment Variables Quick Reference

| Variable | Required | Default | Description |
|---|---|---|---|
| `NODE_ENV` | yes | `production` | `production` or `development` |
| `PORT` | no | `3000` | Express listen port |
| `JWT_SECRET` | **yes** | INSECURE | Long random string (32+ chars) |
| `JWT_EXPIRES_IN` | no | `7d` | Token expiry |
| `DB_PATH` | no | `./database/dis.db` | SQLite file path |
| `UPLOAD_DIR` | no | `./uploads` | Image upload directory |
| `MAX_FILE_SIZE_MB` | no | `10` | Max upload size |
| `ADMIN_EMAIL` | no | `admin@daudischool.in` | Seed admin email |
| `ADMIN_PASSWORD` | no | `changeme123` | Seed admin password |
| `FRONTEND_URL` | no | `*` | CORS allowed origin |
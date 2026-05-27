# DIS Server — Daudi International School

This is the **Express backend** for daudischool.in, designed to run on Asura Hosting (DirectAdmin).

---

## Project Structure

```
server/               ← YOU ARE HERE (upload this whole folder to Asura)
├── server.js         ← Entry point — Express app
├── package.json      ← Server dependencies
├── ecosystem.config.js ← PM2 config for DirectAdmin
├── .env.example      ← Copy to .env and fill in values
├── database/
│   ├── schema.sql             ← Table definitions
│   ├── db.js                  ← SQLite connection
│   ├── init.js                ← Run once: creates tables
│   ├── seed.js                ← Run once: creates admin user + default settings
│   └── migrate-from-base44.sql ← Run once: imports your live Base44 data
├── routes/
│   ├── auth.js          → POST /api/auth/login
│   ├── blog.js          → /api/blog
│   ├── events.js        → /api/events
│   ├── gallery.js       → /api/gallery
│   ├── stats.js         → /api/stats
│   ├── settings.js      → /api/settings
│   ├── testimonials.js  → /api/testimonials
│   ├── inquiries.js     → /api/inquiries
│   └── upload.js        → /api/upload
├── middleware/
│   ├── auth.js          ← JWT verify middleware
│   └── upload.js        ← Multer image upload middleware
├── uploads/             ← Uploaded images stored here
├── logs/                ← Access + error logs
└── dist/                ← Built React frontend (auto-generated, do not edit)
```

---

## First-Time Setup on Asura

```bash
# 1. Upload this entire server/ folder to your Asura app directory
# 2. Install dependencies
npm install

# 3. Copy and fill in environment variables
cp .env.example .env
nano .env   # set JWT_SECRET, ADMIN_PASSWORD, etc.

# 4. Initialize the database
npm run db:init     # creates tables

# 5. Seed default admin + school settings
npm run db:seed

# 6. Import your live data from Base44
npm run db:import   # imports blog, events, gallery, stats, settings, testimonials

# 7. Build the React frontend (from the frontend/ folder)
cd ../frontend && npm install && npm run build
# This puts the built files into server/dist/ automatically

# 8. Start the server
npm start
# Or with PM2:
pm2 start ecosystem.config.js
```

---

## Frontend (React)

The React source code is in the `frontend/` folder (sibling to `server/`).
After running `npm run build` in `frontend/`, the output goes into `server/dist/`.
The Express server then serves it automatically.

---

## GitHub Auto-Deploy

When you push to GitHub, the `/webhook` endpoint:
1. Verifies the GitHub signature
2. Runs `git pull`
3. Rebuilds the frontend
4. The server continues running (no restart needed for frontend changes)

Set `WEBHOOK_SECRET` in both your `.env` and GitHub repo → Settings → Webhooks.
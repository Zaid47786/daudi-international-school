# DirectAdmin Deployment Guide — No Terminal Required

## What You Need to Upload

Upload the entire `migration/` folder contents to your app root on DirectAdmin.
Your final file structure should look like this:

```
/home/daudisch/domains/daudischool.in/app/
├── server.js
├── package.json
├── .env
├── database/
│   ├── db.js
│   ├── setup.js        ← auto-creates dis.db on first boot
│   └── schema.sql
├── routes/
│   ├── auth.js
│   ├── stats.js
│   ├── events.js
│   ├── gallery.js
│   ├── blog.js
│   ├── testimonials.js
│   ├── settings.js
│   ├── inquiries.js
│   └── upload.js
├── middleware/
│   ├── auth.js
│   └── upload.js
├── dist/               ← upload your built React app here
│   ├── index.html
│   └── assets/
└── uploads/            ← created automatically
    └── images/
```

---

## Step 1 — Create .env file

Create a `.env` file in your app root with these values:

```
PORT=3000
NODE_ENV=production
JWT_SECRET=dis2025supersecretkey
ADMIN_EMAIL=admin@daudischool.in
ADMIN_PASSWORD=Me2DIS
WEBHOOK_SECRET=dis2025secret
BRANCH=main
APP_DIR=/home/daudisch/domains/daudischool.in/app
```

---

## Step 2 — Build the React frontend locally

On your own computer (where you have Node.js installed):

```bash
# In the Base44 project root (where vite.config.js is)
npm install
npm run build
```

This creates a `dist/` folder. Upload the entire `dist/` folder to your app root on DirectAdmin via File Manager.

---

## Step 3 — DirectAdmin Node.js App Setup

1. Go to **DirectAdmin → Node.js App Manager**
2. Click **Create Application**
3. Set:
   - **App Root:** `/home/daudisch/domains/daudischool.in/app`
   - **App URL:** `daudischool.in`
   - **Startup File:** `server.js`
   - **Node.js version:** 18 or 20
4. Click **Create**

---

## Step 4 — Install dependencies

In the Node.js App Manager, click **Run NPM Install** (or use the terminal if available):

```bash
npm install --production
```

---

## Step 5 — Start the app

Click **Start** in the Node.js App Manager.

**That's it!** On first start, the server automatically:
- Creates `database/dis.db`
- Creates all tables
- Seeds all your school data (events, blog posts, stats, testimonials, settings)
- Creates the admin user

You'll see in the app logs:
```
[setup] First run detected — creating database and seeding data...
[setup] Database created and seeded successfully ✓
[setup] Admin login: admin@daudischool.in / Me2DIS
DIS server running on port 3000
```

---

## Step 6 — Verify it works

Visit: `https://daudischool.in` — your site should load fully.

Admin panel: `https://daudischool.in/admin` (password: `Me2DIS`)

API health check: `https://daudischool.in/api/health`

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Blank page | Make sure `dist/index.html` exists in app root |
| API 500 errors | Check app logs in DirectAdmin — likely missing `.env` |
| DB not created | Check that `database/setup.js` is present |
| Login fails | Check `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env` |
| Port conflicts | Change `PORT` in `.env` to 3001, 3002, etc. |

---

## Updating the site later

When you make changes in Base44 and push to GitHub:
1. GitHub webhook hits `https://daudischool.in/webhook`
2. Server pulls latest code and rebuilds automatically
3. No manual steps needed

Or manually via DirectAdmin File Manager:
1. Build `dist/` locally
2. Upload new `dist/` folder via File Manager
3. Restart app in Node.js App Manager
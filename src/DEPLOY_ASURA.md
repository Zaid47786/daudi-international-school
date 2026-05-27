# DIS — Deploy Everything on Asura Hosting

Both the **React frontend** and **Node.js backend** are hosted on Asura Hosting.
Express serves the built React app as static files — no Vercel, no separate frontend host needed.

---

## Project Structure on Asura Server

```
dis-app/               ← your root folder on Asura
├── server.js          ← Express server (from migration/server.js)
├── package.json       ← backend package.json (from migration/package.json)
├── ecosystem.config.js← PM2 config (from migration/ecosystem.config.js)
├── database/          ← SQLite DB files (from migration/database/)
│   ├── db.js
│   ├── init.js
│   ├── seed.js
│   └── schema.sql
├── middleware/        ← from migration/middleware/
│   ├── auth.js
│   └── upload.js
├── routes/            ← from migration/routes/
│   ├── auth.js
│   ├── stats.js
│   ├── events.js
│   ├── gallery.js
│   ├── blog.js
│   ├── testimonials.js
│   ├── settings.js
│   ├── inquiries.js
│   └── upload.js
├── uploads/           ← auto-created, stores uploaded images
│   └── images/
├── logs/              ← auto-created, PM2 + access logs
├── dist/              ← auto-created by `npm run build` — React frontend
└── .env               ← your environment variables
```

---

## Step 1: Upload Backend Files to Asura

Upload everything from the `migration/` folder to the root of your Asura Node.js app directory.
Also upload the `dist/` folder (generated in Step 3).

---

## Step 2: Set Up Environment Variables

Create a `.env` file in your root directory on Asura:

```env
NODE_ENV=production
PORT=3000
JWT_SECRET=your_super_secret_key_here_make_it_long_and_random
FRONTEND_URL=https://yourdomain.com
```

---

## Step 3: Build the React Frontend

On your **local machine** (or in Base44), run:

```bash
npm run build
```

This generates a `dist/` folder. Upload this `dist/` folder to your Asura server root.

---

## Step 4: Install Backend Dependencies on Asura

Via SSH or Asura's terminal:

```bash
cd /path/to/dis-app
npm install
```

---

## Step 5: Initialize the Database

```bash
node database/init.js    # creates dis.db and all tables
node database/seed.js    # adds admin user + default school settings
```

After seeding, your admin login will be:
- **Email:** set in database/seed.js (default: `admin@daudischool.in`)
- **Password:** set in database/seed.js (default: `Admin@DIS2024`)

---

## Step 6: Start the Server with PM2

```bash
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup   # auto-start on server reboot
```

---

## Step 7: Configure Apache/LiteSpeed on Asura

In your Asura cPanel, add this `.htaccess` in your domain's public_html folder
to proxy traffic to Node.js:

```apache
RewriteEngine On
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

Or use Asura's Node.js App Manager to point port 3000 to your domain.

---

## How It Works

```
User visits daudischool.in
        ↓
Apache/LiteSpeed → proxies to Node.js (port 3000)
        ↓
Express server.js:
  - /api/*        → API routes (database, auth, uploads)
  - /uploads/*    → static uploaded images
  - /*            → serves dist/index.html (React SPA)
```

---

## Admin Login

Visit: `https://yourdomain.com/admin/login`

---

## Updating the Site

1. Make changes in Base44
2. Export/sync to GitHub
3. Pull on your local machine, run `npm run build`
4. Upload the new `dist/` folder to Asura
5. No server restart needed (static files only)
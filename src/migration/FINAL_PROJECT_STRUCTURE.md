# Final Project Structure

After migration, the self-hosted project looks exactly like this.
Every file listed here must exist before you run the server.

```
dis-app/                          ← project root
│
├── server.js                     ← Express entry point
├── package.json                  ← server dependencies (from migration/package.json)
├── .env                          ← environment variables (copy from .env.example, NEVER commit)
├── .env.example                  ← template (safe to commit)
├── ecosystem.config.js           ← PM2 config (optional, for SSH deployments)
│
├── database/
│   ├── db.js                     ← better-sqlite3 singleton
│   ├── schema.sql                ← full DDL (applied automatically on first run)
│   ├── init.js                   ← run once: node database/init.js
│   ├── seed.js                   ← run once: node database/seed.js
│   └── dis.db                    ← created automatically (gitignore this)
│
├── middleware/
│   ├── auth.js                   ← JWT sign / requireAuth / requireAdmin
│   └── upload.js                 ← multer image upload
│
├── routes/
│   ├── auth.js                   ← POST /login, GET /me, PUT /me, POST /logout, POST /change-password
│   ├── stats.js                  ← GET/POST/PUT/DELETE /stats
│   ├── events.js                 ← GET/POST/PUT/DELETE /events  (+?status= filter)
│   ├── gallery.js                ← GET/POST/PUT/DELETE /gallery (+?category= filter)
│   ├── blog.js                   ← GET/POST/PUT/DELETE /blog    (+?slug= +?category= +?featured=)
│   ├── testimonials.js           ← GET/POST/PUT/DELETE /testimonials (+?featured=)
│   ├── settings.js               ← GET/POST/PUT /settings
│   ├── inquiries.js              ← POST /inquiries (public), GET/PUT/DELETE (admin)
│   └── upload.js                 ← POST/DELETE /upload
│
├── utils/
│   └── crud.js                   ← listRows / getRow / createRow / updateRow / deleteRow
│
├── uploads/
│   └── images/                   ← uploaded files land here (created automatically)
│
├── logs/
│   ├── access.log                ← Morgan HTTP access log (created automatically)
│   ├── pm2-err.log               ← PM2 stderr log
│   └── pm2-out.log               ← PM2 stdout log
│
├── dist/                         ← built React app (created by "npm run build" in frontend/)
│   ├── index.html
│   └── assets/
│
└── frontend/                     ← Base44 export (your React source)
    ├── vite.config.js            ← REPLACED with migration/vite.config.patch.js
    ├── package.json              ← React dependencies (Base44 original)
    ├── .env                      ← VITE_API_URL=/api  (copy from migration/frontend.env)
    └── src/
        ├── api/
        │   ├── apiClient.js      ← REPLACED with migration/src_api/apiClient.js
        │   ├── AuthContext.jsx   ← REPLACED with migration/src_api/AuthContext.jsx
        │   └── base44Client.js   ← DELETE this file
        ├── pages/
        │   ├── AdminLogin.jsx    ← NEW — copied from migration/src_api/AdminLoginPage.jsx
        │   ├── Admin.jsx         ← PATCHED — password auth removed, JWT auth added
        │   └── ...               ← all other pages unchanged
        ├── lib/
        │   ├── AuthContext.jsx   ← KEEP but override import paths (see SEARCH_AND_REPLACE.md)
        │   └── ...
        └── ...
```

## Files that must NOT be committed to git

```
.env
database/dis.db
uploads/images/*
logs/*.log
node_modules/
dist/
frontend/node_modules/
frontend/dist/
```

Add these to `.gitignore`:

```gitignore
.env
database/*.db
uploads/images/
logs/
node_modules/
dist/
frontend/node_modules/
frontend/dist/
``
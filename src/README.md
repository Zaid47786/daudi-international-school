# Daudi International School application

The repository contains a **fully independent React frontend and school-owned API client**. The production website runs on Vercel, while the optional Express/SQLite server under `src/server` is retained for self-hosted deployments.

## Project structure

```text
src/
├── api/
│   └── schoolApi.js        Independent same-origin API client
├── components/             Shared website and admin components
├── pages/                  Public, admin, and portal pages
├── lib/                    Authentication and frontend utilities
├── database/               Optional SQLite schema and initial content
├── server/                 Optional Express/SQLite deployment
├── App.jsx                 React route registration
└── main.jsx                Frontend entry point

api/index.js                Vercel serverless API adapter
netlify/functions/api.mjs   Shared API implementation
public/dis-logo.png         Locally hosted school logo
vite.config.js              Standard Vite and React configuration
vercel.json                 API and SPA routing
```

## Frontend

Install and run the app from the repository root:

```bash
npm install
npm run dev
```

The frontend calls the same-origin `/api` endpoint by default. To use a separately hosted backend, set `VITE_API_URL` directly in a local `.env` file.

```dotenv
VITE_API_URL=https://api.example.com/api
```

The API client is implemented in `src/api/schoolApi.js`. It owns authentication, website resources, portal operations, and image uploads without an external application SDK or build plugin.

## Production deployment

The production configuration uses:

- Vercel for the React application and serverless API
- A private Vercel Blob store for persistent JSON records and uploaded media
- `ADMIN_PASSWORD` for administrator access
- `JWT_SECRET` for signed sessions

See the repository root `README.md` for complete deployment and verification instructions.

## Optional Express/SQLite deployment

The server under `src/server` can be run independently:

```bash
cd src/server
npm install
npm run db:init
npm run db:seed
npm run db:import
npm start
```

`npm run db:import` loads the bundled `database/initial-content.sql` snapshot. Configure `JWT_SECRET`, `ADMIN_PASSWORD`, and any deployment-specific variables directly in `src/server/.env` before starting the server. Never commit `.env` files.

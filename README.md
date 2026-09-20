# Daudi International School website

This repository contains the React/Vite website and its API integration for Daudi International School, Muzaffarpur.

## Run the frontend locally

```bash
npm install
npm run dev
```

The frontend uses `/api` by default. For local development with the existing Express/SQLite backend, start the backend separately from `src/server`:

```bash
cd src/server
npm install
npm run db:init
npm run db:seed
npm start
```

If the backend is hosted at another URL, set `VITE_API_URL` in a local `.env` file, for example:

```dotenv
VITE_API_URL=https://api.example.com/api
```

Do not commit `.env` or any credentials.

## Netlify deployment

The project is configured for Netlify in `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`
- `/api/*` is rewritten to the serverless API function
- All other routes fall back to `index.html` for React Router

Before the first Netlify deploy, add these environment variables in **Netlify → Project configuration → Environment variables** for the production scope:

| Variable | Required | Purpose |
| --- | --- | --- |
| `ADMIN_EMAIL` | Yes | Email used to access `/admin` |
| `ADMIN_PASSWORD` | Yes | Password used to access `/admin` |
| `JWT_SECRET` | Yes | Long random secret used to sign admin sessions |
| `ADMIN_NAME` | No | Name shown for the administrator; defaults to `DIS Administrator` |

Use a long, unique value for `JWT_SECRET`. Never put these values in committed source code.

No `VITE_API_URL` variable is needed on Netlify. The frontend intentionally calls the same-origin `/api` path, and `netlify.toml` routes it to `netlify/functions/api.mjs`.

## Admin access and applicant records

Open `/admin` after deployment and sign in with the configured `ADMIN_EMAIL` and `ADMIN_PASSWORD`. The admin page now verifies the signed API session instead of treating the presence of a browser `localStorage` value as authentication.

The Admissions form sends these fields to the API:

- Parent name
- Child name
- Grade applying for
- Contact number
- Email address
- Questions or notes

On Netlify, each submission is stored in a persistent, site-wide Netlify Blobs store. In the admin panel, open **Inquiries** to see all submissions, newest first. The panel shows contact details, submission time, message, and status. Statuses can be changed to **New**, **Contacted**, **Enrolled**, or **Rejected**, and records can be deleted.

The Netlify function also exposes the existing content API paths for settings, stats, events, gallery, testimonials, blog posts, and inquiries, so the public pages and admin content screens continue using the same frontend client.

## Verify before deploying

```bash
npm run lint
npm run build
```

After the first deploy, test this sequence:

1. Open `/admissions` and submit a test inquiry.
2. Open `/admin` and sign in with the Netlify environment-variable credentials.
3. Open **Inquiries** and confirm the test record appears.
4. Change its status and refresh the page to confirm persistence.
5. Delete the test record if it was only a test.

The older Express/SQLite backend remains available for non-Netlify hosting. The Netlify function is the backend used when the site is served by Netlify.

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

## Vercel deployment

The live website is deployed on Vercel. The repository is configured with:

- Build command: `npm run build`
- Static output directory: `dist`
- Serverless API entry point: `api/[...path].mjs`
- React Router fallback: `vercel.json`
- API routes under `/api/*`

No `VITE_API_URL` variable is needed in the Vercel project. The frontend intentionally calls the same-origin `/api` path, and Vercel routes those requests to the catch-all function.

### Required Vercel environment variables

Add these variables in **Vercel → Project Settings → Environment Variables** for the Production environment:

| Variable | Required | Purpose |
| --- | --- | --- |
| `ADMIN_PASSWORD` | Yes | Password used to access `/admin` |
| `JWT_SECRET` | Yes | Long random secret used to sign admin sessions |
| `ADMIN_NAME` | No | Name shown for the administrator; defaults to `DIS Administrator` |

Set `ADMIN_PASSWORD` to the password you want to use. The password is intentionally not committed to this repository or bundled into the frontend.

### Required Vercel Blob storage

Applicant records and editable school content need persistent storage. Vercel Functions are stateless, so do not use the local SQLite database for the live Vercel deployment.

In the Vercel dashboard:

1. Open the project **Storage** tab.
2. Select **Create Database → Blob**.
3. Create a **private** Blob store.
4. Connect the store to this project for the Production environment.
5. Confirm that Vercel provides either `BLOB_STORE_ID` with OIDC credentials or `BLOB_READ_WRITE_TOKEN` in the project environment variables.
6. Redeploy after connecting the store.

The API stores each record as a private JSON Blob. The browser never receives the Blob credentials.

## Admin access and applicant records

Open `/admin` after deployment and sign in with only the configured `ADMIN_PASSWORD`. The admin page verifies a signed API session instead of treating the presence of a browser `localStorage` value as authentication.

The Admissions form sends these fields to the API:

- Parent name
- Child name
- Grade applying for
- Contact number
- Email address
- Questions or notes

Each submission is stored persistently in the connected Vercel Blob store. In the admin panel, open **Inquiries** to see all submissions, newest first. The panel shows contact details, submission time, message, and status. Statuses can be changed to **New**, **Contacted**, **Enrolled**, or **Rejected**, and records can be deleted.

The same Vercel API also serves the existing content paths for settings, stats, events, gallery, testimonials, and blog posts, so the public pages and admin content screens continue using the same frontend client.

## Verify before deploying

```bash
npm run lint
npm run build
```

After the first Vercel deployment with Blob storage connected, test this sequence:

1. Open `/admissions` and submit a test inquiry.
2. Open `/admin` and sign in with the configured password.
3. Open **Inquiries** and confirm the test record appears.
4. Change its status and refresh the page to confirm persistence.
5. Delete the test record if it was only a test.

The Netlify function and `netlify.toml` remain for compatibility with a future Netlify deployment, but the live project uses the Vercel function and Vercel Blob storage described above.

# DIS optional Express server

This directory contains an independent Express and SQLite backend for deployments that do not use the production Vercel serverless API.

## Structure

```text
src/server/
├── server.js
├── package.json
├── ecosystem.config.js
├── database/
│   ├── schema.sql
│   ├── db.js
│   ├── init.js
│   ├── seed.js
│   └── initial-content.sql
├── routes/
├── middleware/
├── utils/
├── uploads/
└── logs/
```

## Setup

Create `src/server/.env` directly and add the required secrets. Never commit this file.

```dotenv
JWT_SECRET=replace-with-a-long-random-secret
ADMIN_PASSWORD=replace-with-a-secure-admin-password
PORT=3001
```

Then initialize and start the server:

```bash
npm install
npm run db:init
npm run db:seed
npm run db:import
npm start
```

The `db:import` command loads the bundled `database/initial-content.sql` snapshot containing initial website content.

## API areas

The server provides routes for administrator authentication, school settings, statistics, events, gallery photos, blog posts, testimonials, admission inquiries, and media uploads. Protected write operations require a valid signed administrator token.

The live `daudischool.in` deployment currently uses the Vercel API and Vercel Blob implementation documented in the repository root. This server remains an independent self-hosting option.

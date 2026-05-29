/* eslint-disable no-undef */
// Run with: node database/seed.js
import db from "./db.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

// ── Admin user ────────────────────────────────────────────────────────────────
const email = process.env.ADMIN_EMAIL || "admin@daudischool.in";
const password = process.env.ADMIN_PASSWORD || "changeme123";
const name = process.env.ADMIN_NAME || "DIS Administrator";

const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
if (!existing) {
  const hash = bcrypt.hashSync(password, 12);
  db.prepare(`INSERT INTO users (id, full_name, email, password, role) VALUES (?, ?, ?, ?, 'admin')`)
    .run(uuidv4(), name, email, hash);
  console.log(`Admin created: ${email}`);
} else {
  console.log("Admin already exists — skipped.");
}

// ── Default school settings ───────────────────────────────────────────────────
const defaults = [
  { key_name: "school_name",      value: "Daudi International School",       label: "School Name",       group_name: "general" },
  { key_name: "tagline",          value: "Muzaffarpur, Bihar — The Only Non-Profit Organisation", label: "Tagline", group_name: "general" },
  { key_name: "founder_quote",    value: "Education is the most powerful weapon which you can use to change the world. At Daudi International School, we believe every child deserves a chance to rise.", label: "Founder Quote", group_name: "general" },
  { key_name: "hero_badge",       value: "Admissions Open 2026–27",          label: "Hero Badge Text",   group_name: "hero" },
  { key_name: "hero_description", value: "Empowering young minds with quality education, strong values, and a vision for a brighter tomorrow — under the Daudi Welfare Trust.", label: "Hero Description", group_name: "hero" },
  { key_name: "address",          value: "Shafi Manzil, Daudi Market, Motijheel, Muzaffarpur, Bihar 842001", label: "Address", group_name: "contact" },
  { key_name: "phone",            value: "+91 621 224 3314",                  label: "Phone",             group_name: "contact" },
  { key_name: "email",            value: "daudischool.muz@gmail.com",         label: "Email",             group_name: "contact" },
  { key_name: "facebook_url",     value: "https://www.facebook.com/p/Daudi-International-School-Muzaffarpur-100072254675605/", label: "Facebook URL", group_name: "social" },
  { key_name: "youtube_url",      value: "https://www.youtube.com/@altamashdaudi7099", label: "YouTube URL", group_name: "social" },
];

const insertSetting = db.prepare(`INSERT OR IGNORE INTO school_settings (id, key_name, value, label, group_name) VALUES (?, ?, ?, ?, ?)`);
for (const s of defaults) insertSetting.run(uuidv4(), s.key_name, s.value, s.label, s.group_name);
console.log("Default settings seeded.");

db.close();
console.log("Seed complete.");
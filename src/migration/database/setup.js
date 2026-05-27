/* eslint-disable no-undef */
/**
 * DIS — Auto Setup Script
 * ========================
 * Creates the SQLite database, all tables, admin user, and seeds all live data.
 * This runs automatically when the server starts if the DB doesn't exist yet.
 *
 * NO TERMINAL NEEDED — just upload files and start the Node.js app in DirectAdmin.
 */

import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createHash } from "crypto";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = process.env.DB_PATH || path.join(__dirname, "dis.db");

// Simple password hash (sha256 — replace with bcrypt in production if desired)
function hashPassword(plain) {
  return createHash("sha256").update(plain).digest("hex");
}

// Generate a simple unique ID
let _idCounter = 0;
function makeId() {
  return `${Date.now().toString(36)}${(++_idCounter).toString(36)}`;
}

export function setupDatabase() {
  const isNew = !fs.existsSync(DB_PATH);
  if (!isNew) {
    console.log("[setup] Database already exists — skipping seed.");
    return;
  }

  console.log("[setup] First run detected — creating database and seeding data...");

  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  db.pragma("synchronous = NORMAL");
  db.pragma("cache_size = -8000");
  db.pragma("temp_store = MEMORY");

  // ── Create all tables ─────────────────────────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id           TEXT PRIMARY KEY,
      full_name    TEXT NOT NULL,
      email        TEXT NOT NULL UNIQUE,
      password     TEXT NOT NULL,
      role         TEXT NOT NULL DEFAULT 'user' CHECK(role IN ('admin','user')),
      created_date TEXT NOT NULL DEFAULT (datetime('now')),
      updated_date TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS stats (
      id           TEXT PRIMARY KEY,
      label        TEXT NOT NULL,
      value        TEXT NOT NULL,
      icon         TEXT NOT NULL DEFAULT 'Star',
      description  TEXT,
      sort_order   INTEGER NOT NULL DEFAULT 0,
      created_date TEXT NOT NULL DEFAULT (datetime('now')),
      updated_date TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS events (
      id           TEXT PRIMARY KEY,
      title        TEXT NOT NULL,
      date         TEXT NOT NULL,
      time         TEXT,
      location     TEXT,
      description  TEXT,
      category     TEXT NOT NULL,
      status       TEXT NOT NULL DEFAULT 'upcoming',
      featured     INTEGER NOT NULL DEFAULT 0,
      created_date TEXT NOT NULL DEFAULT (datetime('now')),
      updated_date TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS gallery_photos (
      id           TEXT PRIMARY KEY,
      title        TEXT NOT NULL,
      src          TEXT NOT NULL,
      category     TEXT NOT NULL,
      is_real      INTEGER NOT NULL DEFAULT 0,
      description  TEXT,
      sort_order   INTEGER NOT NULL DEFAULT 0,
      created_date TEXT NOT NULL DEFAULT (datetime('now')),
      updated_date TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS blog_posts (
      id               TEXT PRIMARY KEY,
      title            TEXT NOT NULL,
      slug             TEXT NOT NULL UNIQUE,
      excerpt          TEXT,
      content          TEXT,
      cover_image      TEXT,
      category         TEXT NOT NULL,
      author           TEXT NOT NULL DEFAULT 'DIS Team',
      published        INTEGER NOT NULL DEFAULT 0,
      featured         INTEGER NOT NULL DEFAULT 0,
      meta_description TEXT,
      tags             TEXT,
      created_date     TEXT NOT NULL DEFAULT (datetime('now')),
      updated_date     TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id           TEXT PRIMARY KEY,
      parent_name  TEXT NOT NULL,
      child_class  TEXT,
      quote        TEXT NOT NULL,
      rating       INTEGER NOT NULL DEFAULT 5,
      is_featured  INTEGER NOT NULL DEFAULT 1,
      sort_order   INTEGER NOT NULL DEFAULT 0,
      created_date TEXT NOT NULL DEFAULT (datetime('now')),
      updated_date TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS school_settings (
      id           TEXT PRIMARY KEY,
      key_name     TEXT NOT NULL UNIQUE,
      value        TEXT NOT NULL DEFAULT '',
      label        TEXT,
      group_name   TEXT NOT NULL DEFAULT 'general',
      description  TEXT,
      created_date TEXT NOT NULL DEFAULT (datetime('now')),
      updated_date TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS admission_inquiries (
      id           TEXT PRIMARY KEY,
      parent_name  TEXT NOT NULL,
      child_name   TEXT NOT NULL,
      grade        TEXT NOT NULL,
      phone        TEXT NOT NULL,
      email        TEXT,
      message      TEXT,
      status       TEXT NOT NULL DEFAULT 'new',
      notes        TEXT,
      created_date TEXT NOT NULL DEFAULT (datetime('now')),
      updated_date TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_events_status     ON events(status);
    CREATE INDEX IF NOT EXISTS idx_blog_slug         ON blog_posts(slug);
    CREATE INDEX IF NOT EXISTS idx_blog_published    ON blog_posts(published);
    CREATE INDEX IF NOT EXISTS idx_gallery_category  ON gallery_photos(category);
    CREATE INDEX IF NOT EXISTS idx_stats_order       ON stats(sort_order);
    CREATE INDEX IF NOT EXISTS idx_testimonials_feat ON testimonials(is_featured);
    CREATE INDEX IF NOT EXISTS idx_inquiries_status  ON admission_inquiries(status);
    CREATE INDEX IF NOT EXISTS idx_settings_key      ON school_settings(key_name);
  `);

  // ── Admin user ────────────────────────────────────────────────────────────
  const adminPassword = process.env.ADMIN_PASSWORD || "Me2DIS";
  db.prepare(`
    INSERT OR IGNORE INTO users (id, full_name, email, password, role)
    VALUES (?, 'DIS Admin', ?, ?, 'admin')
  `).run(makeId(), process.env.ADMIN_EMAIL || "admin@daudischool.in", hashPassword(adminPassword));

  // ── School Settings ───────────────────────────────────────────────────────
  const settings = [
    { key: "school_name",    value: "Daudi International School",           label: "School Name",      group: "general" },
    { key: "tagline",        value: "Muzaffarpur, Bihar — The Only Non-Profit Organisation", label: "Tagline", group: "general" },
    { key: "founder_quote",  value: "Education is the most powerful weapon which you can use to change the world. At Daudi International School, we believe every child deserves a chance to rise.", label: "Founder Quote", group: "general" },
    { key: "hero_badge",     value: "Admissions Open 2026–27",              label: "Hero Badge Text",  group: "hero" },
    { key: "hero_description", value: "Empowering young minds with quality education, strong values, and a vision for a brighter tomorrow — under the Daudi Welfare Trust.", label: "Hero Description", group: "hero" },
    { key: "address",        value: "Shafi Manzil, Daudi Market, Motijheel, Muzaffarpur, Bihar 842001", label: "Address", group: "contact" },
    { key: "phone",          value: "+91 621 224 3314",                     label: "Phone",            group: "contact" },
    { key: "email",          value: "daudischool.muz@gmail.com",            label: "Email",            group: "contact" },
    { key: "facebook_url",   value: "https://www.facebook.com/p/Daudi-International-School-Muzaffarpur-100072254675605/", label: "Facebook URL", group: "social" },
    { key: "youtube_url",    value: "https://www.youtube.com/@altamashdaudi7099", label: "YouTube URL", group: "social" },
  ];
  const insertSetting = db.prepare(`
    INSERT OR IGNORE INTO school_settings (id, key_name, value, label, group_name)
    VALUES (?, ?, ?, ?, ?)
  `);
  for (const s of settings) insertSetting.run(makeId(), s.key, s.value, s.label, s.group);

  // ── Stats ─────────────────────────────────────────────────────────────────
  const stats = [
    { label: "Years of Excellence", value: "20+",   icon: "BookOpen", sort_order: 0 },
    { label: "Students Enrolled",   value: "1000+", icon: "Users",    sort_order: 1 },
    { label: "Programs Offered",    value: "100+",  icon: "Award",    sort_order: 2 },
    { label: "Non-Profit Mission",  value: "100%",  icon: "Heart",    sort_order: 3 },
  ];
  const insertStat = db.prepare(`
    INSERT OR IGNORE INTO stats (id, label, value, icon, sort_order) VALUES (?, ?, ?, ?, ?)
  `);
  for (const s of stats) insertStat.run(makeId(), s.label, s.value, s.icon, s.sort_order);

  // ── Events ────────────────────────────────────────────────────────────────
  const events = [
    { title: "Republic Day Celebration",  date: "2026-01-26", time: "09:00", location: "School Ground, DIS Muzaffarpur", description: "Our annual Republic Day celebration features a flag hoisting ceremony, student parade, patriotic songs, and cultural performances. All parents are warmly invited to attend.", category: "National Event", status: "past", featured: 1 },
    { title: "Annual Science Exhibition", date: "2026-02-14", time: "10:00–16:00", location: "School Hall, DIS Muzaffarpur", description: "Students from Class V to X showcase innovative science projects and experiments. Judges from local colleges will evaluate entries for prizes.", category: "Academic", status: "past", featured: 0 },
    { title: "Annual Sports Day",         date: "2026-03-10", time: "08:00", location: "School Ground, DIS Muzaffarpur", description: "Inter-house athletic competitions including track events, team sports, and fun activities. Prize distribution ceremony follows.", category: "Sports", status: "past", featured: 0 },
    { title: "Independence Day Celebration", date: "2025-08-15", time: "09:00", location: "School Ground", description: "Flag hoisting, patriotic performances, and prize distribution for academic achievers.", category: "National Event", status: "past", featured: 0 },
    { title: "Children's Day Celebration", date: "2025-11-14", time: "10:00", location: "School Hall", description: "Teachers performed for students as a special treat — skits, songs, and fun games.", category: "School Event", status: "past", featured: 0 },
    { title: "Annual Prize Distribution", date: "2025-12-20", time: "16:00", location: "School Auditorium", description: "Annual ceremony honouring top academic performers, sports champions, and students showing exemplary character.", category: "Academic", status: "past", featured: 0 },
  ];
  const insertEvent = db.prepare(`
    INSERT OR IGNORE INTO events (id, title, date, time, location, description, category, status, featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const e of events) insertEvent.run(makeId(), e.title, e.date, e.time, e.location, e.description, e.category, e.status, e.featured);

  // ── Gallery ───────────────────────────────────────────────────────────────
  db.prepare(`
    INSERT OR IGNORE INTO gallery_photos (id, title, src, category, is_real, sort_order)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(makeId(), "Republic Day Celebration – DIS", "https://i.ytimg.com/vi/qXYJYEKhXTY/maxresdefault.jpg", "Events", 1, 0);

  // ── Blog Posts ────────────────────────────────────────────────────────────
  const blogs = [
    {
      title: "DIS Students Shine at District Science Exhibition 2025",
      slug: "dis-science-exhibition-2025",
      category: "Achievements",
      excerpt: "Our students brought home three top prizes at the annual district-level science exhibition, showcasing projects on renewable energy, water purification, and smart agriculture.",
      content: `## DIS Students Shine at District Science Exhibition 2025\n\nDaudi International School students made Muzaffarpur proud at the Annual District Science Exhibition held at the Municipal Ground last week.\n\nA total of 12 students from Classes VI through X participated, presenting original projects that demonstrated both scientific rigour and creative problem-solving.\n\n### Award-Winning Projects\n\n**First Prize** — Rahul Kumar (Class X): A working model of a low-cost solar water purifier using locally available materials.\n\n**Second Prize** — Zainab Fatima and Priya Singh (Class VIII): A smart drip irrigation system controlled by a soil moisture sensor.\n\n**Third Prize** — Aarav Sharma (Class VII): A wind turbine model built from recycled materials.\n\n### What This Means\n\nThese achievements are a reflection of the hard work of our students and the guidance of our science faculty. At DIS, we believe that education should go beyond textbooks.\n\nWe congratulate all participants and look forward to even more achievements in the coming year.`,
      author: "DIS Team",
      published: 1,
      featured: 1,
      meta_description: "DIS students win three prizes at the district science exhibition 2025 — showcasing projects on solar energy, irrigation, and renewable power.",
      tags: "science, awards, students, exhibition",
    },
    {
      title: "Admissions Open for 2026–27: Everything You Need to Know",
      slug: "admissions-2026-27-guide",
      category: "Admissions",
      excerpt: "A complete guide to applying for admission to Daudi International School for the upcoming academic year — process, dates, eligibility, and more.",
      content: `## Admissions Open for 2026–27\n\nWe are delighted to announce that admissions for the **2026–27 academic year** are now officially open at Daudi International School, Muzaffarpur.\n\n### Who Can Apply?\n\nAdmissions are open for all classes from **Nursery through Class X**.\n\n### How to Apply\n\n1. Fill out the online inquiry form on our [Admissions page](/admissions)\n2. We will contact you within 24 hours to schedule a campus visit\n3. A short, informal assessment will be conducted\n4. Receive your admission offer and complete the enrollment\n\n### Key Dates\n\n- **Applications Open:** Now\n- **Campus Visit Days:** By appointment (Mon–Sat)\n- **Limited Seats:** Apply early\n\n### Contact\n\nCall us at +91 621 224 3314 or email daudischool.muz@gmail.com for any queries.`,
      author: "DIS Admissions Office",
      published: 1,
      featured: 0,
      meta_description: "Admissions open at DIS Muzaffarpur for 2026–27. Learn about the process, eligibility, scholarship programs, and key dates.",
      tags: "admissions, 2026-27, enrollment, nursery, class X",
    },
    {
      title: "Annual Sports Day 2025: A Day of Energy and Team Spirit",
      slug: "annual-sports-day-2025",
      category: "Events",
      excerpt: "Students from all classes competed across track events, relay races, and team sports at DIS's Annual Sports Day.",
      content: `## Annual Sports Day 2025\n\nThe DIS campus was alive with energy, colour, and cheering on the day of our Annual Sports Day.\n\nStudents from Nursery through Class X participated in a wide range of events — from short sprints and relay races to tug-of-war, long jump, and team games.\n\n### Highlights of the Day\n\n- **Junior Track Champion:** Aisha Begum (Class V)\n- **Senior Track Champion:** Vikram Pandey (Class X) broke the school's 400m record\n- **Best Team:** Class VIII Green House\n\n### Message from the Principal\n\n"Sports teach children what no textbook can — how to win with humility, lose with grace, and always show up for your team."\n\n### Looking Ahead\n\nDIS will be nominating top performers for district-level athletics competitions later this year.`,
      author: "DIS Team",
      published: 1,
      featured: 0,
      meta_description: "DIS Annual Sports Day 2025 recap — a day of athletics, team spirit, and celebration at Daudi International School, Muzaffarpur.",
      tags: "sports, annual day, athletics, school events",
    },
  ];
  const insertBlog = db.prepare(`
    INSERT OR IGNORE INTO blog_posts (id, title, slug, category, excerpt, content, author, published, featured, meta_description, tags)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const b of blogs) insertBlog.run(makeId(), b.title, b.slug, b.category, b.excerpt, b.content, b.author, b.published, b.featured, b.meta_description, b.tags);

  // ── Testimonials ──────────────────────────────────────────────────────────
  const testimonials = [
    { parent_name: "Anjali Singh",   child_class: "Class VII", quote: "DIS has transformed my daughter completely. The teachers don't just teach — they genuinely care about each child's future. Enrolling her here was the best decision we ever made as parents.", rating: 5, sort_order: 1 },
    { parent_name: "Mohammed Raza",  child_class: "Class IV",  quote: "The English-medium instruction from day one gave my son a confidence I never expected. His vocabulary, reading, and communication skills have improved dramatically in just one year.", rating: 5, sort_order: 2 },
    { parent_name: "Sunita Devi",    child_class: "Class IX",  quote: "As a middle-income family, we worried quality education was out of reach. DIS proved us completely wrong — excellent faculty, genuinely affordable fees, and real, visible results.", rating: 5, sort_order: 3 },
  ];
  const insertTestimonial = db.prepare(`
    INSERT OR IGNORE INTO testimonials (id, parent_name, child_class, quote, rating, is_featured, sort_order)
    VALUES (?, ?, ?, ?, ?, 1, ?)
  `);
  for (const t of testimonials) insertTestimonial.run(makeId(), t.parent_name, t.child_class, t.quote, t.rating, t.sort_order);

  db.close();
  console.log("[setup] Database created and seeded successfully ✓");
  console.log(`[setup] Admin login: ${process.env.ADMIN_EMAIL || "admin@daudischool.in"} / ${adminPassword}`);
}
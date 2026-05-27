-- ─────────────────────────────────────────────────────────────────────────────
-- DIS Database Schema — mirrors Base44 entity definitions exactly
-- ─────────────────────────────────────────────────────────────────────────────

PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

-- ── Users ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id          TEXT PRIMARY KEY,
  full_name   TEXT NOT NULL,
  email       TEXT NOT NULL UNIQUE,
  password    TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'user' CHECK(role IN ('admin','user')),
  created_date TEXT NOT NULL DEFAULT (datetime('now')),
  updated_date TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ── Stats ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS stats (
  id           TEXT PRIMARY KEY,
  label        TEXT NOT NULL,
  value        TEXT NOT NULL,
  icon         TEXT NOT NULL DEFAULT 'Star'
                CHECK(icon IN ('BookOpen','Users','Award','Heart','Star','Globe','Trophy','GraduationCap')),
  description  TEXT,
  sort_order   INTEGER NOT NULL DEFAULT 0,
  created_date TEXT NOT NULL DEFAULT (datetime('now')),
  updated_date TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ── Events ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
  id           TEXT PRIMARY KEY,
  title        TEXT NOT NULL,
  date         TEXT NOT NULL,
  time         TEXT,
  location     TEXT,
  description  TEXT,
  category     TEXT NOT NULL
                CHECK(category IN ('National Event','Academic','Sports','Cultural','Trust Event','School Event')),
  status       TEXT NOT NULL DEFAULT 'upcoming'
                CHECK(status IN ('upcoming','past')),
  featured     INTEGER NOT NULL DEFAULT 0,
  created_date TEXT NOT NULL DEFAULT (datetime('now')),
  updated_date TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ── Gallery ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gallery_photos (
  id           TEXT PRIMARY KEY,
  title        TEXT NOT NULL,
  src          TEXT NOT NULL,
  category     TEXT NOT NULL
                CHECK(category IN ('Campus','Events','Classrooms','Sports','Cultural')),
  is_real      INTEGER NOT NULL DEFAULT 0,
  description  TEXT,
  sort_order   INTEGER NOT NULL DEFAULT 0,
  created_date TEXT NOT NULL DEFAULT (datetime('now')),
  updated_date TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ── Blog Posts ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
  id               TEXT PRIMARY KEY,
  title            TEXT NOT NULL,
  slug             TEXT NOT NULL UNIQUE,
  excerpt          TEXT,
  content          TEXT,
  cover_image      TEXT,
  category         TEXT NOT NULL
                    CHECK(category IN ('Events','Academics','Achievements','Admissions',
                                       'Science & Tech','School Life','Announcements')),
  author           TEXT NOT NULL DEFAULT 'DIS Team',
  published        INTEGER NOT NULL DEFAULT 0,
  featured         INTEGER NOT NULL DEFAULT 0,
  meta_description TEXT,
  tags             TEXT,
  created_date     TEXT NOT NULL DEFAULT (datetime('now')),
  updated_date     TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ── Testimonials ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id           TEXT PRIMARY KEY,
  parent_name  TEXT NOT NULL,
  child_class  TEXT,
  quote        TEXT NOT NULL,
  rating       INTEGER NOT NULL DEFAULT 5 CHECK(rating BETWEEN 1 AND 5),
  is_featured  INTEGER NOT NULL DEFAULT 1,
  sort_order   INTEGER NOT NULL DEFAULT 0,
  created_date TEXT NOT NULL DEFAULT (datetime('now')),
  updated_date TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ── School Settings ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS school_settings (
  id           TEXT PRIMARY KEY,
  key_name     TEXT NOT NULL UNIQUE,
  value        TEXT NOT NULL DEFAULT '',
  label        TEXT,
  group_name   TEXT NOT NULL DEFAULT 'general'
                CHECK(group_name IN ('general','hero','contact','social')),
  description  TEXT,
  created_date TEXT NOT NULL DEFAULT (datetime('now')),
  updated_date TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ── Admission Inquiries ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admission_inquiries (
  id           TEXT PRIMARY KEY,
  parent_name  TEXT NOT NULL,
  child_name   TEXT NOT NULL,
  grade        TEXT NOT NULL,
  phone        TEXT NOT NULL,
  email        TEXT,
  message      TEXT,
  status       TEXT NOT NULL DEFAULT 'new'
                CHECK(status IN ('new','contacted','enrolled','rejected')),
  notes        TEXT,
  created_date TEXT NOT NULL DEFAULT (datetime('now')),
  updated_date TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ── Indexes ───────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_events_status     ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_date       ON events(date);
CREATE INDEX IF NOT EXISTS idx_blog_slug         ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_published    ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_featured     ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_gallery_category  ON gallery_photos(category);
CREATE INDEX IF NOT EXISTS idx_gallery_order     ON gallery_photos(sort_order);
CREATE INDEX IF NOT EXISTS idx_stats_order       ON stats(sort_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_feat ON testimonials(is_featured);
CREATE INDEX IF NOT EXISTS idx_inquiries_status  ON admission_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_settings_key      ON school_settings(key_name);
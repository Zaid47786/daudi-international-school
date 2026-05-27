-- ============================================================================
-- DIS Live Data — exported from Base44 on 2026-05-27
-- ============================================================================
-- Run AFTER init + seed:
--   sqlite3 dis.db < database/migrate-from-base44.sql
-- ============================================================================

-- ── Blog Posts ──────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO blog_posts (id, title, slug, category, excerpt, content, author, published, featured, meta_description, tags, created_date, updated_date)
VALUES
  ('bp-001', 'DIS Students Shine at District Science Exhibition 2025', 'dis-science-exhibition-2025', 'Achievements',
   'Our students brought home three top prizes at the annual district-level science exhibition, showcasing projects on renewable energy, water purification, and smart agriculture.',
   '## DIS Students Shine at District Science Exhibition 2025

Daudi International School students made Muzaffarpur proud at the Annual District Science Exhibition held at the Municipal Ground last week.

A total of 12 students from Classes VI through X participated, presenting original projects that demonstrated both scientific rigour and creative problem-solving.

### Award-Winning Projects

**First Prize** — Rahul Kumar (Class X): A working model of a low-cost solar water purifier using locally available materials. The project was praised for its practical applicability in rural Bihar.

**Second Prize** — Zainab Fatima and Priya Singh (Class VIII): A smart drip irrigation system controlled by a soil moisture sensor, designed to help small farmers reduce water wastage.

**Third Prize** — Aarav Sharma (Class VII): A wind turbine model built from recycled materials, demonstrating the basics of renewable energy to a general audience.

### What This Means

These achievements are a reflection of the hard work of our students and the guidance of our science faculty. At DIS, we believe that education should go beyond textbooks — real learning happens when students ask questions, experiment, and discover.

We congratulate all participants and look forward to even more achievements in the coming year.',
   'DIS Team', 1, 1, 'DIS students win three prizes at the district science exhibition 2025 — showcasing projects on solar energy, irrigation, and renewable power.',
   'science, awards, students, exhibition', datetime('now'), datetime('now')),

  ('bp-002', 'Admissions Open for 2026–27: Everything You Need to Know', 'admissions-2026-27-guide', 'Admissions',
   'A complete guide to applying for admission to Daudi International School for the upcoming academic year — process, dates, eligibility, and more.',
   '## Admissions Open for 2026–27

We are delighted to announce that admissions for the **2026–27 academic year** are now officially open at Daudi International School, Muzaffarpur.

### Who Can Apply?

Admissions are open for all classes from **Nursery through Class X**. We welcome students of all backgrounds. DIS is a non-profit, English-medium institution — quality education regardless of your financial situation.

### How to Apply

1. Fill out the online inquiry form on our [Admissions page](/admissions)
2. We will contact you within 24 hours to schedule a campus visit
3. A short, informal assessment will be conducted (not competitive — just for placement)
4. Receive your admission offer and complete the enrollment

### Key Dates

- **Applications Open:** Now
- **Campus Visit Days:** By appointment (Mon–Sat)
- **Limited Seats:** Apply early — seats fill quickly

### Scholarship Program

Deserving students from underprivileged backgrounds may apply for our scholarship and fee-waiver program under the Daudi Welfare Trust.

### Contact

Call us at +91 621 224 3314 or email daudischool.muz@gmail.com for any queries.',
   'DIS Admissions Office', 1, 0, 'Admissions open at DIS Muzaffarpur for 2026–27. Learn about the process, eligibility, scholarship programs, and key dates.',
   'admissions, 2026-27, enrollment, nursery, class X', datetime('now'), datetime('now')),

  ('bp-003', 'Annual Sports Day 2025: A Day of Energy and Team Spirit', 'annual-sports-day-2025', 'Events',
   'Students from all classes competed across track events, relay races, and team sports at DIS''s Annual Sports Day — a celebration of fitness, teamwork, and school spirit.',
   '## Annual Sports Day 2025

The DIS campus was alive with energy, colour, and cheering on the day of our Annual Sports Day — an event that every student, parent, and teacher looks forward to each year.

Students from Nursery through Class X participated in a wide range of events — from short sprints and relay races to tug-of-war, long jump, and team games.

### Highlights of the Day

- **Junior Track Champion:** Aisha Begum (Class V) dominated the 100m and 200m events with remarkable speed for her age group.
- **Senior Track Champion:** Vikram Pandey (Class X) broke the school''s 400m record that had stood for six years.
- **Best Team:** Class VIII Green House won the overall relay competition and the highest cumulative points tally.

### Message from the Principal

"Sports teach children what no textbook can — how to win with humility, lose with grace, and always show up for your team. Days like today remind us why a complete education must go beyond the classroom."

### Looking Ahead

DIS will be nominating top performers for district-level athletics competitions later this year. Stay tuned for updates.',
   'DIS Team', 1, 0, 'DIS Annual Sports Day 2025 recap — a day of athletics, team spirit, and celebration at Daudi International School, Muzaffarpur.',
   'sports, annual day, athletics, school events', datetime('now'), datetime('now'));

-- ── Events ──────────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO events (id, title, date, time, location, description, category, status, featured, created_date, updated_date)
VALUES
  ('ev-001', 'Republic Day Celebration',   '2026-01-26', '09:00', 'School Ground, DIS Muzaffarpur', 'Our annual Republic Day celebration features a flag hoisting ceremony, student parade, patriotic songs, and cultural performances. All parents are warmly invited to attend.', 'National Event', 'past', 1, datetime('now'), datetime('now')),
  ('ev-002', 'Annual Science Exhibition',  '2026-02-14', '10:00', 'School Hall, DIS Muzaffarpur',   'Students from Class V to X showcase innovative science projects and experiments. Judges from local colleges will evaluate entries for prizes.', 'Academic', 'past', 0, datetime('now'), datetime('now')),
  ('ev-003', 'Annual Sports Day',          '2026-03-10', '08:00', 'School Ground, DIS Muzaffarpur', 'Inter-house athletic competitions including track events, team sports, and fun activities. Prize distribution ceremony follows.', 'Sports', 'past', 0, datetime('now'), datetime('now')),
  ('ev-004', 'Independence Day Celebration','2025-08-15', '09:00', 'School Ground',                 'Flag hoisting, patriotic performances, and prize distribution for academic achievers.', 'National Event', 'past', 0, datetime('now'), datetime('now')),
  ('ev-005', 'Children''s Day Celebration', '2025-11-14', '10:00', 'School Hall',                   'Teachers performed for students as a special treat — skits, songs, and fun games.', 'School Event', 'past', 0, datetime('now'), datetime('now')),
  ('ev-006', 'Annual Prize Distribution',  '2025-12-20', '16:00', 'School Auditorium',              'Annual ceremony honouring top academic performers, sports champions, and students showing exemplary character.', 'Academic', 'past', 0, datetime('now'), datetime('now'));

-- ── Gallery Photos ───────────────────────────────────────────────────────────
INSERT OR IGNORE INTO gallery_photos (id, title, src, category, is_real, sort_order, created_date, updated_date)
VALUES
  ('gp-001', 'Republic Day Celebration – DIS', 'https://i.ytimg.com/vi/qXYJYEKhXTY/maxresdefault.jpg', 'Events', 1, 0, datetime('now'), datetime('now'));

-- ── Stats ────────────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO stats (id, label, value, icon, sort_order, created_date, updated_date)
VALUES
  ('st-001', 'Years of Excellence', '20+',   'BookOpen', 0, datetime('now'), datetime('now')),
  ('st-002', 'Students Enrolled',   '1000+', 'Users',    1, datetime('now'), datetime('now')),
  ('st-003', 'Programs Offered',    '100+',  'Award',    2, datetime('now'), datetime('now')),
  ('st-004', 'Non-Profit Mission',  '100%',  'Heart',    3, datetime('now'), datetime('now'));

-- ── Testimonials ─────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO testimonials (id, parent_name, child_class, quote, rating, is_featured, sort_order, created_date, updated_date)
VALUES
  ('tm-001', 'Anjali Singh',   'Class VII', 'DIS has transformed my daughter completely. The teachers don''t just teach — they genuinely care about each child''s future. Enrolling her here was the best decision we ever made as parents.', 5, 1, 1, datetime('now'), datetime('now')),
  ('tm-002', 'Mohammed Raza', 'Class IV',  'The English-medium instruction from day one gave my son a confidence I never expected. His vocabulary, reading, and communication skills have improved dramatically in just one year.', 5, 1, 2, datetime('now'), datetime('now')),
  ('tm-003', 'Sunita Devi',   'Class IX',  'As a middle-income family, we worried quality education was out of reach. DIS proved us completely wrong — excellent faculty, genuinely affordable fees, and real, visible results.', 5, 1, 3, datetime('now'), datetime('now'));

-- ── Note ─────────────────────────────────────────────────────────────────────
-- School settings are already seeded by: node database/seed.js
-- No admission inquiries existed in Base44 (table was empty).
-- ============================================================================
-- DIS Data Migration from Base44 to SQLite
-- ============================================================================
-- Import your live data into the local database.
-- Run: sqlite3 dis.db < migrate-from-base44.sql
-- ============================================================================

-- ── Blog Posts ─────────────────────────────────────────────────────────────
INSERT INTO blog_posts (title, slug, category, excerpt, content, author, published, featured, meta_description, tags, created_at)
VALUES
  ('DIS Students Shine at District Science Exhibition 2025', 'dis-science-exhibition-2025', 'Achievements', 'Our students brought home three top prizes at the annual district-level science exhibition, showcasing projects on renewable energy, water purification, and smart agriculture.', '## DIS Students Shine at District Science Exhibition 2025\n\nDaudi International School students made Muzaffarpur proud at the Annual District Science Exhibition held at the Municipal Ground last week.\n\nA total of 12 students from Classes VI through X participated, presenting original projects that demonstrated both scientific rigour and creative problem-solving.\n\n### Award-Winning Projects\n\n**First Prize** — Rahul Kumar (Class X): A working model of a low-cost solar water purifier using locally available materials. The project was praised for its practical applicability in rural Bihar.\n\n**Second Prize** — Zainab Fatima and Priya Singh (Class VIII): A smart drip irrigation system controlled by a soil moisture sensor, designed to help small farmers reduce water wastage.\n\n**Third Prize** — Aarav Sharma (Class VII): A wind turbine model built from recycled materials, demonstrating the basics of renewable energy to a general audience.\n\n### What This Means\n\nThese achievements are a reflection of the hard work of our students and the guidance of our science faculty. At DIS, we believe that education should go beyond textbooks — real learning happens when students ask questions, experiment, and discover.\n\nWe congratulate all participants and look forward to even more achievements in the coming year.', 'DIS Team', 1, 1, 'DIS students win three prizes at the district science exhibition 2025 — showcasing projects on solar energy, irrigation, and renewable power.', 'science, awards, students, exhibition', datetime('now')),
  ('Admissions Open for 2026–27: Everything You Need to Know', 'admissions-2026-27-guide', 'Admissions', 'A complete guide to applying for admission to Daudi International School for the upcoming academic year — process, dates, eligibility, and more.', '## Admissions Open for 2026–27\n\nWe are delighted to announce that admissions for the **2026–27 academic year** are now officially open at Daudi International School, Muzaffarpur.\n\n### Who Can Apply?\n\nAdmissions are open for all classes from **Nursery through Class X**. We welcome students of all backgrounds. DIS is a non-profit, English-medium institution — quality education regardless of your financial situation.\n\n### How to Apply\n\n1. Fill out the online inquiry form on our [Admissions page](/admissions)\n2. We will contact you within 24 hours to schedule a campus visit\n3. A short, informal assessment will be conducted (not competitive — just for placement)\n4. Receive your admission offer and complete the enrollment\n\n### Key Dates\n\n- **Applications Open:** Now\n- **Campus Visit Days:** By appointment (Mon–Sat)\n- **Limited Seats:** Apply early — seats fill quickly\n\n### Scholarship Program\n\nDeserving students from underprivileged backgrounds may apply for our scholarship and fee-waiver program under the Daudi Welfare Trust.\n\n### Contact\n\nCall us at +91 621 224 3314 or email daudischool.muz@gmail.com for any queries.', 'DIS Admissions Office', 1, 0, 'Admissions open at DIS Muzaffarpur for 2026–27. Learn about the process, eligibility, scholarship programs, and key dates.', 'admissions, 2026-27, enrollment, nursery, class X', datetime('now')),
  ('Annual Sports Day 2025: A Day of Energy and Team Spirit', 'annual-sports-day-2025', 'Events', 'Students from all classes competed across track events, relay races, and team sports at DIS's Annual Sports Day — a celebration of fitness, teamwork, and school spirit.', '## Annual Sports Day 2025\n\nThe DIS campus was alive with energy, colour, and cheering on the day of our Annual Sports Day — an event that every student, parent, and teacher looks forward to each year.\n\nStudents from Nursery through Class X participated in a wide range of events — from short sprints and relay races to tug-of-war, long jump, and team games.\n\n### Highlights of the Day\n\n- **Junior Track Champion:** Aisha Begum (Class V) dominated the 100m and 200m events with remarkable speed for her age group.\n- **Senior Track Champion:** Vikram Pandey (Class X) broke the school\'s 400m record that had stood for six years.\n- **Best Team:** Class VIII Green House won the overall relay competition and the highest cumulative points tally.\n\n### Message from the Principal\n\n"Sports teach children what no textbook can — how to win with humility, lose with grace, and always show up for your team. Days like today remind us why a complete education must go beyond the classroom."\n\n### Looking Ahead\n\nDIS will be nominating top performers for district-level athletics competitions later this year. Stay tuned for updates.', 'DIS Team', 1, 0, 'DIS Annual Sports Day 2025 recap — a day of athletics, team spirit, and celebration at Daudi International School, Muzaffarpur.', 'sports, annual day, athletics, school events', datetime('now'));

-- ── Events ─────────────────────────────────────────────────────────────────
INSERT INTO events (title, date, time, location, description, category, status, featured, created_at)
VALUES
  ('Republic Day Celebration', '2026-01-26', '09:00', 'School Ground, DIS Muzaffarpur', 'Our annual Republic Day celebration features a flag hoisting ceremony, student parade, patriotic songs, and cultural performances. All parents are warmly invited to attend.', 'National Event', 'past', 1, datetime('now')),
  ('Annual Science Exhibition', '2026-02-14', '10:00–16:00', 'School Hall, DIS Muzaffarpur', 'Students from Class V to X showcase innovative science projects and experiments. Judges from local colleges will evaluate entries for prizes.', 'Academic', 'past', 0, datetime('now')),
  ('Annual Sports Day', '2026-03-10', '08:00', 'School Ground, DIS Muzaffarpur', 'Inter-house athletic competitions including track events, team sports, and fun activities. Prize distribution ceremony follows.', 'Sports', 'past', 0, datetime('now')),
  ('Independence Day Celebration', '2025-08-15', '09:00', 'School Ground', 'Flag hoisting, patriotic performances, and prize distribution for academic achievers.', 'National Event', 'past', 0, datetime('now')),
  ('Children\'s Day Celebration', '2025-11-14', '10:00', 'School Hall', 'Teachers performed for students as a special treat — skits, songs, and fun games.', 'School Event', 'past', 0, datetime('now')),
  ('Annual Prize Distribution', '2025-12-20', '16:00', 'School Auditorium', 'Annual ceremony honouring top academic performers, sports champions, and students showing exemplary character.', 'Academic', 'past', 0, datetime('now'));

-- ── Gallery Photos ─────────────────────────────────────────────────────────
INSERT INTO gallery_photos (title, src, category, is_real, sort_order, created_at)
VALUES
  ('Republic Day Celebration – DIS', 'https://i.ytimg.com/vi/qXYJYEKhXTY/maxresdefault.jpg', 'Events', 1, 0, datetime('now'));

-- ── Stats ──────────────────────────────────────────────────────────────────
INSERT INTO stats (label, value, icon, sort_order, created_at)
VALUES
  ('Years of Excellence', '20+', 'BookOpen', 0, datetime('now')),
  ('Students Enrolled', '1000+', 'Users', 1, datetime('now')),
  ('Programs Offered', '100+', 'Award', 2, datetime('now')),
  ('Non-Profit Mission', '100%', 'Heart', 3, datetime('now'));

-- ── School Settings ────────────────────────────────────────────────────────
INSERT INTO school_settings (key, value, label, group_name, created_at)
VALUES
  ('school_name', 'Daudi International School', 'School Name', 'general', datetime('now')),
  ('tagline', 'Muzaffarpur, Bihar — The Only Non-Profit Organisation', 'Tagline', 'general', datetime('now')),
  ('founder_quote', 'Education is the most powerful weapon which you can use to change the world. At Daudi International School, we believe every child deserves a chance to rise.', 'Founder Quote', 'general', datetime('now')),
  ('hero_badge', 'Admissions Open 2026–27', 'Hero Badge Text', 'hero', datetime('now')),
  ('hero_description', 'Empowering young minds with quality education, strong values, and a vision for a brighter tomorrow — under the Daudi Welfare Trust.', 'Hero Description', 'hero', datetime('now')),
  ('address', 'Shafi Manzil, Daudi Market, Motijheel, Muzaffarpur, Bihar 842001', 'Address', 'contact', datetime('now')),
  ('phone', '+91 621 224 3314', 'Phone', 'contact', datetime('now')),
  ('email', 'daudischool.muz@gmail.com', 'Email', 'contact', datetime('now')),
  ('facebook_url', 'https://www.facebook.com/p/Daudi-International-School-Muzaffarpur-100072254675605/', 'Facebook URL', 'social', datetime('now')),
  ('youtube_url', 'https://www.youtube.com/@altamashdaudi7099', 'YouTube URL', 'social', datetime('now'));

-- ── Testimonials ───────────────────────────────────────────────────────────
INSERT INTO testimonials (parent_name, child_class, quote, rating, is_featured, sort_order, created_at)
VALUES
  ('Anjali Singh', 'Class VII', "DIS has transformed my daughter completely. The teachers don't just teach — they genuinely care about each child's future. Enrolling her here was the best decision we ever made as parents.", 5, 1, 1, datetime('now')),
  ('Mohammed Raza', 'Class IV', 'The English-medium instruction from day one gave my son a confidence I never expected. His vocabulary, reading, and communication skills have improved dramatically in just one year.', 5, 1, 2, datetime('now')),
  ('Sunita Devi', 'Class IX', 'As a middle-income family, we worried quality education was out of reach. DIS proved us completely wrong — excellent faculty, genuinely affordable fees, and real, visible results.', 5, 1, 3, datetime('now'));

-- ── Completion ──────────────────────────────────────────────────────────────
-- Your data is now ready for your local SQLite database!
-- No admission inquiries were found in Base44 (table was empty).
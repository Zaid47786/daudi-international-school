import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Users, Award, Heart, Star, Globe, Trophy, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSettings, useStats, useEvents } from "../lib/useSchoolData";

const ICON_MAP = { BookOpen, Users, Award, Heart, Star, Globe, Trophy };

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" } }),
};

export default function Home() {
  const { settings } = useSettings();
  const { stats } = useStats();
  const { events: upcomingEvents } = useEvents("upcoming");

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "var(--font-inter)" }}>
      <Navbar />

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-end pb-16 sm:pb-24 overflow-hidden"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1800&q=85)`,
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
        }}
      >
        {/* Dark overlay — heavier at bottom, lighter at top */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(10,18,48,0.97) 0%, rgba(10,18,48,0.55) 55%, rgba(10,18,48,0.3) 100%)" }}
        />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 w-full pt-32">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--amber)",
                marginBottom: "18px",
              }}
            >
              Muzaffarpur, Bihar — Est. 2005
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(2.2rem, 5.5vw, 3.75rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: "#fff",
                marginBottom: "20px",
              }}
            >
              Where every child<br />
              <em style={{ fontStyle: "italic", color: "var(--amber-light)" }}>deserves</em> to learn.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22 }}
              style={{
                fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.7,
                maxWidth: "480px",
                marginBottom: "32px",
              }}
            >
              {settings.hero_description || "A non-profit English-medium school in Muzaffarpur, run by the Daudi Welfare Trust. Quality education for all — regardless of background."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.34 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: "var(--amber)", color: "var(--cobalt-deep)" }}
              >
                Apply for admission
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded transition-all duration-150"
                style={{ border: "1px solid rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.8)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
              >
                Our story
              </Link>
            </motion.div>
          </div>

          {/* Logo badge — bottom right on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute bottom-0 right-5 sm:right-8 lg:right-10 hidden md:block"
          >
            <img
              src="https://media.base44.com/images/public/user_68a720ca6a1156f1068d37b1/9fb988c1a_dis.png"
              alt="DIS"
              className="h-28 lg:h-36 w-auto opacity-90 drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* ─── STATS STRIP ──────────────────────────────────────── */}
      {stats.length > 0 && (
        <section style={{ backgroundColor: "var(--cream-dark)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-black/8">
              {stats.map((s, i) => {
                const Icon = ICON_MAP[s.icon] || Star;
                return (
                  <motion.div
                    key={s.id}
                    custom={i}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="flex flex-col items-start px-5 py-7 sm:px-8"
                  >
                    <Icon size={17} style={{ color: "var(--amber)", marginBottom: "10px", strokeWidth: 1.75 }} />
                    <span
                      style={{
                        fontFamily: "var(--font-fraunces)",
                        fontSize: "1.75rem",
                        fontWeight: 700,
                        color: "var(--cobalt-deep)",
                        lineHeight: 1,
                        marginBottom: "4px",
                      }}
                    >
                      {s.value}
                    </span>
                    <span style={{ fontSize: "12px", color: "var(--ink-muted)", fontWeight: 500 }}>{s.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── ABOUT SPLIT ──────────────────────────────────────── */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: "#fff" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Image stack — asymmetric */}
            <motion.div
              className="lg:col-span-5 relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80"
                  alt="Students at DIS"
                  className="w-full rounded-sm object-cover"
                  style={{ height: "360px", objectPosition: "center 30%" }}
                />
                {/* Floating accent card */}
                <div
                  className="absolute -bottom-5 -right-4 sm:-right-6 px-5 py-4 rounded shadow-lg"
                  style={{ backgroundColor: "var(--cobalt-deep)" }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-fraunces)",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--amber)",
                      lineHeight: 1,
                    }}
                  >
                    500+
                  </div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)", marginTop: "3px" }}>
                    students enrolled
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text — left-aligned, not centered */}
            <motion.div
              className="lg:col-span-7 lg:pl-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p
                className="mb-4"
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--ink-muted)",
                }}
              >
                Who we are
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontSize: "clamp(1.7rem, 3.5vw, 2.5rem)",
                  fontWeight: 700,
                  color: "var(--cobalt-deep)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  marginBottom: "20px",
                }}
              >
                A school built on<br />trust, not profit.
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  color: "var(--ink-soft)",
                  lineHeight: 1.75,
                  marginBottom: "14px",
                  maxWidth: "520px",
                }}
              >
                Daudi International School was founded in 2005 under the Daudi Welfare Trust with one conviction: every child in Muzaffarpur, regardless of economic background, deserves a quality English-medium education.
              </p>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--ink-muted)",
                  lineHeight: 1.75,
                  marginBottom: "28px",
                  maxWidth: "520px",
                }}
              >
                We're non-profit by design. Every rupee goes back into classrooms, teachers, and the students we serve.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-150 group"
                style={{ color: "var(--cobalt)" }}
              >
                Read our story
                <ArrowRight size={15} className="transition-transform duration-150 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FOUNDER QUOTE ────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--cream)", borderTop: "1px solid rgba(0,0,0,0.05)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-1 hidden lg:flex items-center justify-center">
              <div style={{ width: "2px", height: "80px", backgroundColor: "var(--amber)", opacity: 0.6 }} />
            </div>
            <motion.div
              className="lg:col-span-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontSize: "clamp(1.15rem, 2.5vw, 1.5rem)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "var(--cobalt-deep)",
                  lineHeight: 1.65,
                  marginBottom: "20px",
                }}
              >
                "{settings.founder_quote || "Education is not a privilege — it is a right. We built this school to prove it."}"
              </p>
              <div className="flex items-center gap-3">
                <div style={{ width: "28px", height: "2px", backgroundColor: "var(--amber)" }} />
                <div>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--cobalt-deep)" }}>Altamash Daudi</span>
                  <span style={{ fontSize: "12px", color: "var(--ink-muted)", marginLeft: "8px" }}>— Founder, DIS</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── UPCOMING EVENTS ──────────────────────────────────── */}
      {upcomingEvents.length > 0 && (
        <section className="py-20 sm:py-24" style={{ backgroundColor: "#fff" }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

            <div className="flex items-end justify-between mb-10 gap-4">
              <div>
                <p
                  className="mb-2"
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--ink-muted)",
                  }}
                >
                  What's coming up
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    fontWeight: 700,
                    color: "var(--cobalt-deep)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                  }}
                >
                  School Calendar
                </h2>
              </div>
              <Link
                to="/events"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium group shrink-0"
                style={{ color: "var(--cobalt)" }}
              >
                All events
                <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Non-uniform event list — not a card grid */}
            <div className="space-y-0 divide-y" style={{ borderTop: "1px solid rgba(0,0,0,0.07)", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
              {upcomingEvents.slice(0, 4).map((ev, i) => (
                <motion.div
                  key={ev.id}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex items-start gap-5 sm:gap-8 py-5 group"
                  style={{ borderColor: "rgba(0,0,0,0.06)" }}
                >
                  <div className="shrink-0 w-11 text-right">
                    <span
                      style={{
                        fontFamily: "var(--font-fraunces)",
                        fontSize: "1.4rem",
                        fontWeight: 600,
                        color: "var(--amber)",
                        lineHeight: 1,
                        display: "block",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>
                      {ev.category} · {ev.date}
                    </p>
                    <h3
                      className="transition-colors duration-150 group-hover:text-cobalt"
                      style={{ fontSize: "1rem", fontWeight: 600, color: "var(--ink)", lineHeight: 1.35 }}
                    >
                      {ev.title}
                    </h3>
                    {ev.description && (
                      <p className="mt-1 line-clamp-1" style={{ fontSize: "0.875rem", color: "var(--ink-muted)" }}>
                        {ev.description}
                      </p>
                    )}
                  </div>
                  {ev.location && (
                    <p className="hidden sm:block shrink-0 text-xs" style={{ color: "var(--ink-muted)", paddingTop: "3px" }}>
                      {ev.location}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-6 sm:hidden">
              <Link
                to="/events"
                className="inline-flex items-center gap-1.5 text-sm font-medium"
                style={{ color: "var(--cobalt)" }}
              >
                View all events <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── ACADEMICS TEASER ─────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--cobalt-deep)" }} className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <p
                className="mb-4"
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--amber)",
                }}
              >
                Curriculum
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  marginBottom: "16px",
                }}
              >
                Nursery to Class X,<br />taught in English.
              </h2>
              <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: "28px", maxWidth: "400px" }}>
                Small classes, dedicated teachers, and a curriculum that builds thinkers — not just exam-passers.
              </p>
              <Link
                to="/academics"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-150 group"
                style={{ color: "var(--amber)" }}
              >
                See the curriculum
                <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Montessori & Nursery", sub: "Ages 3–5" },
                  { label: "Primary", sub: "Class I – V" },
                  { label: "Middle School", sub: "Class VI – VIII" },
                  { label: "Secondary", sub: "Class IX – X" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="p-5 rounded"
                    style={{
                      backgroundColor: i === 0 ? "var(--amber)" : "rgba(255,255,255,0.06)",
                      border: i !== 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: i === 0 ? "var(--cobalt-deep)" : "#fff",
                        marginBottom: "4px",
                      }}
                    >
                      {item.label}
                    </p>
                    <p style={{ fontSize: "12px", color: i === 0 ? "var(--cobalt)" : "rgba(255,255,255,0.45)" }}>
                      {item.sub}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "var(--cream)", borderTop: "1px solid rgba(0,0,0,0.05)" }}
        className="py-16 sm:py-20"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
                  fontWeight: 700,
                  color: "var(--cobalt-deep)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  marginBottom: "8px",
                }}
              >
                Admissions open for 2026–27.
              </h2>
              <p style={{ fontSize: "0.95rem", color: "var(--ink-soft)" }}>
                Get in touch — we'd love to show you around.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded transition-all duration-150 hover:opacity-90"
                style={{ backgroundColor: "var(--cobalt-deep)", color: "#fff" }}
              >
                Apply now
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded transition-all duration-150"
                style={{ border: "1px solid rgba(0,0,0,0.18)", color: "var(--ink-soft)" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--cobalt)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(0,0,0,0.18)"}
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
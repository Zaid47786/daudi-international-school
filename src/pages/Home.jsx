import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Users, Award, Heart, Star, Globe, Trophy, ArrowRight, ArrowUpRight, GraduationCap } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import TestimonialsSection from "../components/home/TestimonialsSection";
import FAQSection from "../components/home/FAQSection";
import TrustSignals from "../components/home/TrustSignals";
import { useSettings, useStats, useEvents } from "../lib/useSchoolData";

const ICON_MAP = { BookOpen, Users, Award, Heart, Star, Globe, Trophy, GraduationCap };

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

export default function Home() {
  const { settings } = useSettings();
  const { stats } = useStats();
  const { events: upcomingEvents } = useEvents("upcoming");

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "var(--font-inter)" }}>
      <SEOHead
        title="Best School in Muzaffarpur | English Medium Education"
        description="Daudi International School — one of the best English-medium schools in Muzaffarpur, Bihar. Non-profit, Nursery to Class X, quality education under Daudi Welfare Trust. Admissions open 2026–27."
        canonical="https://daudischool.in/"
      />
      <Navbar />

      {/* ══════════════════════════════════════════
          HERO — asymmetric, editorial, full-bleed
         ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: "100svh", backgroundColor: "var(--cobalt-deep)" }}>

        {/* Background image — right-side crop */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1800&q=85"
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 20%", opacity: 0.25 }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(110deg, var(--cobalt-deep) 50%, rgba(14,31,82,0.6) 100%)" }} />
        </div>

        {/* Fine grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex flex-col items-center justify-center" style={{ minHeight: "100svh", paddingTop: "80px", paddingBottom: "64px", gap: "clamp(24px, 5vw, 56px)" }}>

          {/* Logo — responsive size per breakpoint */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <img
              src="https://media.base44.com/images/public/user_68a720ca6a1156f1068d37b1/9fb988c1a_dis.png"
              alt="Daudi International School"
              className="w-auto drop-shadow-2xl h-24 sm:h-32 md:h-36 lg:h-40 xl:h-44"
            />
            <p className="mt-2 font-inter font-semibold text-white uppercase tracking-widest text-center text-[9px] sm:text-[10px] lg:text-[11px]" style={{ letterSpacing: "0.22em", opacity: 0.45 }}>
              Daudi International School
            </p>
          </motion.div>

          <div className="w-full max-w-3xl text-center sm:text-left">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center sm:justify-start gap-3 mb-6 sm:mb-8"
            >
              <div className="w-6 h-px" style={{ backgroundColor: "var(--amber)" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,168,32,0.85)" }}>
                Muzaffarpur · Est. 2005 · Non-profit
              </span>
            </motion.div>

            {/* Main headline — mixed weight, varied sizing */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 style={{ lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "24px" }}>
                <span className="block text-white font-inter font-bold" style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}>
                  Where every child
                </span>
                <span className="block font-fraunces italic" style={{ fontSize: "clamp(2.6rem, 6.5vw, 5rem)", color: "var(--amber-light)" }}>
                  deserves to learn.
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22 }}
              style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", color: "rgba(255,255,255,0.58)", lineHeight: 1.75, maxWidth: "500px", marginBottom: "36px" }}
            >
              {settings.hero_description || "A non-profit, English-medium school under the Daudi Welfare Trust — quality education for every child in Muzaffarpur, regardless of background."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.34 }}
              className="flex flex-wrap gap-3 justify-center sm:justify-start"
            >
              <Link to="/admissions"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-lg transition-all duration-200 hover:brightness-105 active:scale-[0.98]"
                style={{ backgroundColor: "var(--amber)", color: "var(--cobalt-deep)" }}>
                Apply for admission
                <ArrowRight size={14} />
              </Link>
              <Link to="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium rounded-lg transition-all duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.16)", color: "rgba(255,255,255,0.75)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}>
                Our story
              </Link>
            </motion.div>
          </div>


        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS STRIP — dynamic from DB
         ══════════════════════════════════════════ */}
      {stats.length > 0 && (
        <section style={{ backgroundColor: "var(--cobalt-deep)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="flex flex-wrap">
              {stats.slice(0, 4).map((s, i) => {
                const Icon = ICON_MAP[s.icon] || Star;
                return (
                  <motion.div key={s.id} {...fadeUp(i * 0.06)}
                    className="flex-1 min-w-[140px] flex items-center gap-4 px-6 py-7 border-r last:border-r-0"
                    style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                    <Icon size={16} strokeWidth={1.75} style={{ color: "var(--amber)", flexShrink: 0 }} />
                    <div>
                      <div className="font-fraunces font-bold text-white leading-none" style={{ fontSize: "1.6rem" }}>{s.value}</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.38)", marginTop: "3px", fontWeight: 500 }}>{s.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          ABOUT — editorial split, image left
         ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Image — with floating accent */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80"
                alt="Students at DIS"
                className="w-full rounded-xl object-cover shadow-xl"
                style={{ height: "clamp(280px, 40vw, 460px)", objectPosition: "center 30%" }}
              />
              {/* accent block */}
              <div className="absolute -bottom-5 -right-5 px-6 py-5 rounded-xl shadow-2xl"
                style={{ backgroundColor: "var(--cobalt-deep)" }}>
                <div className="font-fraunces font-bold leading-none mb-1" style={{ fontSize: "2rem", color: "var(--amber)" }}>1000+</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>students taught</div>
              </div>
              {/* amber rule */}
              <div className="absolute top-0 left-0 w-1 h-full rounded-l-xl" style={{ backgroundColor: "var(--amber)" }} />
            </motion.div>

            {/* Text */}
            <motion.div {...fadeUp(0.1)}>
              <p className="label-stamp text-cobalt mb-5">Who we are</p>
              <h2 className="font-fraunces font-bold tracking-tight leading-tight mb-6"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "var(--cobalt-deep)" }}>
                A school built on<br />trust, not profit.
              </h2>
              <p style={{ fontSize: "1rem", color: "var(--ink-soft)", lineHeight: 1.8, marginBottom: "12px" }}>
                Founded in 2005 under the Daudi Welfare Trust — DIS exists to prove that quality English-medium education in Muzaffarpur doesn't have to be a privilege.
              </p>
              <p style={{ fontSize: "0.9rem", color: "var(--ink-muted)", lineHeight: 1.8, marginBottom: "32px" }}>
                We're non-profit by design. Every rupee goes back into classrooms, teachers, and the students we serve.
              </p>

              <div className="flex flex-col gap-3 mb-10">
                {["English-medium, Nursery to Class X", "Scholarships for underprivileged students", "Dedicated mentors, not just instructors"].map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--amber)" }} />
                    <span style={{ fontSize: "14px", color: "var(--ink-soft)" }}>{point}</span>
                  </div>
                ))}
              </div>

              <Link to="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold group transition-colors duration-150"
                style={{ color: "var(--cobalt)" }}>
                Read our full story
                <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOUNDER QUOTE — full-width, editorial
         ══════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 relative overflow-hidden" style={{ backgroundColor: "var(--cream)", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* giant quote mark */}
            <div className="absolute -top-4 -left-2 font-fraunces leading-none select-none"
              style={{ fontSize: "8rem", color: "var(--amber)", opacity: 0.12, lineHeight: 1 }}>"</div>

            <blockquote className="relative font-fraunces italic leading-[1.6] mb-8"
              style={{ fontSize: "clamp(1.15rem, 2.5vw, 1.6rem)", color: "var(--cobalt-deep)" }}>
              "{settings.founder_quote || "Education is not a privilege — it is a right. We built this school to prove it."}"
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: "var(--amber)" }} />
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--cobalt-deep)" }}>Altamash Daudi</span>
              <span style={{ fontSize: "12px", color: "var(--ink-muted)" }}>Founder & Director, DIS</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ACADEMICS — dark, grid layout
         ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: "var(--cobalt-deep)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <motion.div {...fadeUp(0)}>
              <p className="label-stamp mb-4" style={{ color: "rgba(232,168,32,0.75)" }}>Curriculum</p>
              <h2 className="font-fraunces font-bold text-white tracking-tight leading-tight"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)" }}>
                Nursery to Class X,<br />taught in English.
              </h2>
            </motion.div>
            <motion.div {...fadeUp(0.1)}>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, maxWidth: "340px" }}>
                Small classes, dedicated teachers, a curriculum that builds thinkers — not just exam-passers.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            {[
              { label: "Montessori & Nursery", sub: "Ages 3–5", accent: true },
              { label: "Primary School", sub: "Class I – V" },
              { label: "Middle School", sub: "Class VI – VIII" },
              { label: "Secondary", sub: "Class IX – X" },
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp(i * 0.07)}
                className="rounded-xl p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: item.accent ? "var(--amber)" : "rgba(255,255,255,0.05)",
                  border: item.accent ? "none" : "1px solid rgba(255,255,255,0.07)",
                }}>
                <div className="text-xs font-bold mb-3 rounded-full w-7 h-7 flex items-center justify-center"
                  style={{ backgroundColor: item.accent ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.07)", color: item.accent ? "var(--cobalt-deep)" : "rgba(255,255,255,0.4)" }}>
                  {i + 1}
                </div>
                <p className="font-semibold text-sm mb-1 leading-snug"
                  style={{ color: item.accent ? "var(--cobalt-deep)" : "#fff" }}>
                  {item.label}
                </p>
                <p style={{ fontSize: "12px", color: item.accent ? "var(--cobalt)" : "rgba(255,255,255,0.38)" }}>
                  {item.sub}
                </p>
              </motion.div>
            ))}
          </div>

          <Link to="/academics"
            className="inline-flex items-center gap-2 text-sm font-semibold group transition-colors duration-150"
            style={{ color: "var(--amber)" }}>
            Explore the full curriculum
            <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          EVENTS — editorial list, not card grid
         ══════════════════════════════════════════ */}
      {upcomingEvents.length > 0 && (
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="flex items-end justify-between mb-10 gap-4">
              <motion.div {...fadeUp(0)}>
                <p className="label-stamp text-cobalt mb-2">What's coming up</p>
                <h2 className="font-fraunces font-bold tracking-tight" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "var(--cobalt-deep)" }}>
                  School Calendar
                </h2>
              </motion.div>
              <Link to="/events"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium group shrink-0"
                style={{ color: "var(--cobalt)" }}>
                All events <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-1" />
              </Link>
            </div>

            <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
              {upcomingEvents.slice(0, 4).map((ev, i) => (
                <motion.div key={ev.id} {...fadeUp(i * 0.06)}
                  className="flex items-start gap-5 sm:gap-8 py-5 border-b group cursor-default"
                  style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <div className="shrink-0 w-10 text-right">
                    <span className="font-fraunces font-bold" style={{ fontSize: "1.35rem", color: "var(--amber)", lineHeight: 1 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>
                      {ev.category} · {ev.date}
                    </p>
                    <h3 className="transition-colors duration-150 group-hover:text-cobalt"
                      style={{ fontSize: "1rem", fontWeight: 600, color: "var(--ink)", lineHeight: 1.35 }}>
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
              <Link to="/events" className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: "var(--cobalt)" }}>
                View all events <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          VISUAL GALLERY TEASER
         ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-24" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex items-end justify-between mb-8">
            <motion.div {...fadeUp(0)}>
              <p className="label-stamp text-cobalt mb-2">Campus life</p>
              <h2 className="font-fraunces font-bold tracking-tight" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "var(--cobalt-deep)" }}>
                Real moments, real stories.
              </h2>
            </motion.div>
            <Link to="/gallery"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium group shrink-0"
              style={{ color: "var(--cobalt)" }}>
              Full gallery <ArrowUpRight size={14} />
            </Link>
          </div>

          <motion.div {...fadeUp(0.08)} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {[
              { src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&q=80", span: "col-span-2 row-span-2", h: "h-64 sm:h-80" },
              { src: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&q=80", span: "", h: "h-32 sm:h-36" },
              { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80", span: "", h: "h-32 sm:h-36" },
              { src: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&q=80", span: "", h: "h-32 sm:h-36" },
              { src: "https://images.unsplash.com/photo-1573495627361-d9b87960b12d?w=400&q=80", span: "", h: "h-32 sm:h-36" },
            ].map((img, i) => (
              <div key={i} className={`${img.span} overflow-hidden rounded-xl group cursor-pointer`}>
                <img src={img.src} alt="" className={`w-full ${img.h} object-cover group-hover:scale-105 transition-transform duration-500`} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Local presence strip */}
      <section style={{ backgroundColor: "var(--cobalt-deep)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-5">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span style={{ fontSize: "12px", color: "rgba(232,168,32,0.85)" }}>📍</span>
              <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
                Shafi Manzil, Motijheel, <strong style={{ color: "rgba(255,255,255,0.8)" }}>Muzaffarpur</strong>, Bihar 842001
              </span>
            </div>
            <div className="hidden sm:block w-px h-4" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
            <div className="flex items-center gap-2">
              <span style={{ fontSize: "12px", color: "rgba(232,168,32,0.85)" }}>📞</span>
              <a href="tel:+916212243314" className="text-xs font-medium hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.55)" }}>
                +91 621 224 3314
              </a>
            </div>
            <div className="hidden sm:block w-px h-4" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
            <div className="flex items-center gap-2">
              <span style={{ fontSize: "12px", color: "rgba(232,168,32,0.85)" }}>🕐</span>
              <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>Mon – Sat · 8:00 AM – 3:00 PM</span>
            </div>
            <div className="hidden sm:block w-px h-4" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
            <a href="https://www.google.com/maps/search/Daudi+International+School+Muzaffarpur"
              target="_blank" rel="noopener noreferrer"
              className="text-xs font-semibold px-3 py-1.5 rounded transition-opacity hover:opacity-80"
              style={{ backgroundColor: "var(--amber)", color: "var(--cobalt-deep)" }}>
              Get Directions →
            </a>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <TrustSignals />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQ */}
      <FAQSection />

      {/* ══════════════════════════════════════════
          CTA — clean, direct
         ══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-white" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
            <motion.div {...fadeUp(0)}>
              <h2 className="font-fraunces font-bold tracking-tight leading-tight mb-2"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "var(--cobalt-deep)" }}>
                Admissions open for 2026–27.
              </h2>
              <p style={{ fontSize: "0.95rem", color: "var(--ink-soft)" }}>Get in touch — we'd love to show you around.</p>
            </motion.div>
            <motion.div {...fadeUp(0.1)} className="flex flex-wrap gap-3 shrink-0">
              <Link to="/admissions"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-lg transition-all duration-150 hover:opacity-90"
                style={{ backgroundColor: "var(--cobalt-deep)", color: "#fff" }}>
                Apply now
              </Link>
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium rounded-lg transition-all duration-200 border"
                style={{ borderColor: "rgba(0,0,0,0.14)", color: "var(--ink-soft)" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--cobalt)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(0,0,0,0.14)"}>
                Contact us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Users, Award, Heart, Star, Globe, Trophy, ArrowRight, GraduationCap, MapPin, Phone } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import TestimonialsSection from "../components/home/TestimonialsSection";
import FAQSection from "../components/home/FAQSection";
import TrustSignals from "../components/home/TrustSignals";
import { useSettings, useStats, useEvents } from "../lib/useSchoolData";

const ICON_MAP = { BookOpen, Users, Award, Heart, Star, Globe, Trophy, GraduationCap };

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-30px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

export default function Home() {
  const { settings } = useSettings();
  const { stats } = useStats();
  const { events: upcomingEvents } = useEvents("upcoming");
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div id="main-content" className="min-h-screen bg-white" style={{ fontFamily: "var(--font-inter)" }}>
      <SEOHead
        title="Best School in Muzaffarpur | English Medium Education"
        description="Daudi International School — one of the best English-medium schools in Muzaffarpur, Bihar. Non-profit, Nursery to Class X, quality education under Daudi Welfare Trust. Admissions open 2026–27."
        canonical="https://daudischool.in/"
      />
      <Navbar />

      {/* ═══════════════════════════════════════════════════
          HERO — cinematic parallax, left-anchored storytelling
         ═══════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ minHeight: "100svh", backgroundColor: "var(--cobalt-deep)" }}>

        {/* Parallax background */}
        <motion.div className="absolute inset-0" style={{ y: heroImgY }}>
          <img
            src="https://images.unsplash.com/photo-1709290749293-c6152a187b14?w=1800&q=85"
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 20%", opacity: 0.18 }}
            fetchpriority="high"
          />
        </motion.div>

        {/* Layered gradient — more atmospheric */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(14,31,82,0.97) 0%, rgba(14,31,82,0.75) 50%, rgba(26,53,128,0.5) 100%)" }} />

        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

        {/* Amber accent — thin top line */}
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, transparent 0%, var(--amber) 30%, var(--amber-light) 60%, transparent 100%)" }} />

        <motion.div
          style={{ opacity: heroOpacity, minHeight: "100svh", paddingTop: "90px", paddingBottom: "80px" }}
          className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 flex flex-col lg:flex-row lg:items-center lg:gap-20"
        >
          {/* Left — text content */}
          <div className="flex-1 flex flex-col justify-center">

            {/* Eyebrow chip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 self-start mb-8"
              style={{ border: "1px solid rgba(232,168,32,0.3)", borderRadius: "100px", padding: "6px 14px 6px 8px", backgroundColor: "rgba(232,168,32,0.07)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--amber)", boxShadow: "0 0 6px var(--amber)" }} />
              <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(232,168,32,0.9)" }}>
                Muzaffarpur · Est. 2004 · Non-profit
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{ lineHeight: 1.06, letterSpacing: "-0.03em", marginBottom: "28px" }}
            >
              <span className="block text-white font-inter font-bold" style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)" }}>
                Where every child
              </span>
              <span className="block font-fraunces italic" style={{ fontSize: "clamp(2.8rem, 6vw, 4.9rem)", color: "var(--amber-light)", lineHeight: 1.1 }}>
                deserves to learn.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ fontSize: "clamp(1rem, 1.6vw, 1.1rem)", color: "rgba(255,255,255,0.52)", lineHeight: 1.85, maxWidth: "480px", marginBottom: "40px" }}
            >
              {settings.hero_description || "A non-profit, English-medium school under the Daudi Welfare Trust — quality education for every child in Muzaffarpur, regardless of background."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42 }}
              className="flex flex-wrap gap-3"
            >
              <Link to="/admissions"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold rounded-xl transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
                style={{ backgroundColor: "var(--amber)", color: "var(--cobalt-deep)", letterSpacing: "0.01em" }}>
                Apply for admission
                <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
              <Link to="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-white/8"
                style={{ border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.7)" }}>
                Our story
              </Link>
            </motion.div>

            {/* Micro social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.62 }}
              className="flex items-center gap-4 mt-10"
            >
              <div className="flex -space-x-2">
                 {["https://images.unsplash.com/photo-1606155566195-cc12e2b4dfe3?w=60&h=60&fit=crop",
                   "https://images.unsplash.com/photo-1595152772835-219674b2a163?w=60&h=60&fit=crop",
                   "https://images.unsplash.com/photo-1588072432836-e10032774350?w=60&h=60&fit=crop"].map((src, i) => (
                  <img key={i} src={src} alt="DIS parent" width="32" height="32" className="w-8 h-8 rounded-full object-cover ring-2"
                    style={{ ringColor: "var(--cobalt-deep)" }} />
                ))}
              </div>
              <div>
                <div className="flex gap-px mb-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} size={11} fill="var(--amber)" style={{ color: "var(--amber)" }} />)}
                </div>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>Trusted by <strong style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>1,000+ families</strong> in Muzaffarpur</p>
              </div>
            </motion.div>
          </div>

          {/* Right — logo mark, larger screens */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col items-center shrink-0"
            style={{ width: "280px" }}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-3xl opacity-20" style={{ backgroundColor: "var(--amber)" }} />
              <img
                src="https://media.base44.com/images/public/user_68a720ca6a1156f1068d37b1/9fb988c1a_dis.png"
                alt="Daudi International School Muzaffarpur official logo"
                fetchpriority="high"
                className="relative w-48 h-auto drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: 0.35 }}
        >
          <div className="w-px h-10 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
            <motion.div
              className="w-px rounded-full"
              style={{ backgroundColor: "var(--amber)", height: "40%" }}
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════
          STATS — horizontal scroll feel, not a rigid grid
         ═══════════════════════════════════════════════════ */}
      {stats.length > 0 && (
        <section style={{ backgroundColor: "var(--ink)", overflow: "hidden" }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="flex overflow-x-auto scrollbar-hide" style={{ scrollSnapType: "x mandatory" }}>
              {stats.slice(0, 4).map((s, i) => {
                const Icon = ICON_MAP[s.icon] || Star;
                return (
                  <motion.div key={s.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="flex-1 min-w-[160px] flex flex-col justify-center px-7 py-8 relative"
                    style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none", scrollSnapAlign: "start" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={14} strokeWidth={1.75} style={{ color: "var(--amber)", opacity: 0.85 }} />
                    </div>
                    <div className="font-fraunces font-bold text-white" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", lineHeight: 1, letterSpacing: "-0.02em" }}>{s.value}</div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", marginTop: "6px", fontWeight: 500, letterSpacing: "0.03em" }}>{s.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          ABOUT — organic, offset, editorial
         ═══════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-36 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 items-center">

            {/* Image column — 5 cols with organic offset */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 relative"
              style={{ paddingBottom: "40px" }}
            >
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl"
                style={{ height: "clamp(300px, 40vw, 500px)" }}>
                <img
                  src="https://images.unsplash.com/photo-1573894999291-f440466112cc?w=900&q=85"
                  alt="Students learning at Daudi International School Muzaffarpur"
                  loading="lazy"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 30%" }}
                />
                {/* Soft vignette bottom */}
                <div className="absolute inset-x-0 bottom-0 h-24"
                  style={{ background: "linear-gradient(to top, rgba(14,31,82,0.35), transparent)" }} />
              </div>

              {/* Floating stat card — offset bottom right */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.3 }}
                className="absolute bottom-0 right-0 sm:-right-6 rounded-2xl shadow-xl px-6 py-5"
                style={{ backgroundColor: "var(--cobalt-deep)", minWidth: "160px" }}>
                <div className="font-fraunces font-bold leading-none mb-1.5" style={{ fontSize: "2.2rem", color: "var(--amber)", letterSpacing: "-0.02em" }}>1000+</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: 1.4 }}>children taught<br />since 2004</div>
              </motion.div>

              {/* Small accent image — stacked behind */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-xl overflow-hidden hidden sm:block shadow-lg"
                style={{ border: "3px solid white" }}>
                <img
                  src="https://images.unsplash.com/photo-1636772523547-5577d04e8dc1?w=200&q=75"
                  alt="DIS school activity"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Text column — 6 cols, offset by 1 */}
            <motion.div
              {...fadeUp(0.12)}
              className="lg:col-span-6 lg:col-start-7 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px" style={{ backgroundColor: "var(--amber)" }} />
                <span className="label-stamp text-cobalt">Who we are</span>
              </div>

              <h2 className="font-inter font-bold tracking-tight leading-[1.1] mb-6"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--ink)", letterSpacing: "-0.025em" }}>
                A school built on<br />
                <span style={{ color: "var(--cobalt)" }}>trust, not profit.</span>
              </h2>

              <p style={{ fontSize: "1.05rem", color: "var(--ink-soft)", lineHeight: 1.85, marginBottom: "10px" }}>
                Founded in 2004 under the Daudi Welfare Trust — DIS exists to prove that quality English-medium education in Muzaffarpur doesn't have to be a privilege.
              </p>
              <p style={{ fontSize: "0.92rem", color: "var(--ink-muted)", lineHeight: 1.85, marginBottom: "36px" }}>
                We're non-profit by design. Every rupee goes back into classrooms, teachers, and the futures of the students we serve.
              </p>

              {/* Proof points — horizontal lines, not bullets */}
              <div className="space-y-0 mb-10" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                {["English-medium instruction, Nursery to Class X", "Scholarships for underprivileged students", "Dedicated mentors, not just instructors"].map((point, i) => (
                  <div key={i} className="flex items-center gap-4 py-4"
                    style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                    <span className="font-fraunces font-bold text-xs shrink-0" style={{ color: "var(--amber)", minWidth: "20px" }}>0{i+1}</span>
                    <span style={{ fontSize: "14px", color: "var(--ink-soft)", lineHeight: 1.5 }}>{point}</span>
                  </div>
                ))}
              </div>

              <Link to="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold self-start group"
                style={{ color: "var(--cobalt)" }}>
                Read our full story
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1.5"><ArrowRight size={14} /></span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FOUNDER QUOTE — handwritten feel, warm
         ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "var(--cobalt-deep)", padding: "clamp(60px, 8vw, 100px) 0" }}>
        {/* Background texture — subtle diagonal lines */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.5) 0, rgba(255,255,255,0.5) 1px, transparent 0, transparent 50%)", backgroundSize: "24px 24px" }} />

        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            {/* Oversized amber quote */}
            <div className="font-fraunces select-none leading-none mb-4" aria-hidden
              style={{ fontSize: "clamp(5rem, 12vw, 9rem)", color: "var(--amber)", opacity: 0.1, lineHeight: 0.8, marginLeft: "-0.1em" }}>"</div>

            <blockquote className="relative font-fraunces italic leading-[1.65] mb-10"
              style={{ fontSize: "clamp(1.2rem, 2.4vw, 1.65rem)", color: "rgba(255,255,255,0.88)" }}>
              {settings.founder_quote || "Education is not a privilege — it is a right. We built this school to prove it."}
            </blockquote>

            <div className="flex items-center gap-5">
              <div className="w-12 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg, var(--amber), transparent)" }} />
              <div>
                <p className="font-semibold text-white text-sm">Altamash Daudi</p>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.38)", marginTop: "2px" }}>Founder & Director, Daudi International School</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          ACADEMICS — clean, spacious, not card-griddy
         ═══════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left — heading */}
            <motion.div {...fadeUp(0)} className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px" style={{ backgroundColor: "var(--amber)" }} />
                <span className="label-stamp text-cobalt">Curriculum</span>
              </div>
              <h2 className="font-inter font-bold leading-tight mb-6"
                style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)", color: "var(--ink)", letterSpacing: "-0.025em" }}>
                Nursery to Class X,<br />
                <span style={{ color: "var(--cobalt)" }}>taught in English.</span>
              </h2>
              <p style={{ fontSize: "1rem", color: "var(--ink-muted)", lineHeight: 1.85, maxWidth: "380px", marginBottom: "32px" }}>
                Small classes, dedicated teachers, a curriculum that builds thinkers — not just exam-passers.
              </p>
              <Link to="/academics"
                className="inline-flex items-center gap-2 text-sm font-semibold group"
                style={{ color: "var(--cobalt)" }}>
                Explore the full curriculum
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1.5"><ArrowRight size={14} /></span>
              </Link>
            </motion.div>

            {/* Right — programme list, editorial style */}
            <div className="lg:col-span-7">
              {[
                { num: "01", label: "Montessori & Nursery", sub: "Ages 3–5 · Play-based foundational learning", accent: true },
                { num: "02", label: "Primary School", sub: "Class I – V · Core subjects, English immersion" },
                { num: "03", label: "Middle School", sub: "Class VI – VIII · Critical thinking & STEM focus" },
                { num: "04", label: "Secondary", sub: "Class IX – X · Board preparation & career readiness" },
              ].map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-6 py-6 group cursor-default"
                  style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                  <span className="font-fraunces font-bold shrink-0 mt-0.5 transition-colors duration-200 group-hover:text-amber"
                    style={{ fontSize: "0.8rem", color: item.accent ? "var(--amber)" : "rgba(0,0,0,0.2)", letterSpacing: "0.05em" }}>
                    {item.num}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-semibold transition-colors duration-200 group-hover:text-cobalt"
                      style={{ fontSize: "1.05rem", color: "var(--ink)", marginBottom: "4px" }}>
                      {item.label}
                    </h3>
                    <p style={{ fontSize: "13px", color: "var(--ink-muted)" }}>{item.sub}</p>
                  </div>
                  <span className="self-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ArrowRight size={16} style={{ color: "var(--cobalt)" }} />
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          VISUAL INTERLUDE — full bleed campus photos
         ═══════════════════════════════════════════════════ */}
      <section className="overflow-hidden" style={{ backgroundColor: "var(--ink)" }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex gap-1"
          style={{ height: "clamp(200px, 35vw, 420px)" }}
        >
          {[
            { src: "https://images.unsplash.com/photo-1719159381916-062fa9f435a6?w=800&q=85", flex: 2 },
            { src: "https://images.unsplash.com/photo-1709290749293-c6152a187b14?w=600&q=80", flex: 1 },
            { src: "https://images.unsplash.com/photo-1636772523547-5577d04e8dc1?w=600&q=80", flex: 1 },
            { src: "https://images.unsplash.com/photo-1573894999291-f440466112cc?w=600&q=80", flex: 1 },
          ].map((img, i) => (
            <div key={i} className="overflow-hidden relative group" style={{ flex: img.flex }}>
              <img src={img.src} alt=""
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: "center" }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(to top, rgba(14,31,82,0.5), transparent)" }} />
            </div>
          ))}
        </motion.div>

        {/* Caption */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-5 flex items-center justify-between">
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>Campus life at Daudi International School, Muzaffarpur</p>
          <Link to="/gallery"
            className="inline-flex items-center gap-1.5 text-xs font-semibold group transition-colors duration-150"
            style={{ color: "var(--amber)" }}>
            View full gallery <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-150" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          EVENTS — timeline feel, not a card deck
         ═══════════════════════════════════════════════════ */}
      {upcomingEvents.length > 0 && (
        <section className="py-24 sm:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="flex items-end justify-between mb-12 gap-4">
              <motion.div {...fadeUp(0)}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-px" style={{ backgroundColor: "var(--amber)" }} />
                  <span className="label-stamp text-cobalt">What's coming up</span>
                </div>
                <h2 className="font-inter font-bold tracking-tight"
                  style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)", color: "var(--ink)", letterSpacing: "-0.025em" }}>
                  School Calendar
                </h2>
              </motion.div>
              <Link to="/events"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium group shrink-0 pb-1"
                style={{ color: "var(--cobalt)", borderBottom: "1px solid rgba(26,53,128,0.2)" }}>
                All events <ArrowRight size={13} className="transition-transform duration-150 group-hover:translate-x-1" />
              </Link>
            </div>

            <div>
              {upcomingEvents.slice(0, 4).map((ev, i) => (
                <motion.div key={ev.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="flex items-start gap-6 sm:gap-10 py-6 border-b group cursor-default"
                  style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <div className="shrink-0 w-12 text-right">
                    <span className="font-fraunces font-bold block" style={{ fontSize: "1.6rem", color: "var(--amber)", lineHeight: 1, letterSpacing: "-0.02em" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "5px" }}>
                      {ev.category} · {ev.date}
                    </p>
                    <h3 className="font-semibold transition-colors duration-150 group-hover:text-cobalt leading-snug"
                      style={{ fontSize: "1rem", color: "var(--ink)" }}>
                      {ev.title}
                    </h3>
                    {ev.description && (
                      <p className="mt-1.5 line-clamp-1" style={{ fontSize: "0.875rem", color: "var(--ink-muted)" }}>
                        {ev.description}
                      </p>
                    )}
                  </div>
                  {ev.location && (
                    <p className="hidden sm:flex items-center gap-1.5 shrink-0 text-xs" style={{ color: "var(--ink-muted)", paddingTop: "4px" }}>
                      <MapPin size={11} style={{ color: "var(--amber)" }} />
                      {ev.location}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-6 sm:hidden">
              <Link to="/events" className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: "var(--cobalt)" }}>
                View all events <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Local presence — info strip */}
      <section style={{ backgroundColor: "var(--cobalt-deep)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-5">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <MapPin size={12} style={{ color: "var(--amber)", opacity: 0.85 }} />
              <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                Shafi Manzil, Motijheel, <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>Muzaffarpur</strong>, Bihar 842001
              </span>
            </div>
            <div className="hidden sm:block w-px h-4" style={{ backgroundColor: "rgba(255,255,255,0.09)" }} />
            <div className="flex items-center gap-2">
              <Phone size={12} style={{ color: "var(--amber)", opacity: 0.85 }} />
              <a href="tel:+916212243314" className="text-xs font-medium transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }}>
                +91 621 224 3314
              </a>
            </div>
            <div className="hidden sm:block w-px h-4" style={{ backgroundColor: "rgba(255,255,255,0.09)" }} />
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>Mon – Sat · 8:00 AM – 3:00 PM</span>
            <div className="hidden sm:block w-px h-4" style={{ backgroundColor: "rgba(255,255,255,0.09)" }} />
            <a href="https://www.google.com/maps/search/Daudi+International+School+Muzaffarpur"
              target="_blank" rel="noopener noreferrer"
              className="text-xs font-semibold px-4 py-1.5 rounded-lg transition-opacity hover:opacity-80"
              style={{ backgroundColor: "rgba(232,168,32,0.12)", color: "var(--amber)", border: "1px solid rgba(232,168,32,0.25)" }}>
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

      {/* ═══════════════════════════════════════════════════
          CTA — warm, personal, inviting
         ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 sm:py-28" style={{ backgroundColor: "var(--cream)" }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(var(--cobalt) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
          <motion.div {...fadeUp(0)}>
            <p className="label-stamp text-cobalt mb-5">Join the DIS family</p>
            <h2 className="font-inter font-bold tracking-tight leading-tight mb-5"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "var(--ink)", letterSpacing: "-0.025em" }}>
              Admissions open for 2026–27.<br />
              <span style={{ color: "var(--cobalt)" }}>We'd love to meet your family.</span>
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--ink-muted)", maxWidth: "460px", margin: "0 auto 40px", lineHeight: 1.8 }}>
              Visit the campus, meet the teachers, and see for yourself what makes DIS different.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/admissions"
                className="inline-flex items-center gap-2.5 px-8 py-4 text-sm font-semibold rounded-xl transition-all duration-200 hover:brightness-105 active:scale-[0.97]"
                style={{ backgroundColor: "var(--cobalt-deep)", color: "#fff" }}>
                Apply now
                <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium rounded-xl transition-all duration-200 border"
                style={{ borderColor: "rgba(0,0,0,0.12)", color: "var(--ink-soft)", backgroundColor: "white" }}>
                Contact us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Users, Award, Heart, Star, Globe, Trophy, ArrowRight, GraduationCap, MapPin, Phone } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import TestimonialsSection from "../components/home/TestimonialsSection";
import FAQSection from "../components/home/FAQSection";
import TrustSignals from "../components/home/TrustSignals";
import { useSettings, useStats, useEvents } from "../lib/useSchoolData";
import { useIsMobile } from "../hooks/useIsMobile";

const ICON_MAP = { BookOpen, Users, Award, Heart, Star, Globe, Trophy, GraduationCap };

// On desktop only — framer-motion fade up
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-30px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

// Wrapper: on mobile render a plain div; on desktop use motion.div
function Reveal({ mobile, children, className, style, ...motionProps }) {
  if (mobile) return <div className={className} style={style}>{children}</div>;
  return <motion.div className={className} style={style} {...motionProps}>{children}</motion.div>;
}

export default function Home() {
  const { settings } = useSettings();
  const { stats } = useStats();
  const { events: upcomingEvents } = useEvents("upcoming");
  const isMobile = useIsMobile();

  return (
    <div id="main-content" className="min-h-screen bg-white" style={{ fontFamily: "var(--font-inter)" }}>
      <SEOHead
        title="Best School in Muzaffarpur | English Medium Education"
        description="Daudi International School — one of the best English-medium schools in Muzaffarpur, Bihar. Non-profit, Nursery to Class X, quality education under Daudi Welfare Trust. Admissions open 2026–27."
        canonical="https://daudischool.in/"
      />
      <Navbar />

      {/* ═══════════════════════════════════════════════════
          HERO — mobile: pure CSS, no image, no animations
         ═══════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: isMobile ? "100svh" : "100svh",
          backgroundColor: "var(--cobalt-deep)",
        }}
      >
        {/* Background image — desktop only (LCP killer on mobile) */}
        {!isMobile && (
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1709290749293-c6152a187b14?w=1200&q=75&fm=webp"
              alt=""
              className="w-full h-full object-cover"
              style={{ objectPosition: "center 20%", opacity: 0.18 }}
              fetchpriority="high"
              decoding="async"
              width="1200"
              height="800"
            />
          </div>
        )}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: isMobile
              ? "linear-gradient(160deg, #0e1f52 0%, #1a3580 100%)"
              : "linear-gradient(135deg, rgba(14,31,82,0.97) 0%, rgba(14,31,82,0.75) 50%, rgba(26,53,128,0.5) 100%)",
          }}
        />

        {/* Noise texture — desktop only (SVG is extra parse cost on mobile) */}
        {!isMobile && (
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
          />
        )}

        {/* Amber top line */}
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, transparent 0%, var(--amber) 30%, var(--amber-light) 60%, transparent 100%)" }} />

        <div
          style={{ minHeight: isMobile ? "100svh" : "100svh", paddingTop: isMobile ? "80px" : "90px", paddingBottom: isMobile ? "48px" : "80px" }}
          className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 flex flex-col lg:flex-row lg:items-center lg:gap-20"
        >
          {/* Left — text content */}
          <div className="flex-1 flex flex-col justify-center">

            {/* Eyebrow chip — static on mobile */}
            <div
              className="inline-flex items-center gap-2.5 self-start mb-6 sm:mb-8"
              style={{ border: "1px solid rgba(232,168,32,0.3)", borderRadius: "100px", padding: "6px 14px 6px 8px", backgroundColor: "rgba(232,168,32,0.07)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "var(--amber)" }} />
              <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(232,168,32,0.9)" }}>
                Muzaffarpur · Est. 2004 · Non-profit
              </span>
            </div>

            {/* Headline — static on mobile */}
            <h1
              style={{ lineHeight: 1.06, letterSpacing: "-0.03em", marginBottom: isMobile ? "20px" : "28px" }}
            >
              <span className="block text-white font-inter font-bold" style={{ fontSize: isMobile ? "2.4rem" : "clamp(2.6rem, 5.5vw, 4.4rem)" }}>
                Where every child
              </span>
              <span className="block font-fraunces italic" style={{ fontSize: isMobile ? "2.6rem" : "clamp(2.8rem, 6vw, 4.9rem)", color: "var(--amber-light)", lineHeight: 1.1 }}>
                deserves to learn.
              </span>
            </h1>

            <p
              style={{ fontSize: isMobile ? "0.95rem" : "clamp(1rem, 1.6vw, 1.1rem)", color: "rgba(255,255,255,0.52)", lineHeight: 1.85, maxWidth: "480px", marginBottom: isMobile ? "28px" : "40px" }}
            >
              {settings.hero_description || "A non-profit, English-medium school under the Daudi Welfare Trust — quality education for every child in Muzaffarpur, regardless of background."}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/admissions"
                className="inline-flex items-center gap-2.5 px-6 py-3 sm:px-7 sm:py-3.5 text-sm font-semibold rounded-xl"
                style={{ backgroundColor: "var(--amber)", color: "var(--cobalt-deep)", letterSpacing: "0.01em" }}>
                Apply for admission
                <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
              <Link to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 text-sm font-medium rounded-xl"
                style={{ border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.7)" }}>
                Our story
              </Link>
            </div>

            {/* Social proof — mobile: text only, no avatar images */}
            <div className="flex items-center gap-4 mt-8 sm:mt-10">
              {!isMobile && (
                <div className="flex -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1606155566195-cc12e2b4dfe3?w=60&h=60&fit=crop&fm=webp",
                    "https://images.unsplash.com/photo-1595152772835-219674b2a163?w=60&h=60&fit=crop&fm=webp",
                    "https://images.unsplash.com/photo-1588072432836-e10032774350?w=60&h=60&fit=crop&fm=webp",
                  ].map((src, i) => (
                    <img key={i} src={src} alt="DIS parent" width="32" height="32" loading="lazy" decoding="async"
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-cobalt-deep" />
                  ))}
                </div>
              )}
              <div>
                <div className="flex gap-px mb-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} size={11} fill="var(--amber)" style={{ color: "var(--amber)" }} />)}
                </div>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                  Trusted by <strong style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>1,000+ families</strong> in Muzaffarpur
                </p>
              </div>
            </div>
          </div>

          {/* Logo — desktop only */}
          {!isMobile && (
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
          )}
        </div>

        {/* Scroll cue — desktop only */}
        {!isMobile && (
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
        )}
      </section>

      {/* ═══════════════════════════════════════════════════
          STATS
         ═══════════════════════════════════════════════════ */}
      {stats.length > 0 && (
        <section style={{ backgroundColor: "var(--ink)", overflow: "hidden" }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="grid grid-cols-2 sm:flex sm:overflow-x-auto" style={{ scrollSnapType: "x mandatory" }}>
              {stats.slice(0, 4).map((s, i) => {
                const Icon = ICON_MAP[s.icon] || Star;
                return (
                  <div key={s.id}
                    className="flex flex-col justify-center px-5 sm:px-7 py-7 sm:py-8 sm:flex-1 sm:min-w-[160px] relative"
                    style={{
                      borderRight: (!isMobile && i < 3) ? "1px solid rgba(255,255,255,0.06)" : "none",
                      borderBottom: isMobile && i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                      scrollSnapAlign: "start",
                    }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={14} strokeWidth={1.75} style={{ color: "var(--amber)", opacity: 0.85 }} />
                    </div>
                    <div className="font-fraunces font-bold text-white" style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)", lineHeight: 1, letterSpacing: "-0.02em" }}>{s.value}</div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", marginTop: "6px", fontWeight: 500 }}>{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          ABOUT
         ═══════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 lg:py-36 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">

            {/* Image — mobile: simple, no float cards, no shadow images */}
            <Reveal
              mobile={isMobile}
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 relative"
              style={{ paddingBottom: isMobile ? "0" : "40px" }}
            >
              <div className="relative rounded-2xl overflow-hidden"
                style={{ height: isMobile ? "220px" : "clamp(300px, 40vw, 500px)", boxShadow: isMobile ? "none" : undefined }}>
                <img
                  src={isMobile
                    ? "https://images.unsplash.com/photo-1573894999291-f440466112cc?w=480&q=65&fm=webp"
                    : "https://images.unsplash.com/photo-1573894999291-f440466112cc?w=700&q=75&fm=webp"}
                  alt="Students learning at Daudi International School Muzaffarpur"
                  loading="lazy"
                  decoding="async"
                  width={isMobile ? 480 : 700}
                  height={isMobile ? 300 : 500}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 30%" }}
                />
              </div>

              {/* Floating stat card — desktop only */}
              {!isMobile && (
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
              )}

              {/* Accent image — desktop only */}
              {!isMobile && (
                <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-xl overflow-hidden hidden sm:block shadow-lg"
                  style={{ border: "3px solid white" }}>
                  <img
                    src="https://images.unsplash.com/photo-1636772523547-5577d04e8dc1?w=200&q=65&fm=webp"
                    alt="DIS school activity"
                    loading="lazy"
                    decoding="async"
                    width="96" height="96"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </Reveal>

            {/* Text column */}
            <Reveal
              mobile={isMobile}
              {...fadeUp(0.12)}
              className="lg:col-span-6 lg:col-start-7 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-px" style={{ backgroundColor: "var(--amber)" }} />
                <span className="label-stamp text-cobalt">Who we are</span>
              </div>

              <h2 className="font-inter font-bold tracking-tight leading-[1.1] mb-5"
                style={{ fontSize: isMobile ? "1.7rem" : "clamp(2rem, 3.5vw, 3rem)", color: "var(--ink)", letterSpacing: "-0.025em" }}>
                A school built on<br />
                <span style={{ color: "var(--cobalt)" }}>trust, not profit.</span>
              </h2>

              <p style={{ fontSize: "1rem", color: "var(--ink-soft)", lineHeight: 1.8, marginBottom: "8px" }}>
                Founded in 2004 under the Daudi Welfare Trust — DIS exists to prove that quality English-medium education in Muzaffarpur doesn't have to be a privilege.
              </p>
              <p style={{ fontSize: "0.9rem", color: "var(--ink-muted)", lineHeight: 1.8, marginBottom: "28px" }}>
                We're non-profit by design. Every rupee goes back into classrooms, teachers, and the futures of the students we serve.
              </p>

              <div className="space-y-0 mb-8" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                {["English-medium instruction, Nursery to Class X", "Scholarships for underprivileged students", "Dedicated mentors, not just instructors"].map((point, i) => (
                  <div key={i} className="flex items-center gap-4 py-3.5"
                    style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                    <span className="font-fraunces font-bold text-xs shrink-0" style={{ color: "var(--amber)", minWidth: "20px" }}>0{i+1}</span>
                    <span style={{ fontSize: "14px", color: "var(--ink-soft)", lineHeight: 1.5 }}>{point}</span>
                  </div>
                ))}
              </div>

              <Link to="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold self-start"
                style={{ color: "var(--cobalt)" }}>
                Read our full story
                <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FOUNDER QUOTE
         ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "var(--cobalt-deep)", padding: "clamp(48px, 8vw, 100px) 0" }}>
        {/* Background pattern — desktop only */}
        {!isMobile && (
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.5) 0, rgba(255,255,255,0.5) 1px, transparent 0, transparent 50%)", backgroundSize: "24px 24px" }} />
        )}
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
          <div>
            <div className="font-fraunces select-none leading-none mb-4" aria-hidden
              style={{ fontSize: isMobile ? "4rem" : "clamp(5rem, 12vw, 9rem)", color: "var(--amber)", opacity: 0.1, lineHeight: 0.8, marginLeft: "-0.1em" }}>"</div>

            <blockquote className="relative font-fraunces italic leading-[1.65] mb-8"
              style={{ fontSize: isMobile ? "1.15rem" : "clamp(1.2rem, 2.4vw, 1.65rem)", color: "rgba(255,255,255,0.88)" }}>
              {settings.founder_quote || "Education is not a privilege — it is a right. We built this school to prove it."}
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-10 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg, var(--amber), transparent)" }} />
              <div>
                <p className="font-semibold text-white text-sm">Altamash Daudi</p>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.38)", marginTop: "2px" }}>Founder & Director, Daudi International School</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          ACADEMICS
         ═══════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 lg:py-32" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <Reveal mobile={isMobile} {...fadeUp(0)} className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-px" style={{ backgroundColor: "var(--amber)" }} />
                <span className="label-stamp text-cobalt">Curriculum</span>
              </div>
              <h2 className="font-inter font-bold leading-tight mb-5"
                style={{ fontSize: isMobile ? "1.7rem" : "clamp(1.9rem, 3.5vw, 2.9rem)", color: "var(--ink)", letterSpacing: "-0.025em" }}>
                Nursery to Class X,<br />
                <span style={{ color: "var(--cobalt)" }}>taught in English.</span>
              </h2>
              <p style={{ fontSize: "0.95rem", color: "var(--ink-muted)", lineHeight: 1.8, maxWidth: "380px", marginBottom: "28px" }}>
                Small classes, dedicated teachers, a curriculum that builds thinkers — not just exam-passers.
              </p>
              <Link to="/academics"
                className="inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: "var(--cobalt)" }}>
                Explore the full curriculum
                <ArrowRight size={14} />
              </Link>
            </Reveal>

            <div className="lg:col-span-7">
              {[
                { num: "01", label: "Montessori & Nursery", sub: "Ages 3–5 · Play-based foundational learning", accent: true },
                { num: "02", label: "Primary School", sub: "Class I – V · Core subjects, English immersion" },
                { num: "03", label: "Middle School", sub: "Class VI – VIII · Critical thinking & STEM focus" },
                { num: "04", label: "Secondary", sub: "Class IX – X · Board preparation & career readiness" },
              ].map((item, i) => (
                <div key={i}
                  className="flex items-start gap-5 py-5"
                  style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                  <span className="font-fraunces font-bold shrink-0 mt-0.5"
                    style={{ fontSize: "0.8rem", color: item.accent ? "var(--amber)" : "rgba(0,0,0,0.2)", letterSpacing: "0.05em" }}>
                    {item.num}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-semibold" style={{ fontSize: "1rem", color: "var(--ink)", marginBottom: "3px" }}>{item.label}</h3>
                    <p style={{ fontSize: "13px", color: "var(--ink-muted)" }}>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          VISUAL INTERLUDE — mobile: single image, desktop: 4 panels
         ═══════════════════════════════════════════════════ */}
      <section className="overflow-hidden" style={{ backgroundColor: "var(--ink)" }}>
        {isMobile ? (
          <div style={{ height: "180px", position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1719159381916-062fa9f435a6?w=480&q=65&fm=webp"
              alt="Campus life at Daudi International School, Muzaffarpur"
              loading="lazy"
              decoding="async"
              width="480" height="180"
              className="w-full h-full object-cover"
              style={{ objectPosition: "center" }}
            />
          </div>
        ) : (
          <div className="flex gap-1" style={{ height: "clamp(200px, 35vw, 420px)" }}>
            {[
              { src: "https://images.unsplash.com/photo-1719159381916-062fa9f435a6?w=700&q=75&fm=webp", flex: 2 },
              { src: "https://images.unsplash.com/photo-1709290749293-c6152a187b14?w=500&q=70&fm=webp", flex: 1 },
              { src: "https://images.unsplash.com/photo-1636772523547-5577d04e8dc1?w=500&q=70&fm=webp", flex: 1 },
              { src: "https://images.unsplash.com/photo-1573894999291-f440466112cc?w=500&q=70&fm=webp", flex: 1 },
            ].map((img, i) => (
              <div key={i} className="overflow-hidden relative group" style={{ flex: img.flex }}>
                <img src={img.src} alt=""
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: "center" }} />
              </div>
            ))}
          </div>
        )}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-4 flex items-center justify-between">
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>Campus life at DIS, Muzaffarpur</p>
          <Link to="/gallery"
            className="inline-flex items-center gap-1.5 text-xs font-semibold"
            style={{ color: "var(--amber)" }}>
            View gallery <ArrowRight size={12} />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          EVENTS
         ═══════════════════════════════════════════════════ */}
      {upcomingEvents.length > 0 && (
        <section className="py-16 sm:py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="flex items-end justify-between mb-8 sm:mb-12 gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-px" style={{ backgroundColor: "var(--amber)" }} />
                  <span className="label-stamp text-cobalt">What's coming up</span>
                </div>
                <h2 className="font-inter font-bold tracking-tight"
                  style={{ fontSize: isMobile ? "1.6rem" : "clamp(1.6rem, 3vw, 2.5rem)", color: "var(--ink)", letterSpacing: "-0.025em" }}>
                  School Calendar
                </h2>
              </div>
              <Link to="/events"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium shrink-0 pb-1"
                style={{ color: "var(--cobalt)", borderBottom: "1px solid rgba(26,53,128,0.2)" }}>
                All events <ArrowRight size={13} />
              </Link>
            </div>

            <div>
              {upcomingEvents.slice(0, isMobile ? 3 : 4).map((ev, i) => (
                <div key={ev.id}
                  className="flex items-start gap-5 sm:gap-10 py-5 border-b"
                  style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <div className="shrink-0 w-10 text-right">
                    <span className="font-fraunces font-bold block" style={{ fontSize: "1.4rem", color: "var(--amber)", lineHeight: 1, letterSpacing: "-0.02em" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>
                      {ev.category} · {ev.date}
                    </p>
                    <h3 className="font-semibold leading-snug" style={{ fontSize: "0.95rem", color: "var(--ink)" }}>{ev.title}</h3>
                    {ev.description && !isMobile && (
                      <p className="mt-1 line-clamp-1" style={{ fontSize: "0.875rem", color: "var(--ink-muted)" }}>{ev.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link to="/events" className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: "var(--cobalt)" }}>
                View all events <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Local presence strip */}
      <section style={{ backgroundColor: "var(--cobalt-deep)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <MapPin size={12} style={{ color: "var(--amber)", opacity: 0.85 }} />
              <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                Motijheel, <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>Muzaffarpur</strong>, Bihar 842001
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={12} style={{ color: "var(--amber)", opacity: 0.85 }} />
              <a href="tel:+916212243314" className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                +91 621 224 3314
              </a>
            </div>
            <a href="https://www.google.com/maps/search/Daudi+International+School+Muzaffarpur"
              target="_blank" rel="noopener noreferrer"
              className="text-xs font-semibold px-4 py-1.5 rounded-lg"
              style={{ backgroundColor: "rgba(232,168,32,0.12)", color: "var(--amber)", border: "1px solid rgba(232,168,32,0.25)" }}>
              Get Directions →
            </a>
          </div>
        </div>
      </section>

      <div className="cv-auto"><TrustSignals /></div>
      <div className="cv-auto"><TestimonialsSection /></div>
      <div className="cv-auto"><FAQSection /></div>

      {/* ═══════════════════════════════════════════════════
          CTA
         ═══════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 lg:py-28" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
          <p className="label-stamp text-cobalt mb-4">Join the DIS family</p>
          <h2 className="font-inter font-bold tracking-tight leading-tight mb-4"
            style={{ fontSize: isMobile ? "1.7rem" : "clamp(1.8rem, 3.5vw, 2.8rem)", color: "var(--ink)", letterSpacing: "-0.025em" }}>
            Admissions open for 2026–27.<br />
            <span style={{ color: "var(--cobalt)" }}>We'd love to meet your family.</span>
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--ink-muted)", maxWidth: "460px", margin: "0 auto 32px", lineHeight: 1.8 }}>
            Visit the campus, meet the teachers, and see for yourself what makes DIS different.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/admissions"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold rounded-xl"
              style={{ backgroundColor: "var(--cobalt-deep)", color: "#fff" }}>
              Apply now <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium rounded-xl border"
              style={{ borderColor: "rgba(0,0,0,0.12)", color: "var(--ink-soft)", backgroundColor: "white" }}>
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
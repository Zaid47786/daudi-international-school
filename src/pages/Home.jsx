import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, BookOpen, CalendarDays, Check, Compass, Heart, MapPin, Phone, Sparkles, Users } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { useSettings, useStats, useEvents } from "../lib/useSchoolData";

const TestimonialsSection = lazy(() => import("../components/home/TestimonialsSection"));
const FAQSection = lazy(() => import("../components/home/FAQSection"));
const TrustSignals = lazy(() => import("../components/home/TrustSignals"));

const campusImages = {
  hero: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1400&q=82&fm=webp",
  learning: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1000&q=82&fm=webp",
  activity: "https://images.unsplash.com/photo-1636772523547-5577d04e8dc1?w=900&q=80&fm=webp",
  books: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=900&q=80&fm=webp",
};

const reveal = (delay = 0, distance = 22) => ({
  initial: { opacity: 0, y: distance },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

const stagger = {
  initial: {},
  whileInView: {},
  viewport: { once: true, margin: "-60px" },
};

export default function Home() {
  const { settings } = useSettings();
  const { stats } = useStats();
  const { events: upcomingEvents } = useEvents("upcoming");

  return (
    <div className="min-h-screen bg-[#f6f1e8] text-[#17253a]" style={{ fontFamily: "var(--font-inter)" }}>
      <SEOHead
        title="Best School in Muzaffarpur | English Medium Education"
        description="Daudi International School — one of the best English-medium schools in Muzaffarpur, Bihar. Non-profit, Nursery to Class X, quality education under Daudi Welfare Trust. Admissions open 2026–27."
        canonical="https://daudischool.in/"
      />
      <Navbar />

      <main>
        <section className="relative overflow-hidden pt-28 sm:pt-36 pb-12 sm:pb-20 bg-[#f6f1e8]">
          <div className="absolute inset-0 site-grid opacity-50" aria-hidden="true" />
          <div className="absolute -top-36 -right-28 h-96 w-96 rounded-full bg-[#f4b45b]/20 blur-3xl" aria-hidden="true" />
          <div className="absolute left-1/2 top-44 h-2 w-2 rounded-full bg-[#e2a343] shadow-[0_0_0_9px_rgba(226,163,67,.12)]" aria-hidden="true" />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-[.85fr_1.15fr] gap-12 lg:gap-20 items-center">
            <motion.div {...reveal(0)}>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1b385b]/15 bg-white/60 px-3 py-2 text-[10px] font-bold tracking-[.2em] uppercase text-[#1b385b] shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#e5a33e] animate-pulse" /> Daudi Welfare Trust · Est. 2004
              </div>
              <h1 className="mt-7 max-w-xl text-[clamp(3.2rem,7vw,6.8rem)] font-semibold leading-[.92] tracking-[-.07em] text-[#17253a]">
                Learning should feel <span className="font-fraunces italic text-[#1f5a83]">possible.</span>
              </h1>
              <p className="mt-7 max-w-lg text-base sm:text-lg leading-8 text-[#526175]">
                {settings.hero_description || "A non-profit, English-medium school where every child gets room to ask, explore, and grow."}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link to="/admissions" className="group inline-flex items-center gap-3 rounded-full bg-[#173b66] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(23,59,102,.2)] transition hover:-translate-y-1 hover:bg-[#1e4d80]">
                  Start an application <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link to="/about" className="group inline-flex items-center gap-2 rounded-full border border-[#173b66]/20 bg-white/40 px-5 py-3.5 text-sm font-semibold text-[#173b66] transition hover:bg-white">
                  Meet the school <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs font-medium text-[#69788a]">
                <span className="inline-flex items-center gap-2"><Check size={14} className="text-[#e09c2e]" /> Nursery to Class X</span>
                <span className="inline-flex items-center gap-2"><Check size={14} className="text-[#e09c2e]" /> Scholarships available</span>
              </div>
            </motion.div>

            <motion.div {...reveal(.12, 34)} className="relative min-h-[430px] sm:min-h-[560px]">
              <div className="absolute right-0 top-0 h-[88%] w-[86%] overflow-hidden rounded-[42%_12%_12%_12%/18%_12%_12%_12%] bg-[#173b66] shadow-[0_30px_70px_rgba(23,59,102,.22)]">
                <img src={campusImages.hero} alt="Students learning together at Daudi International School" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#173b66]/65 via-transparent to-[#173b66]/5" />
                <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between text-white"><div><p className="text-[10px] font-bold tracking-[.2em] uppercase text-white/60">The DIS way</p><p className="mt-2 max-w-xs text-2xl font-semibold leading-tight">A small school with a wide horizon.</p></div><span className="rounded-full border border-white/30 px-3 py-2 text-xs">01 / 04</span></div>
              </div>
              <div className="absolute bottom-3 left-0 w-40 rounded-3xl bg-white p-4 shadow-[0_18px_45px_rgba(32,47,66,.14)] sm:w-48 sm:p-5">
                <div className="flex items-center justify-between"><span className="text-[10px] font-bold tracking-[.16em] text-[#8793a3] uppercase">School pulse</span><Sparkles size={15} className="text-[#e1a03b]" /></div>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-[#173b66]">20<span className="text-[#e1a03b">+</span></p><p className="text-xs leading-5 text-[#718095]">years of learning, service, and community</p>
              </div>
              <div className="absolute right-[-8px] top-20 hidden h-32 w-32 items-center justify-center rounded-full bg-[#e4a13d] text-center text-[#173b66] shadow-[0_16px_40px_rgba(226,163,67,.3)] sm:flex"><div><p className="font-fraunces text-3xl font-bold leading-none">1000+</p><p className="mt-1 text-[9px] font-bold tracking-[.14em] uppercase">families</p></div></div>
              <div className="absolute left-6 top-24 hidden h-14 w-14 rotate-[-14deg] items-center justify-center rounded-2xl border border-white bg-[#f2cf8d] text-[#173b66] shadow-lg sm:flex"><Heart size={22} fill="currentColor" /></div>
            </motion.div>
          </div>

          <div className="relative mt-10 border-y border-[#173b66]/10 bg-white/35">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12"><p className="text-xs font-semibold uppercase tracking-[.18em] text-[#5a6a7e]">Admissions open · 2026–27</p><div className="flex flex-wrap items-center gap-5 text-xs text-[#718095]"><span className="inline-flex items-center gap-2"><MapPin size={14} className="text-[#df9e38]" /> Motijheel, Muzaffarpur</span><span className="hidden sm:inline-flex items-center gap-2"><Phone size={14} className="text-[#df9e38]" /> +91 621 224 3314</span><Link to="/contact" className="font-bold text-[#173b66] hover:underline">Plan a visit →</Link></div></div>
          </div>
        </section>

        {stats.length > 0 && <section className="bg-[#173b66] text-white overflow-hidden"><div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-5 flex items-center gap-8"><div className="hidden shrink-0 items-center gap-2 md:flex"><span className="h-2 w-2 rounded-full bg-[#e4a13d]" /><span className="text-[10px] font-bold tracking-[.18em] uppercase text-white/55">By the numbers</span></div><div className="flex w-full divide-x divide-white/15 overflow-x-auto">{stats.slice(0, 4).map((stat) => <div key={stat.id} className="min-w-[145px] flex-1 px-5 first:pl-0"><p className="font-fraunces text-2xl font-bold text-[#f2c46e]">{stat.value}</p><p className="mt-1 text-[11px] font-medium text-white/50">{stat.label}</p></div>)}</div></div></section>}

        <section className="bg-[#f6f1e8] py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <motion.div {...reveal()} className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><p className="site-kicker">More than a classroom</p><h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-[.98] tracking-[-.05em] text-[#173b66] sm:text-6xl">A place to become<br /><span className="font-fraunces italic text-[#d68f2d]">curious and capable.</span></h2></div><p className="max-w-sm text-sm leading-7 text-[#68778a]">Our job is not only to prepare children for the next exam. It is to help them build the confidence to meet the next chapter.</p></motion.div>
            <motion.div {...stagger} className="mt-14 grid gap-4 lg:grid-cols-12 lg:grid-rows-2">
              <motion.div {...reveal(.05)} className="group relative min-h-[360px] overflow-hidden rounded-[30px] bg-[#173b66] lg:col-span-7 lg:row-span-2"><img src={campusImages.learning} alt="Students collaborating in a bright classroom" className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#173b66] via-[#173b66]/10 to-transparent" /><div className="absolute bottom-0 p-7 sm:p-9 text-white"><p className="text-[10px] font-bold tracking-[.18em] text-[#f2c46e] uppercase">01 · Learning</p><h3 className="mt-3 max-w-md text-3xl font-semibold leading-tight">Strong foundations. Braver questions.</h3><Link to="/academics" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white">Explore academics <ArrowRight size={15} /></Link></div></motion.div>
              <motion.div {...reveal(.12)} className="relative overflow-hidden rounded-[30px] bg-[#e4a13d] p-7 sm:p-8 lg:col-span-5"><div className="absolute right-[-20px] top-[-20px] h-32 w-32 rounded-full border border-[#173b66]/15" /><Users size={28} className="text-[#173b66]" /><h3 className="mt-12 max-w-xs text-2xl font-semibold leading-tight text-[#173b66]">Teachers who know every child by name.</h3><p className="mt-4 max-w-xs text-sm leading-6 text-[#173b66]/65">Small classes make real mentorship possible.</p></motion.div>
              <motion.div {...reveal(.19)} className="relative overflow-hidden rounded-[30px] bg-white p-7 sm:p-8 lg:col-span-5"><div className="flex items-start justify-between"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eaf0f4] text-[#1f5a83]"><Compass size={22} /></div><span className="font-fraunces text-5xl font-bold text-[#e4a13d]/30">02</span></div><h3 className="mt-12 text-2xl font-semibold leading-tight text-[#173b66]">A school rooted in Muzaffarpur.</h3><p className="mt-4 text-sm leading-6 text-[#718095]">Modern opportunity, grounded values, and a community that shows up.</p></motion.div>
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#173b66] py-24 text-white sm:py-32"><div className="absolute right-0 top-0 h-full w-1/2 opacity-20" style={{ backgroundImage: "radial-gradient(#f2c46e 1px, transparent 1px)", backgroundSize: "24px 24px" }} /><div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12"><div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-start"><motion.div {...reveal()}><p className="site-kicker text-[#f2c46e]">A complete journey</p><h2 className="mt-5 max-w-md text-4xl font-semibold leading-[.98] tracking-[-.05em] sm:text-6xl">One campus.<br /><span className="font-fraunces italic text-[#f2c46e]">Every stage.</span></h2><p className="mt-6 max-w-sm text-sm leading-7 text-white/55">From those first letters to the confidence of Class X, children grow in a familiar, supportive environment.</p><Link to="/academics" className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">See the learning path <ArrowRight size={15} /></Link></motion.div><div className="divide-y divide-white/15">{[{ n: "01", title: "Montessori & Nursery", desc: "Ages 3–5 · Learn through play and wonder" }, { n: "02", title: "Primary School", desc: "Class I–V · Foundations, fluency, confidence" }, { n: "03", title: "Middle School", desc: "Class VI–VIII · Think deeper, work together" }, { n: "04", title: "Secondary", desc: "Class IX–X · Purpose, preparation, possibility" }].map((item, i) => <motion.div key={item.n} {...reveal(i * .08)} className="group flex items-center gap-5 py-6"><span className="font-fraunces text-lg text-[#f2c46e]">{item.n}</span><div className="flex-1"><h3 className="text-lg font-semibold text-white transition group-hover:text-[#f2c46e]">{item.title}</h3><p className="mt-1 text-sm text-white/45">{item.desc}</p></div><ArrowUpRight size={18} className="text-white/30 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#f2c46e]" /></motion.div>)}</div></div></div></section>

        <section className="bg-white py-24 sm:py-32"><div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12"><motion.div {...reveal()} className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="site-kicker">Around campus</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] text-[#173b66] sm:text-5xl">The everyday magic.</h2></div><Link to="/gallery" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1f5a83]">Open the gallery <ArrowRight size={15} /></Link></motion.div><div className="mt-12 grid gap-4 sm:grid-cols-12 sm:grid-rows-[230px_170px]"><motion.div {...reveal(.05)} className="group relative overflow-hidden rounded-[28px] sm:col-span-7 sm:row-span-2"><img src={campusImages.activity} alt="Students taking part in a school activity" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#173b66]/70 to-transparent" /><p className="absolute bottom-5 left-6 text-sm font-semibold text-white">A place to participate.</p></motion.div><motion.div {...reveal(.12)} className="group relative overflow-hidden rounded-[28px] sm:col-span-5"><img src={campusImages.books} alt="Books representing curiosity and learning" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-[#173b66]/25" /><p className="absolute bottom-5 left-6 text-sm font-semibold text-white">A place to explore.</p></motion.div><motion.div {...reveal(.19)} className="flex flex-col justify-between rounded-[28px] bg-[#f3eadc] p-6 sm:col-span-5"><div className="flex items-center justify-between"><BookOpen size={22} className="text-[#d68f2d]" /><span className="font-fraunces text-4xl font-bold text-[#173b66]/20">03</span></div><p className="max-w-xs text-lg font-semibold leading-tight text-[#173b66]">Every day adds another layer to who a child can become.</p></motion.div></div></div></section>

        {upcomingEvents.length > 0 && <section className="bg-[#f6f1e8] py-24 sm:py-32"><div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12"><motion.div {...reveal()} className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="site-kicker">Keep in step</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] text-[#173b66] sm:text-5xl">What’s happening at DIS.</h2></div><Link to="/events" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1f5a83]">View all events <ArrowRight size={15} /></Link></motion.div><div className="mt-12 grid gap-4 lg:grid-cols-3">{upcomingEvents.slice(0, 3).map((event, index) => <motion.article key={event.id} {...reveal(index * .09)} className={`rounded-[28px] p-6 sm:p-7 ${index === 0 ? "bg-[#173b66] text-white" : "bg-white text-[#173b66]"}`}><div className="flex items-center justify-between"><span className={`text-[10px] font-bold tracking-[.18em] uppercase ${index === 0 ? "text-[#f2c46e]" : "text-[#d68f2d]"}`}>{event.category || "School event"}</span><CalendarDays size={17} className={index === 0 ? "text-white/50" : "text-[#1f5a83]/50"} /></div><h3 className="mt-16 text-2xl font-semibold leading-tight">{event.title}</h3><p className={`mt-3 text-sm ${index === 0 ? "text-white/55" : "text-[#718095]"}`}>{event.date}{event.time ? ` · ${event.time}` : ""}</p><div className={`mt-7 h-px ${index === 0 ? "bg-white/15" : "bg-[#173b66]/10"}`} /></motion.article>)}</div></div></section>}

        <Suspense fallback={null}><TrustSignals /></Suspense>
        <Suspense fallback={null}><TestimonialsSection /></Suspense>
        <Suspense fallback={null}><FAQSection /></Suspense>

        <section className="relative overflow-hidden bg-[#e4a13d] py-24 sm:py-32"><div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#173b66]/15" /><div className="absolute -bottom-28 left-10 h-72 w-72 rounded-full border border-[#173b66]/10" /><motion.div {...reveal()} className="relative max-w-3xl mx-auto px-5 text-center sm:px-8"><p className="site-kicker text-[#173b66]">Come see it for yourself</p><h2 className="mt-5 text-4xl font-semibold leading-[.98] tracking-[-.05em] text-[#173b66] sm:text-6xl">The next chapter<br /><span className="font-fraunces italic">starts here.</span></h2><p className="mx-auto mt-6 max-w-md text-sm leading-7 text-[#173b66]/65">Admissions are open for 2026–27. Visit the campus, meet the teachers, and find your place in the DIS family.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><Link to="/admissions" className="inline-flex items-center gap-2 rounded-full bg-[#173b66] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1f5a83]">Apply now <ArrowUpRight size={16} /></Link><Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-[#173b66]/25 px-6 py-3.5 text-sm font-semibold text-[#173b66] transition hover:bg-white/25">Talk to the school <ArrowRight size={15} /></Link></div></motion.div></section>
      </main>
      <Footer />
    </div>
  );
}

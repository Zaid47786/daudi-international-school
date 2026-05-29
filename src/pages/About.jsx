import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, BookOpen, Users, Star, ArrowRight, Quote } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import SEOHead from "../components/SEOHead";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

const milestones = [
  { year: "2005", event: "School founded by Altamash Daudi under the Daudi Welfare Trust.", highlight: true },
  { year: "2008", event: "First batch completes primary education with outstanding board results." },
  { year: "2012", event: "Awarded the DIS Development & Extension Award for community impact." },
  { year: "2018", event: "Secondary classes introduced; enrollment crosses 300 students." },
  { year: "2023", event: "Community scholarship program launched for underprivileged families." },
  { year: "2026", event: "Thousands of students enrolled. One of Muzaffarpur's most trusted non-profit schools.", highlight: true },
];

const values = [
  { icon: <BookOpen size={18} />, title: "Academic Rigour", desc: "We hold every child to a high standard — because we believe in their potential." },
  { icon: <Heart size={18} />, title: "Genuine Inclusivity", desc: "No child is turned away for financial reasons. Scholarships ensure no one is left out." },
  { icon: <Users size={18} />, title: "Teacher–Student Bond", desc: "Small class sizes mean real mentorship — our teachers know every child by name." },
  { icon: <Star size={18} />, title: "Character First", desc: "We build honest, disciplined, compassionate individuals — results follow naturally." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "var(--font-inter)" }}>
      <SEOHead
        title="About Us | DIS Muzaffarpur — Non-Profit English Medium School"
        description="Learn about Daudi International School, founded in 2005 under the Daudi Welfare Trust. A non-profit English-medium school in Muzaffarpur, Bihar built on purpose, not profit."
        canonical="https://daudischool.in/about"
      />
      <Navbar />
      <PageHero
        title="About DIS"
        subtitle="How a community classroom became one of Muzaffarpur's most trusted schools"
        bgImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=80"
      />

      {/* ─── ORIGIN STORY ─── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">

          {/* Text block — full width on mobile */}
          <motion.div {...fadeUp(0)} className="max-w-2xl mb-10 sm:mb-14">
            <p className="label-stamp text-cobalt mb-4">Our origin</p>
            <h2 className="font-inter font-bold text-ink tracking-tight leading-tight mb-5"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)" }}>
              Born from purpose,{" "}
              <span className="font-fraunces italic" style={{ color: "var(--cobalt)" }}>not profit.</span>
            </h2>
            <div className="space-y-3.5 text-[14.5px] leading-[1.85]" style={{ color: "var(--ink-soft)" }}>
              <p>
                Daudi International School was founded on a single conviction: quality English-medium education in Muzaffarpur should not be reserved for the wealthy.
              </p>
              <p>
                Under the <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Daudi Welfare Trust</strong>, what began as a small community classroom now serves thousands of students across Nursery through Secondary levels.
              </p>
              <p>
                Every rupee collected goes back into the school. No surplus. No shareholders. Just better classrooms, better teachers, and better futures.
              </p>
            </div>
          </motion.div>

          {/* Stats + image — stacked on mobile, side by side on desktop */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Stats */}
            <motion.div {...fadeUp(0.1)} className="w-full lg:w-auto">
              <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:flex lg:flex-col lg:gap-4">
                {[
                  { v: "1000+", l: "Students taught" },
                  { v: "20+", l: "Years of service" },
                  { v: "Non-profit", l: "Institution" },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl px-4 py-5 lg:w-44 text-center" style={{ backgroundColor: "var(--slate)" }}>
                    <div className="font-bold text-base sm:text-lg leading-tight" style={{ color: "var(--cobalt)" }}>{s.v}</div>
                    <div className="text-[11px] mt-1 leading-snug" style={{ color: "var(--ink-muted)" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Image collage */}
            <motion.div {...fadeUp(0.15)} className="w-full lg:flex-1">
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80"
                  alt="Students learning in classroom at Daudi International School Muzaffarpur"
                  loading="lazy"
                  className="rounded-xl w-full object-cover col-span-2"
                  style={{ height: "clamp(160px, 25vw, 240px)" }}
                />
                <img
                  src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=80"
                  alt="Books and study materials — quality learning at DIS Muzaffarpur"
                  loading="lazy"
                  className="rounded-xl w-full object-cover"
                  style={{ height: "clamp(120px, 18vw, 180px)" }}
                />
                <div className="rounded-xl flex flex-col items-center justify-center p-4 text-center"
                  style={{ backgroundColor: "var(--cobalt-deep)", height: "clamp(120px, 18vw, 180px)" }}>
                  <div className="font-bold text-white text-xl sm:text-2xl mb-1">2005</div>
                  <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider leading-snug" style={{ color: "var(--amber)" }}>
                    Est. by Daudi<br />Welfare Trust
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FOUNDER QUOTE ─── */}
      <section className="py-16 sm:py-24" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start lg:items-center">

            {/* Photo */}
            <motion.div {...fadeUp(0)} className="w-full lg:w-auto lg:shrink-0">
              <div className="relative inline-block w-full max-w-[260px] sm:max-w-[300px]">
                <div className="rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "3/4" }}>
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
                    alt="Altamash Daudi, Founder and Director of Daudi International School Muzaffarpur"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl px-4 py-3 shadow-lg border border-gray-100">
                  <div className="font-semibold text-sm" style={{ color: "var(--ink)" }}>Altamash Daudi</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--ink-muted)" }}>Founder & Director</div>
                </div>
              </div>
            </motion.div>

            {/* Quote */}
            <motion.div {...fadeUp(0.1)} className="w-full mt-6 lg:mt-0">
              <p className="label-stamp mb-5" style={{ color: "var(--cobalt)" }}>Founder's message</p>
              <Quote size={36} strokeWidth={1} style={{ color: "var(--amber)", opacity: 0.5 }} className="mb-3" />
              <blockquote className="font-fraunces italic leading-[1.65] mb-6"
                style={{ fontSize: "clamp(1.05rem, 2.2vw, 1.4rem)", color: "var(--ink)" }}>
                When I founded this school, my dream was simple: no child in Muzaffarpur should be denied a quality education because of money. Education is not a privilege — it is a right.
              </blockquote>
              <div className="space-y-3 text-[14px] leading-[1.8]" style={{ color: "var(--ink-soft)" }}>
                <p>Under the Daudi Welfare Trust, we have built an institution that combines modern pedagogy with genuine human values. Our teachers are mentors who know each student by name.</p>
                <p>I invite every parent to partner with us. Together, we are building a generation that will make Bihar proud.</p>
              </div>
              <div className="mt-7">
                <div className="w-8 h-0.5 rounded-full mb-2.5" style={{ backgroundColor: "var(--amber)" }} />
                <div className="font-semibold text-sm" style={{ color: "var(--ink)" }}>Altamash Daudi</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--ink-muted)" }}>Founder & Director, Daudi International School</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CORE VALUES ─── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div {...fadeUp(0)} className="mb-10 sm:mb-14">
            <p className="label-stamp mb-3" style={{ color: "var(--cobalt)" }}>What drives us</p>
            <h2 className="font-inter font-bold tracking-tight leading-tight"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2.1rem)", color: "var(--ink)" }}>
              Four things we refuse to{" "}
              <span className="font-fraunces italic" style={{ color: "var(--cobalt)" }}>compromise on</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {values.map((v, i) => (
              <motion.div key={i} {...fadeUp(i * 0.07)}
                className="group relative rounded-xl p-6 border transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                style={{ borderColor: "var(--cream-dark)", backgroundColor: "var(--cream)" }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "var(--amber-pale)", color: "var(--cobalt)" }}>
                  {v.icon}
                </div>
                <h3 className="font-semibold text-sm mb-2 leading-snug" style={{ color: "var(--ink)" }}>{v.title}</h3>
                <p className="text-[13px] leading-[1.72]" style={{ color: "var(--ink-soft)" }}>{v.desc}</p>
                <div className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ backgroundColor: "var(--amber)" }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="py-16 sm:py-24" style={{ backgroundColor: "var(--cobalt-deep)" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">

          <motion.div {...fadeUp(0)} className="mb-10 sm:mb-14">
            <p className="label-stamp mb-4" style={{ color: "rgba(232,168,32,0.7)" }}>Our journey</p>
            <h2 className="font-inter font-bold text-white tracking-tight leading-tight"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2.1rem)" }}>
              Twenty years{" "}
              <span className="font-fraunces italic" style={{ color: "var(--amber)" }}>in the making</span>
            </h2>
            <p className="mt-3 text-[14px] leading-[1.75] max-w-md" style={{ color: "rgba(255,255,255,0.45)" }}>
              From a single classroom to an institution serving thousands — every year brought a new chapter.
            </p>
          </motion.div>

          {/* Timeline — vertical on all screens */}
          <div className="relative pl-8 sm:pl-10 max-w-2xl">
            <div className="absolute left-0 top-1 bottom-1 w-px" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
            <div className="space-y-0">
              {milestones.map((m, i) => (
                <motion.div key={i} {...fadeUp(i * 0.07)} className="relative pb-8 last:pb-0 group">
                  <div
                    className="absolute -left-[33px] sm:-left-[37px] top-1.5 w-3 h-3 rounded-full border-2 transition-colors duration-300"
                    style={{
                      borderColor: m.highlight ? "var(--amber)" : "rgba(255,255,255,0.2)",
                      backgroundColor: m.highlight ? "var(--amber)" : "var(--cobalt-deep)",
                    }}
                  />
                  <div className="font-bold text-[11px] tracking-widest uppercase mb-1.5"
                    style={{ color: m.highlight ? "var(--amber)" : "rgba(255,255,255,0.3)" }}>
                    {m.year}
                  </div>
                  <p className="text-[13.5px] leading-[1.7]"
                    style={{ color: m.highlight ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.52)" }}>
                    {m.event}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center">
          <motion.div {...fadeUp(0)}>
            <p className="label-stamp mb-4" style={{ color: "var(--cobalt)" }}>Join our community</p>
            <h2 className="font-inter font-bold tracking-tight leading-tight mb-4"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2.1rem)", color: "var(--ink)" }}>
              Want your child to grow up in{" "}
              <span className="font-fraunces italic" style={{ color: "var(--cobalt)" }}>an environment like this?</span>
            </h2>
            <p className="text-[14.5px] leading-[1.8] mb-8" style={{ color: "var(--ink-soft)" }}>
              Admissions for 2026–27 are open. Come visit, meet the teachers, and see what makes DIS different.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/admissions"
                className="w-full sm:w-auto px-7 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2"
                style={{ backgroundColor: "var(--cobalt-deep)", color: "#fff" }}>
                Apply for admission <ArrowRight size={14} />
              </Link>
              <Link to="/contact"
                className="w-full sm:w-auto px-7 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 border flex items-center justify-center hover:opacity-80"
                style={{ borderColor: "var(--cream-dark)", color: "var(--ink)" }}>
                Contact us first
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
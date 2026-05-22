import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, BookOpen, Users, Star, ArrowRight, Quote } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

const milestones = [
  { year: "2005", event: "School founded by Altamash Daudi under the Daudi Welfare Trust.", highlight: true },
  { year: "2008", event: "First batch completes primary education with outstanding board results." },
  { year: "2012", event: "Awarded the DIS Development & Extension Award for community impact." },
  { year: "2018", event: "Secondary classes introduced; enrollment crosses 300 students." },
  { year: "2023", event: "Community scholarship program launched for underprivileged families." },
  { year: "2026", event: "500+ students enrolled. One of Muzaffarpur's most trusted non-profit schools.", highlight: true },
];

const values = [
  { icon: <BookOpen size={18} />, title: "Academic Rigour", desc: "We hold every child to a high standard — not to stress them, but because we believe in their potential." },
  { icon: <Heart size={18} />, title: "Genuine Inclusivity", desc: "No child is turned away for financial reasons. Scholarships and reduced fees ensure no one is left out." },
  { icon: <Users size={18} />, title: "Teacher–Student Bond", desc: "Our teachers know every child by name. Small class sizes mean real mentorship, not just instruction." },
  { icon: <Star size={18} />, title: "Character First", desc: "We build honest, disciplined, compassionate individuals — academic results follow naturally." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white font-inter">
      <Navbar />
      <PageHero
        title="About DIS"
        subtitle="How a community classroom became one of Muzaffarpur's most trusted schools"
        bgImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=80"
      />

      {/* ─── ORIGIN STORY ─── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: text */}
            <motion.div {...fadeUp(0)}>
              <p className="label-stamp text-cobalt mb-5">Our origin</p>
              <h2 className="font-inter font-bold text-ink tracking-tight leading-tight mb-7"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.8rem)" }}>
                Born from purpose,<br />
                <span className="font-fraunces italic" style={{ color: "var(--cobalt)" }}>not profit.</span>
              </h2>
              <div className="space-y-4 text-[15px] leading-[1.85]" style={{ color: "var(--ink-soft)" }}>
                <p>
                  Daudi International School was founded on a single conviction: quality English-medium education in Muzaffarpur should not be reserved for the wealthy.
                </p>
                <p>
                  Under the <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Daudi Welfare Trust</strong>, what began as a small community classroom has grown into a full institution serving 500+ students across Nursery, Primary, Middle, and Secondary levels.
                </p>
                <p>
                  Every rupee collected goes back into the school. No surplus. No shareholders. Just better classrooms, better teachers, and better futures.
                </p>
              </div>

              {/* Quick stats strip */}
              <div className="mt-10 grid grid-cols-3 gap-4">
                {[
                  { v: "500+", l: "Students" },
                  { v: "20+", l: "Years" },
                  { v: "Non-profit", l: "Institution" },
                ].map((s, i) => (
                  <div key={i} className="text-center py-4 rounded-lg" style={{ backgroundColor: "var(--slate)" }}>
                    <div className="font-bold text-lg" style={{ color: "var(--cobalt)" }}>{s.v}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--ink-muted)" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: image collage */}
            <motion.div {...fadeUp(0.12)} className="relative">
              <div className="grid grid-cols-2 gap-3">
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80"
                  alt="Students in classroom"
                  className="rounded-xl w-full aspect-[4/3] object-cover col-span-2"
                />
                <img
                  src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=80"
                  alt="Books and learning"
                  className="rounded-xl w-full aspect-square object-cover"
                />
                <div className="rounded-xl flex flex-col items-center justify-center p-5 text-center" style={{ backgroundColor: "var(--cobalt-deep)" }}>
                  <div className="font-bold text-white text-2xl mb-1">2005</div>
                  <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--amber)" }}>Est. by Daudi<br />Welfare Trust</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FOUNDER QUOTE ─── */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">

            {/* Photo */}
            <motion.div {...fadeUp(0)} className="lg:col-span-4">
              <div className="relative max-w-xs">
                <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"
                    alt="Founder"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* floating name card */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl px-5 py-3.5 shadow-lg border border-gray-100">
                  <div className="font-semibold text-sm" style={{ color: "var(--ink)" }}>Altamash Daudi</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--ink-muted)" }}>Founder & Director</div>
                </div>
              </div>
            </motion.div>

            {/* Quote */}
            <motion.div {...fadeUp(0.1)} className="lg:col-span-8">
              <p className="label-stamp mb-6" style={{ color: "var(--cobalt)" }}>Founder's message</p>
              <Quote size={40} strokeWidth={1} style={{ color: "var(--amber)", opacity: 0.5 }} className="mb-4" />
              <blockquote className="font-fraunces italic leading-[1.65] mb-8"
                style={{ fontSize: "clamp(1.15rem, 2.2vw, 1.5rem)", color: "var(--ink)" }}>
                When I founded this school, my dream was simple: no child in Muzaffarpur should be denied a quality education because of money. Education is not a privilege — it is a right.
              </blockquote>
              <div className="space-y-3 text-[14px] leading-[1.8]" style={{ color: "var(--ink-soft)" }}>
                <p>Under the Daudi Welfare Trust, we have built an institution that combines modern pedagogy with genuine human values. Our teachers are not just instructors — they are mentors who know each student by name.</p>
                <p>I invite every parent to partner with us. Together, we are building a generation that will make Bihar proud.</p>
              </div>
              <div className="mt-8">
                <div className="w-10 h-0.5 rounded-full mb-2" style={{ backgroundColor: "var(--amber)" }} />
                <div className="font-semibold text-sm" style={{ color: "var(--ink)" }}>Altamash Daudi</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--ink-muted)" }}>Founder & Director, Daudi International School</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CORE VALUES ─── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div {...fadeUp(0)} className="text-center max-w-2xl mx-auto mb-14">
            <p className="label-stamp mb-4" style={{ color: "var(--cobalt)" }}>What drives us</p>
            <h2 className="font-inter font-bold tracking-tight leading-tight" style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)", color: "var(--ink)" }}>
              Four things we refuse to<br />
              <span className="font-fraunces italic" style={{ color: "var(--cobalt)" }}>compromise on</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)}
                className="group relative rounded-2xl p-7 border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{ borderColor: "var(--cream-dark)", backgroundColor: "var(--cream)" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                  style={{ backgroundColor: "var(--amber-pale)", color: "var(--cobalt)" }}>
                  {v.icon}
                </div>
                <h3 className="font-semibold text-sm mb-2 leading-snug" style={{ color: "var(--ink)" }}>{v.title}</h3>
                <p className="text-[13px] leading-[1.75]" style={{ color: "var(--ink-soft)" }}>{v.desc}</p>
                {/* amber hover rule */}
                <div className="absolute bottom-0 left-7 right-7 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ backgroundColor: "var(--amber)" }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: "var(--cobalt-deep)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Header sticky-ish */}
            <motion.div {...fadeUp(0)} className="lg:col-span-4">
              <p className="label-stamp mb-5" style={{ color: "rgba(232,168,32,0.7)" }}>Our journey</p>
              <h2 className="font-inter font-bold text-white tracking-tight leading-tight"
                style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)" }}>
                Twenty years<br />
                <span className="font-fraunces italic" style={{ color: "var(--amber)" }}>in the making</span>
              </h2>
              <p className="mt-5 text-[14px] leading-[1.75]" style={{ color: "rgba(255,255,255,0.45)" }}>
                From a single classroom to a 500-student institution. Every year brought a new chapter.
              </p>
            </motion.div>

            {/* Timeline items */}
            <div className="lg:col-span-8">
              <div className="relative pl-8 sm:pl-10">
                {/* vertical line */}
                <div className="absolute left-0 top-2 bottom-2 w-px" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />

                <div className="space-y-0">
                  {milestones.map((m, i) => (
                    <motion.div key={i} {...fadeUp(i * 0.07)}
                      className="relative pb-8 last:pb-0 group">
                      {/* dot */}
                      <div className="absolute -left-[37px] sm:-left-[41px] top-1 w-3 h-3 rounded-full border-2 transition-colors duration-300"
                        style={{
                          borderColor: m.highlight ? "var(--amber)" : "rgba(255,255,255,0.25)",
                          backgroundColor: m.highlight ? "var(--amber)" : "var(--cobalt-deep)"
                        }} />
                      <div className="font-bold text-xs mb-1.5 tracking-widest"
                        style={{ color: m.highlight ? "var(--amber)" : "rgba(255,255,255,0.35)" }}>
                        {m.year}
                      </div>
                      <p className="text-[14px] leading-[1.7] transition-colors duration-200"
                        style={{ color: m.highlight ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)" }}>
                        {m.event}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <motion.div {...fadeUp(0)}>
            <p className="label-stamp mb-5" style={{ color: "var(--cobalt)" }}>Join our community</p>
            <h2 className="font-inter font-bold tracking-tight leading-tight mb-5"
              style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)", color: "var(--ink)" }}>
              Want your child to grow up<br />
              <span className="font-fraunces italic" style={{ color: "var(--cobalt)" }}>in an environment like this?</span>
            </h2>
            <p className="text-[15px] leading-[1.8] mb-9" style={{ color: "var(--ink-soft)" }}>
              Admissions for the 2026–27 academic year are open. Come meet us, visit the campus, and see for yourself what makes DIS different.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/admissions"
                className="px-7 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:opacity-90 flex items-center gap-2"
                style={{ backgroundColor: "var(--cobalt-deep)", color: "#fff" }}>
                Apply for admission <ArrowRight size={14} />
              </Link>
              <Link to="/contact"
                className="px-7 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 border hover:bg-cream"
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
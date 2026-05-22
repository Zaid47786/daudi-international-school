import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

const coreValues = [
  "Integrity & Honesty",
  "Inclusive Education for All",
  "Academic Excellence",
  "Character & Discipline",
  "Community Service",
  "Holistic Development",
];

const milestones = [
  { year: "2005", event: "School founded by Altamash Daudi under the Daudi Welfare Trust." },
  { year: "2008", event: "First batch completes primary education with outstanding results." },
  { year: "2012", event: "Recognized with the DIS Development and Extension Award." },
  { year: "2018", event: "Expanded to secondary classes; enrollment crosses 300 students." },
  { year: "2023", event: "Community scholarship program launched for underprivileged students." },
  { year: "2026", event: "500+ students enrolled. One of Muzaffarpur's most trusted non-profit schools." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white font-inter">
      <Navbar />
      <PageHero
        title="About DIS"
        subtitle="How a community initiative became one of Muzaffarpur's most trusted schools"
        bgImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=80"
      />

      {/* ─── ORIGIN STORY ─── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <motion.div {...fadeUp(0)} className="lg:col-span-5">
              <p className="label-stamp text-cobalt mb-5">Our origin</p>
              <h2 className="font-inter font-bold text-ink tracking-tight leading-tight mb-6"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
                Born from purpose,<br />
                <em className="font-fraunces not-italic text-cobalt">not profit</em>
              </h2>
              <div className="space-y-4 text-ink-soft text-[15px] leading-[1.78]">
                <p>
                  Daudi International School was established with a clear conviction: quality English-medium education in Muzaffarpur shouldn't be a privilege for the few.
                </p>
                <p>
                  Founded under the <strong className="text-ink font-semibold">Daudi Welfare Trust</strong>, DIS has grown from a small community classroom into an institution that now serves over 500 students a year — across Nursery, Primary, Middle, and Secondary levels.
                </p>
                <p>
                  We don't operate to generate surplus. We operate to change lives. Every fee collected goes back into the school — better classrooms, better teachers, better outcomes.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.12)} className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  { label: "Our Mission", text: "Provide quality, inclusive, English-medium education to every child in Muzaffarpur.", accent: "bg-cobalt text-white" },
                  { label: "Our Vision", text: "A community where a child's zip code never determines their future.", accent: "bg-cobalt-deep text-white" },
                  { label: "Our Values", text: "Integrity, inclusivity, academic rigour, discipline, and service to community.", accent: "bg-amber text-ink" },
                  { label: "Our Promise", text: "Every student gets individual attention, care, and a real pathway forward.", accent: "bg-ink text-white" },
                ].map((item, i) => (
                  <div key={i} className={`${item.accent} rounded-lg p-5 sm:p-6 flex flex-col justify-between min-h-36`}>
                    <div className="text-xs font-bold uppercase tracking-widest opacity-60 mb-3">{item.label}</div>
                    <p className="text-[13px] leading-relaxed opacity-85">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FOUNDER ─── */}
      <section className="py-20 sm:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div {...fadeUp(0)} className="lg:col-span-5 relative">
              <div className="rounded-lg overflow-hidden aspect-[3/4] max-w-sm">
                <img
                  src="https://i.ytimg.com/vi/qXYJYEKhXTY/maxresdefault.jpg"
                  alt="Altamash Daudi — Founder"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => { e.target.src = "https://i.ytimg.com/vi/qXYJYEKhXTY/hqdefault.jpg"; }}
                />
              </div>
              <div className="mt-4 rule-left">
                <div className="text-ink font-semibold text-sm">Altamash Daudi</div>
                <div className="text-ink-soft text-xs mt-0.5">Founder & Director, DIS</div>
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="lg:col-span-7">
              <p className="label-stamp text-cobalt mb-5">Founder's message</p>
              <div className="font-fraunces text-amber/50 leading-none mb-3" style={{ fontSize: "4rem" }}>"</div>
              <blockquote className="font-fraunces italic text-ink leading-[1.55] mb-7"
                style={{ fontSize: "clamp(1.1rem, 2vw, 1.45rem)" }}>
                When I founded this school, my dream was simple: no child in Muzaffarpur should be denied a quality education because of money. Education is not a privilege — it is a right.
              </blockquote>
              <div className="text-ink-soft text-[14px] leading-[1.75] max-w-prose space-y-3">
                <p>Under the Daudi Welfare Trust, we've built an institution that combines modern pedagogy with genuine values. Our teachers aren't just instructors — they're mentors.</p>
                <p>I invite every parent to partner with us. Together, we're building a generation that will make Bihar proud.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CORE VALUES ─── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <motion.div {...fadeUp(0)} className="lg:col-span-4">
              <p className="label-stamp text-cobalt mb-5">What drives us</p>
              <h2 className="font-inter font-bold text-ink tracking-tight leading-tight"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
                Six principles we don't compromise on
              </h2>
            </motion.div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {coreValues.map((v, i) => (
                  <motion.div key={i} {...fadeUp(i * 0.06)}
                    className="flex items-center gap-3 py-3.5 border-b border-gray-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0" />
                    <span className="text-ink-soft text-[14px] font-medium">{v}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="py-20 sm:py-28 bg-cobalt-deep">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div {...fadeUp(0)} className="mb-14">
            <p className="label-stamp text-amber/70 mb-4">Our journey</p>
            <h2 className="font-inter font-bold text-white tracking-tight"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
              Twenty years in the making
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[52px] top-0 bottom-0 w-px bg-white/10 hidden sm:block" />
            <div className="space-y-0">
              {milestones.map((m, i) => (
                <motion.div key={i} {...fadeUp(i * 0.07)}
                  className="grid grid-cols-12 gap-4 sm:gap-8 items-start py-6 border-b border-white/8 group">
                  <div className="col-span-3 sm:col-span-2">
                    <div className="text-amber font-bold text-base leading-none">{m.year}</div>
                  </div>
                  <div className="col-span-1 hidden sm:flex justify-center pt-1">
                    <div className="w-2.5 h-2.5 rounded-full border-2 border-amber bg-cobalt-deep group-hover:bg-amber transition-colors duration-300 relative z-10" />
                  </div>
                  <div className="col-span-9 sm:col-span-9">
                    <p className="text-white/65 text-[14px] leading-relaxed group-hover:text-white/85 transition-colors duration-200">{m.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
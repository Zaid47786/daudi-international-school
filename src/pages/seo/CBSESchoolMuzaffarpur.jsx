import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, BookOpen, GraduationCap, Users } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";
import Breadcrumb from "../../components/Breadcrumb";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

const faqs = [
  { q: "Is Daudi International School a CBSE school in Muzaffarpur?", a: "DIS follows a rigorous English-medium curriculum aligned with national CBSE standards. The school covers all core subjects across Nursery to Class X with a focus on conceptual learning and exam preparedness." },
  { q: "What subjects are taught at DIS Muzaffarpur?", a: "Core subjects include English, Mathematics, Science, Social Studies, Hindi, and Computer Science. Students also participate in Art, Physical Education, and co-curricular activities." },
  { q: "How does DIS prepare students for board examinations?", a: "Through consistent assessments, dedicated subject teachers, regular mock tests, and personalised guidance. Our track record of strong board results speaks for itself." },
  { q: "Are smart classrooms available?", a: "Yes. DIS has invested in modern classroom technology to make learning interactive, engaging, and aligned with 21st-century education standards." },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(f => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function CBSESchoolMuzaffarpur() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "var(--font-inter)" }}>
      <SEOHead
        title="CBSE School in Muzaffarpur | English Medium | DIS"
        description="Daudi International School is a leading CBSE-aligned English medium school in Muzaffarpur, Bihar. Smart classrooms, experienced faculty, and quality education from Nursery to Class X."
        canonical="https://daudischool.in/cbse-school-in-muzaffarpur"
        schema={schema}
      />
      <Navbar />

      <section className="relative pt-[68px] overflow-hidden" style={{ backgroundColor: "var(--cobalt-deep)", minHeight: "400px" }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <Breadcrumb crumbs={[{ label: "CBSE School in Muzaffarpur" }]} />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-24">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px" style={{ backgroundColor: "var(--amber)" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,168,32,0.85)" }}>
                CBSE Aligned · English Medium · Muzaffarpur
              </span>
            </div>
            <h1 className="font-inter font-bold text-white leading-tight mb-5" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", letterSpacing: "-0.02em" }}>
              CBSE-Aligned Education<br />
              <span className="font-fraunces italic" style={{ color: "var(--amber-light)" }}>in the Heart of Muzaffarpur</span>
            </h1>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "520px", marginBottom: "32px" }}>
              At DIS, we combine the rigour of a national curriculum with the warmth of a community school — smart classrooms, experienced teachers, and outcomes that matter.
            </p>
            <Link to="/admissions"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-lg"
              style={{ backgroundColor: "var(--amber)", color: "var(--cobalt-deep)" }}>
              Apply Now <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div {...fadeUp(0)} className="max-w-2xl mb-12">
            <p className="label-stamp text-cobalt mb-3">Our curriculum</p>
            <h2 className="font-inter font-bold text-ink tracking-tight" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>
              Built for thinkers, not just{" "}
              <span className="font-fraunces italic" style={{ color: "var(--cobalt)" }}>exam-passers</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { level: "Nursery & Montessori", ages: "Ages 3–5", desc: "Play-based learning, phonics, number sense, and social skills development.", accent: true },
              { level: "Primary (I–V)", ages: "Ages 6–10", desc: "English, Maths, EVS, Hindi, and foundational science with interactive methods." },
              { level: "Middle (VI–VIII)", ages: "Ages 11–13", desc: "Core CBSE subjects, lab work, and introduction to computer science." },
              { level: "Secondary (IX–X)", ages: "Ages 14–16", desc: "Board exam preparation, project-based learning, and career guidance." },
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp(i * 0.07)}
                className="rounded-xl p-6"
                style={{
                  backgroundColor: item.accent ? "var(--amber)" : "rgba(255,255,255,0)",
                  border: item.accent ? "none" : "1px solid var(--cream-dark)",
                  background: item.accent ? "var(--amber)" : "var(--cream)",
                }}>
                <GraduationCap size={20} className="mb-4" style={{ color: item.accent ? "var(--cobalt-deep)" : "var(--cobalt)" }} />
                <h3 className="font-semibold text-sm mb-1" style={{ color: item.accent ? "var(--cobalt-deep)" : "var(--ink)" }}>{item.level}</h3>
                <p className="text-[11px] font-semibold mb-2" style={{ color: item.accent ? "var(--cobalt)" : "var(--ink-muted)" }}>{item.ages}</p>
                <p className="text-[13px] leading-relaxed" style={{ color: item.accent ? "var(--cobalt-deep)" : "var(--ink-soft)" }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              "Smart classrooms with projectors & digital boards",
              "Experienced, trained, and caring teaching staff",
              "Regular parent-teacher meetings and progress reviews",
              "Annual science exhibitions and cultural events",
              "Library with curated books for all age groups",
              "Safe, clean campus in central Muzaffarpur",
            ].map((point, i) => (
              <motion.div key={i} {...fadeUp(i * 0.05)} className="flex items-start gap-3">
                <CheckCircle size={16} className="mt-0.5 shrink-0" style={{ color: "var(--amber)" }} />
                <span className="text-[13.5px]" style={{ color: "var(--ink-soft)" }}>{point}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div {...fadeUp(0)} className="mb-10">
            <p className="label-stamp text-cobalt mb-3">Quick answers</p>
            <h2 className="font-inter font-bold text-ink tracking-tight" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
              Questions about our curriculum
            </h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} {...fadeUp(i * 0.05)}
                className="rounded-xl p-6 bg-white border"
                style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--ink)" }}>{faq.q}</h3>
                <p className="text-[13.5px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-white" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <motion.div {...fadeUp(0)}>
            <h2 className="font-fraunces font-bold text-ink mb-3" style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)" }}>
              Enroll your child at DIS today
            </h2>
            <p className="text-[14px] mb-6" style={{ color: "var(--ink-soft)" }}>Admissions open for 2026–27. Limited seats available.</p>
            <Link to="/admissions"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm"
              style={{ backgroundColor: "var(--cobalt-deep)", color: "#fff" }}>
              Start Application <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
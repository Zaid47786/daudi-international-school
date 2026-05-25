import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Globe, BookOpen, Star } from "lucide-react";
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
  { q: "Why choose an English-medium school in Muzaffarpur?", a: "English-medium education gives children a significant advantage in higher education, competitive exams, and professional careers. Starting early builds fluency, confidence, and critical thinking skills." },
  { q: "Is DIS a fully English-medium school?", a: "Yes. Instruction across all subjects is in English from Nursery onwards. Hindi is also taught as a core language subject. This bilingual approach builds strong communication skills." },
  { q: "What is the advantage of English medium from Nursery?", a: "Children who begin English-medium education early develop natural fluency rather than translation-based thinking. It also makes the transition to higher English-medium institutions seamless." },
  { q: "How does DIS support students who are not fluent in English at admission?", a: "Our teachers are trained to support all learners. Foundational classes include extra attention for language development, and our small class sizes allow personalised support for every child." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function EnglishMediumSchool() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "var(--font-inter)" }}>
      <SEOHead
        title="English Medium School in Muzaffarpur | DIS Bihar"
        description="Daudi International School is the top English-medium school in Muzaffarpur, Bihar. Quality instruction in English from Nursery to Class X. Non-profit, trusted since 2005."
        canonical="https://daudischool.in/english-medium-school-in-muzaffarpur"
        schema={schema}
      />
      <Navbar />

      <section className="relative pt-[68px]" style={{ backgroundColor: "var(--cobalt-deep)", minHeight: "400px" }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <Breadcrumb crumbs={[{ label: "English Medium School in Muzaffarpur" }]} />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-24">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px" style={{ backgroundColor: "var(--amber)" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,168,32,0.85)" }}>
                English Medium · Nursery to Class X · Muzaffarpur
              </span>
            </div>
            <h1 className="font-inter font-bold text-white leading-tight mb-5" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", letterSpacing: "-0.02em" }}>
              The Best English Medium<br />
              <span className="font-fraunces italic" style={{ color: "var(--amber-light)" }}>School in Muzaffarpur</span>
            </h1>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "520px", marginBottom: "32px" }}>
              Give your child the lifelong gift of English fluency. At DIS, English isn't just a subject — it's the language of every lesson, every discussion, and every discovery.
            </p>
            <Link to="/admissions"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-lg"
              style={{ backgroundColor: "var(--amber)", color: "var(--cobalt-deep)" }}>
              Apply Now <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeUp(0)}>
              <p className="label-stamp text-cobalt mb-4">Why English matters early</p>
              <h2 className="font-inter font-bold text-ink tracking-tight mb-5" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>
                A head start that{" "}
                <span className="font-fraunces italic" style={{ color: "var(--cobalt)" }}>lasts a lifetime</span>
              </h2>
              <div className="space-y-4 text-[14.5px] leading-[1.85]" style={{ color: "var(--ink-soft)" }}>
                <p>Children who learn in English from an early age develop natural fluency — not translated thinking. At DIS, English is the medium of instruction across all subjects, from day one of Nursery.</p>
                <p>This approach doesn't come at the cost of roots. Hindi is taught as a strong core subject, ensuring our students are fluent in both India's national language and the language of global opportunity.</p>
              </div>
              <div className="mt-8 space-y-3">
                {[
                  "All subjects taught in English — Nursery to Class X",
                  "Hindi as a dedicated, well-taught core subject",
                  "Spoken English activities built into daily routines",
                  "Reading programs, debates, and elocution events",
                ].map((p, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: "var(--amber)" }} />
                    <span className="text-[13.5px]" style={{ color: "var(--ink-soft)" }}>{p}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeUp(0.1)}>
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80"
                alt="English medium classroom at DIS Muzaffarpur"
                className="w-full rounded-xl object-cover shadow-xl"
                loading="lazy"
                style={{ height: "clamp(280px, 40vw, 420px)", objectPosition: "center 30%" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div {...fadeUp(0)} className="mb-10">
            <h2 className="font-inter font-bold text-ink tracking-tight" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
              FAQs: English medium education in Muzaffarpur
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
              Build your child's English foundation at DIS
            </h2>
            <p className="text-[14px] mb-6" style={{ color: "var(--ink-soft)" }}>Admissions open for 2026–27. Apply now.</p>
            <Link to="/admissions"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm"
              style={{ backgroundColor: "var(--cobalt-deep)", color: "#fff" }}>
              Apply for Admission <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
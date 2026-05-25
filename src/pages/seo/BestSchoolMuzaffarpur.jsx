import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Star, ArrowRight, MapPin, Phone, BookOpen, Users, Award, Heart } from "lucide-react";
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
  { q: "Which is the best school in Muzaffarpur?", a: "Daudi International School (DIS) is widely regarded as one of the best schools in Muzaffarpur, Bihar. It is a non-profit, English-medium institution offering quality education from Nursery to Class X under the Daudi Welfare Trust, founded in 2005." },
  { q: "Is DIS a CBSE-affiliated school?", a: "DIS follows a rigorous English-medium curriculum aligned with national educational standards, covering all core subjects from Nursery through Class X with a focus on both academics and character development." },
  { q: "Are admissions open at DIS Muzaffarpur?", a: "Yes, admissions are open for the 2026–27 academic year. You can apply online through our admissions page or visit the school directly at Motijheel, Muzaffarpur." },
  { q: "What makes DIS different from other schools in Muzaffarpur?", a: "DIS is a non-profit school — every rupee goes back into education. We offer small class sizes, dedicated mentors, scholarship support for underprivileged students, and a genuine focus on each child's growth." },
  { q: "What is the fee structure at DIS?", a: "DIS offers affordable, transparent fee structures suited to all income groups. Scholarship programs are available for deserving and underprivileged students. Contact the admissions office for current fee details." },
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
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://daudischool.in/" },
        { "@type": "ListItem", position: 2, name: "Best School in Muzaffarpur" },
      ],
    },
  ],
};

export default function BestSchoolMuzaffarpur() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "var(--font-inter)" }}>
      <SEOHead
        title="Best School in Muzaffarpur | Top English Medium School"
        description="Looking for the best school in Muzaffarpur? Daudi International School (DIS) offers quality English-medium education from Nursery to Class X. Non-profit, affordable, trusted since 2005."
        canonical="https://daudischool.in/best-school-in-muzaffarpur"
        schema={schema}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-[68px] overflow-hidden" style={{ backgroundColor: "var(--cobalt-deep)", minHeight: "420px" }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <Breadcrumb crumbs={[{ label: "Best School in Muzaffarpur" }]} />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-24">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px" style={{ backgroundColor: "var(--amber)" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,168,32,0.85)" }}>
                Muzaffarpur · Est. 2005 · Non-Profit
              </span>
            </div>
            <h1 className="font-inter font-bold text-white leading-tight mb-5" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", letterSpacing: "-0.02em" }}>
              One of the Best Schools<br />
              <span className="font-fraunces italic" style={{ color: "var(--amber-light)" }}>in Muzaffarpur, Bihar</span>
            </h1>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "540px", marginBottom: "32px" }}>
              Daudi International School has been shaping futures since 2005 — non-profit, English-medium, and genuinely committed to every child's growth, regardless of background.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/admissions"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-lg"
                style={{ backgroundColor: "var(--amber)", color: "var(--cobalt-deep)" }}>
                Apply for Admission <ArrowRight size={14} />
              </Link>
              <Link to="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium rounded-lg"
                style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}>
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why DIS */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div {...fadeUp(0)} className="max-w-2xl mb-12">
            <p className="label-stamp text-cobalt mb-3">Why parents choose us</p>
            <h2 className="font-inter font-bold text-ink tracking-tight leading-tight" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>
              What makes DIS stand out among{" "}
              <span className="font-fraunces italic" style={{ color: "var(--cobalt)" }}>Muzaffarpur schools</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <BookOpen size={20} />, title: "English-Medium Instruction", desc: "Every subject taught in English from Nursery — building confident communicators for a global future." },
              { icon: <Heart size={20} />, title: "Genuinely Non-Profit", desc: "Under the Daudi Welfare Trust. No dividends, no shareholders. Every rupee goes back to the classroom." },
              { icon: <Users size={20} />, title: "Small Class Sizes", desc: "Our teachers know every child by name. Real mentorship, not just lessons." },
              { icon: <Award size={20} />, title: "Scholarship Programs", desc: "We believe in equality. Financial hardship is never a barrier to quality education at DIS." },
              { icon: <Star size={20} />, title: "20+ Years of Trust", desc: "Founded in 2005, DIS has built a strong reputation in Muzaffarpur for academic excellence and integrity." },
              { icon: <MapPin size={20} />, title: "Conveniently Located", desc: "Centrally located at Motijheel, Muzaffarpur — easily accessible from all parts of the city." },
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp(i * 0.06)}
                className="rounded-xl p-6 border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                style={{ borderColor: "var(--cream-dark)", backgroundColor: "var(--cream)" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "var(--amber-pale)", color: "var(--cobalt)" }}>
                  {item.icon}
                </div>
                <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--ink)" }}>{item.title}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 sm:py-20" style={{ backgroundColor: "var(--cobalt-deep)" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { v: "2005", l: "Year Founded" }, { v: "1000+", l: "Students Taught" },
              { v: "Nursery–X", l: "Classes Offered" }, { v: "Non-profit", l: "Institution Type" },
            ].map((s, i) => (
              <motion.div key={i} {...fadeUp(i * 0.07)}>
                <div className="font-fraunces font-bold text-white mb-1" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>{s.v}</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.42)", fontWeight: 500 }}>{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div {...fadeUp(0)} className="mb-10">
            <p className="label-stamp text-cobalt mb-3">Common questions</p>
            <h2 className="font-inter font-bold text-ink tracking-tight" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
              Frequently asked questions
            </h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} {...fadeUp(i * 0.05)}
                className="rounded-xl p-6 border"
                style={{ borderColor: "var(--cream-dark)", backgroundColor: "var(--cream)" }}>
                <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--ink)" }}>{faq.q}</h3>
                <p className="text-[13.5px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20" style={{ backgroundColor: "var(--cream)", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <motion.div {...fadeUp(0)}>
            <h2 className="font-fraunces font-bold text-ink tracking-tight mb-3" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
              Ready to give your child the best start?
            </h2>
            <p className="text-[14.5px] mb-8" style={{ color: "var(--ink-soft)", lineHeight: 1.75 }}>
              Admissions for 2026–27 are open. Visit us at Motijheel, Muzaffarpur, or apply online today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/admissions"
                className="px-7 py-3.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2"
                style={{ backgroundColor: "var(--cobalt-deep)", color: "#fff" }}>
                Apply Now <ArrowRight size={14} />
              </Link>
              <Link to="/contact"
                className="px-7 py-3.5 rounded-lg font-semibold text-sm border flex items-center justify-center"
                style={{ borderColor: "rgba(0,0,0,0.15)", color: "var(--ink-soft)" }}>
                <Phone size={14} className="mr-2" /> Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
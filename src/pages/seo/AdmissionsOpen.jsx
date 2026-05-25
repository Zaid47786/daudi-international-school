import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Phone, Mail, MapPin } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";
import Breadcrumb from "../../components/Breadcrumb";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

const steps = [
  { n: "01", title: "Fill the Form", desc: "Complete our simple online inquiry form with your child's details and preferred class." },
  { n: "02", title: "School Visit", desc: "We'll invite you to tour the campus, meet the teachers, and see our classrooms." },
  { n: "03", title: "Assessment", desc: "A short, informal assessment to help us understand your child's current level." },
  { n: "04", title: "Confirmation", desc: "Receive your admission offer and complete the enrollment formalities." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Are admissions open at DIS Muzaffarpur?", acceptedAnswer: { "@type": "Answer", text: "Yes, admissions are currently open for the 2026–27 academic year across all classes from Nursery to Class X." } },
    { "@type": "Question", name: "What is the last date to apply?", acceptedAnswer: { "@type": "Answer", text: "Seats fill up quickly. We recommend applying as early as possible. Contact us for the current deadline." } },
    { "@type": "Question", name: "Is there an entrance exam?", acceptedAnswer: { "@type": "Answer", text: "There is a short, informal assessment to help us place your child in the right class. It is not a competitive exam." } },
  ],
};

export default function AdmissionsOpen() {
  const { toast } = useToast();
  const [form, setForm] = useState({ parent_name: "", child_name: "", grade: "", phone: "", email: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await base44.entities.AdmissionInquiry.create({ ...form, status: "new" });
    toast({ title: "Inquiry received!", description: "We will contact you within 24 hours." });
    setForm({ parent_name: "", child_name: "", grade: "", phone: "", email: "" });
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "var(--font-inter)" }}>
      <SEOHead
        title="Admissions Open 2026–27 | Apply to DIS Muzaffarpur"
        description="Admissions are open at Daudi International School, Muzaffarpur for 2026–27. Apply now for Nursery to Class X. Non-profit, English-medium, affordable school in Bihar."
        canonical="https://daudischool.in/admissions-open"
        schema={schema}
      />
      <Navbar />

      <section className="relative pt-[68px]" style={{ backgroundColor: "var(--cobalt-deep)", minHeight: "380px" }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <Breadcrumb crumbs={[{ label: "Admissions Open" }]} />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: "rgba(232,168,32,0.15)", border: "1px solid rgba(232,168,32,0.3)" }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--amber)" }} />
              <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--amber)", letterSpacing: "0.05em" }}>Admissions Open · 2026–27</span>
            </div>
            <h1 className="font-inter font-bold text-white leading-tight mb-5" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", letterSpacing: "-0.02em" }}>
              Secure your child's seat at<br />
              <span className="font-fraunces italic" style={{ color: "var(--amber-light)" }}>Daudi International School</span>
            </h1>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.58)", lineHeight: 1.75, maxWidth: "500px" }}>
              Nursery to Class X · English Medium · Non-Profit · Muzaffarpur, Bihar. Limited seats — apply today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps + Form */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Steps */}
            <motion.div {...fadeUp(0)}>
              <p className="label-stamp text-cobalt mb-4">Admission process</p>
              <h2 className="font-inter font-bold text-ink tracking-tight mb-8" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
                Simple, transparent, and{" "}
                <span className="font-fraunces italic" style={{ color: "var(--cobalt)" }}>welcoming</span>
              </h2>
              <div className="space-y-6">
                {steps.map((s, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="font-fraunces font-bold text-xl shrink-0 w-8" style={{ color: "var(--amber)", lineHeight: 1.2 }}>{s.n}</div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--ink)" }}>{s.title}</h3>
                      <p className="text-[13.5px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 p-5 rounded-xl" style={{ backgroundColor: "var(--cream)", border: "1px solid var(--cream-dark)" }}>
                <p className="text-sm font-semibold mb-3" style={{ color: "var(--ink)" }}>Reach us directly</p>
                <div className="space-y-2">
                  <a href="tel:+916212243314" className="flex items-center gap-2 text-sm" style={{ color: "var(--ink-soft)" }}>
                    <Phone size={14} style={{ color: "var(--amber)" }} /> +91 621 224 3314
                  </a>
                  <a href="mailto:daudischool.muz@gmail.com" className="flex items-center gap-2 text-sm" style={{ color: "var(--ink-soft)" }}>
                    <Mail size={14} style={{ color: "var(--amber)" }} /> daudischool.muz@gmail.com
                  </a>
                  <div className="flex items-start gap-2 text-sm" style={{ color: "var(--ink-soft)" }}>
                    <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: "var(--amber)" }} />
                    Shafi Manzil, Daudi Market, Motijheel, Muzaffarpur
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div {...fadeUp(0.1)}>
              <div className="rounded-2xl p-8 shadow-xl" style={{ backgroundColor: "var(--cobalt-deep)" }}>
                <h3 className="font-inter font-bold text-white mb-2" style={{ fontSize: "1.2rem" }}>Quick Inquiry</h3>
                <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>We'll respond within 24 hours.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { key: "parent_name", label: "Parent / Guardian Name", type: "text", required: true },
                    { key: "child_name", label: "Child's Name", type: "text", required: true },
                    { key: "grade", label: "Class Applying For", type: "text", required: true, placeholder: "e.g. Class III or Nursery" },
                    { key: "phone", label: "Phone Number", type: "tel", required: true },
                    { key: "email", label: "Email (optional)", type: "email", required: false },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(255,255,255,0.55)" }}>{f.label}</label>
                      <input
                        type={f.type}
                        required={f.required}
                        placeholder={f.placeholder || ""}
                        value={form[f.key]}
                        onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder:text-white/30 outline-none focus:ring-2"
                        style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", focusRingColor: "var(--amber)" }}
                      />
                    </div>
                  ))}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-60"
                    style={{ backgroundColor: "var(--amber)", color: "var(--cobalt-deep)" }}>
                    {submitting ? "Sending..." : <>Submit Inquiry <ArrowRight size={14} /></>}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
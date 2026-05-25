import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { base44 } from "@/api/base44Client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import SEOHead from "../components/SEOHead";

const admissionsSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Admissions — Daudi International School Muzaffarpur",
  "description": "Apply for admission to Daudi International School Muzaffarpur for session 2026–27. Enrolment open for Nursery to Class X. Affordable fees, scholarships available.",
  "url": "https://daudischool.in/admissions",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://daudischool.in/"},
      {"@type": "ListItem", "position": 2, "name": "Admissions", "item": "https://daudischool.in/admissions"}
    ]
  }
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
});

const grades = ["Montessori", "Nursery", "Class I", "Class II", "Class III", "Class IV", "Class V", "Class VI", "Class VII", "Class VIII", "Class IX", "Class X"];

const steps = [
  { step: "01", title: "Submit an inquiry", desc: "Fill out the form below. No complex paperwork at this stage." },
  { step: "02", title: "We call you back", desc: "Our team contacts you within 2–3 working days to discuss your child's needs." },
  { step: "03", title: "Simple assessment", desc: "An age-appropriate, stress-free check to understand where your child is." },
  { step: "04", title: "Enroll", desc: "Complete the formalities and pay the minimal admission fee. That's it." },
];

const faqs = [
  { q: "Is DIS a government school?", a: "No. DIS is a private, non-profit institution under the Daudi Welfare Trust. We're independent but our fees are kept deliberately affordable." },
  { q: "What language are classes taught in?", a: "English is the medium of instruction. Hindi is taught as a subject throughout all grades." },
  { q: "Are scholarships available?", a: "Yes — need-based scholarships are available for students who show academic potential but face financial difficulty. Speak to our admissions team." },
  { q: "What documents do I need to bring?", a: "Birth certificate, previous school report card (if any), parent ID proof, address proof, and 4 passport photos." },
];

export default function Admissions() {
  const { toast } = useToast();
  const [form, setForm] = useState({ parent_name: "", child_name: "", grade: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await base44.entities.AdmissionInquiry.create({ ...form, status: "new" });
    setSubmitting(false);
    setSubmitted(true);
    toast({ title: "Inquiry submitted.", description: "We'll be in touch within 2–3 working days." });
    setForm({ parent_name: "", child_name: "", grade: "", phone: "", email: "", message: "" });
  };

  const inputClass = "w-full bg-cream border border-gray-200 rounded px-4 py-3 text-[14px] text-ink placeholder-ink-muted/60 focus:outline-none focus:border-cobalt focus:bg-white transition-colors duration-200";

  return (
    <div className="min-h-screen bg-white font-inter">
      <SEOHead
        title="Admissions Open 2026–27 | Apply to DIS Muzaffarpur"
        description="Admissions open at Daudi International School Muzaffarpur for 2026–27. Simple 4-step process, affordable fees, scholarships available. Apply for Nursery to Class X."
        canonical="https://daudischool.in/admissions"
        schema={admissionsSchema}
      />
      <Navbar />
      <PageHero
        title="Admissions"
        subtitle="Enrolment is open for Nursery through Class X — session 2026–27"
        bgImage="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=80"
      />

      {/* Process */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div {...fadeUp(0)} className="mb-12">
            <p className="label-stamp text-cobalt mb-4">How it works</p>
            <h2 className="font-inter font-bold text-ink tracking-tight"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
              A simple, four-step process
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-gray-100 rounded-lg overflow-hidden">
            {steps.map((s, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)}
                className={`p-7 bg-white border-b sm:border-b-0 sm:border-r border-gray-100 last:border-0 ${i === 0 ? "border-l-4 border-l-amber" : ""}`}>
                <div className="text-amber font-bold text-xs tracking-widest mb-4">{s.step}</div>
                <h3 className="font-semibold text-ink text-[14px] mb-2 leading-snug">{s.title}</h3>
                <p className="text-ink-soft text-[13px] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick facts + form */}
      <section className="py-20 sm:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16">

            {/* Info sidebar */}
            <div className="lg:col-span-4 space-y-8">
              <motion.div {...fadeUp(0)}>
                <p className="label-stamp text-cobalt mb-5">Who can apply</p>
                <div className="space-y-3">
                  {[
                    "Children aged 3–15",
                    "Any religion, caste, or background",
                    "Transfer students (TC required)",
                    "Scholarship for underprivileged students",
                    "No prior English needed for lower grades",
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-3 text-ink-soft text-[13px]">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0 mt-1.5" />
                      {point}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.1)} className="bg-cobalt-deep text-white rounded-lg p-6">
                <div className="label-stamp text-amber/70 mb-4">Documents needed</div>
                <ul className="space-y-2 text-[13px] text-white/65">
                  <li>• Birth Certificate</li>
                  <li>• Previous report card (if any)</li>
                  <li>• Parent / Guardian ID proof</li>
                  <li>• Address proof</li>
                  <li>• 4 passport photographs</li>
                </ul>
              </motion.div>

              <motion.div {...fadeUp(0.15)}>
                <div className="grid grid-cols-3 gap-px bg-gray-200 rounded-lg overflow-hidden">
                  {[
                    { v: "April–March", l: "Academic year" },
                    { v: "Nursery–X", l: "All grades" },
                    { v: "Affordable", l: "Non-profit fees" },
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-4 text-center">
                      <div className="font-bold text-cobalt text-sm leading-tight">{item.v}</div>
                      <div className="text-ink-muted text-[10px] mt-1 leading-snug">{item.l}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Form */}
            <motion.div {...fadeUp(0.1)} className="lg:col-span-8">
              <div className="bg-white rounded-lg p-7 sm:p-10 border border-gray-100 shadow-sm">
                {submitted ? (
                  <div className="py-14 text-center">
                    <div className="w-12 h-12 bg-cream border border-gray-200 rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircle size={20} className="text-cobalt" />
                    </div>
                    <h3 className="font-semibold text-ink text-lg mb-2">Inquiry received.</h3>
                    <p className="text-ink-soft text-sm mb-7">Our team will call you within 2–3 working days.</p>
                    <button onClick={() => setSubmitted(false)}
                      className="text-cobalt font-medium text-sm border-b border-cobalt/30 hover:border-cobalt pb-0.5 transition">
                      Submit another
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-semibold text-ink text-[16px] mb-7">Admission inquiry</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="label-stamp text-ink-muted block mb-2">Parent's name *</label>
                          <input required value={form.parent_name} onChange={(e) => setForm({ ...form, parent_name: e.target.value })} className={inputClass} placeholder="Your full name" />
                        </div>
                        <div>
                          <label className="label-stamp text-ink-muted block mb-2">Child's name *</label>
                          <input required value={form.child_name} onChange={(e) => setForm({ ...form, child_name: e.target.value })} className={inputClass} placeholder="Child's full name" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="label-stamp text-ink-muted block mb-2">Grade applying for *</label>
                          <select required value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} className={inputClass}>
                            <option value="">Select grade</option>
                            {grades.map((g) => <option key={g} value={g}>{g}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="label-stamp text-ink-muted block mb-2">Contact number *</label>
                          <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="+91 XXXXX XXXXX" />
                        </div>
                      </div>
                      <div>
                        <label className="label-stamp text-ink-muted block mb-2">Email address</label>
                        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="your@email.com" />
                      </div>
                      <div>
                        <label className="label-stamp text-ink-muted block mb-2">Questions or notes</label>
                        <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={3} className={`${inputClass} resize-none`} placeholder="Anything we should know?" />
                      </div>
                      <button type="submit" disabled={submitting}
                        className="w-full py-3.5 bg-cobalt text-white font-semibold text-sm rounded hover:bg-cobalt-deep transition-colors duration-200 disabled:opacity-60 flex items-center justify-center gap-2">
                        {submitting ? "Submitting…" : <>Submit inquiry <ArrowRight size={14} /></>}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <motion.div {...fadeUp(0)} className="mb-12">
            <p className="label-stamp text-cobalt mb-4">Common questions</p>
            <h2 className="font-inter font-bold text-ink tracking-tight"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
              Things parents ask us
            </h2>
          </motion.div>
          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)}
                className="py-6 border-b border-gray-100">
                <h3 className="font-semibold text-ink text-[14px] mb-2">{faq.q}</h3>
                <p className="text-ink-soft text-[13px] leading-[1.75]">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
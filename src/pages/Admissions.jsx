import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, FileText, Users, Calendar, Phone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { base44 } from "@/api/base44Client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const steps = [
  { icon: FileText, title: "1. Submit Inquiry", desc: "Fill out the online inquiry form below with your child's details and preferred grade." },
  { icon: Phone, title: "2. Contact & Counseling", desc: "Our admissions team will contact you within 2–3 working days for a counseling session." },
  { icon: Users, title: "3. Entrance Assessment", desc: "A simple age-appropriate assessment is conducted to understand the child's current level." },
  { icon: Calendar, title: "4. Enrollment & Fees", desc: "Upon selection, complete the enrollment formalities and pay the minimal nominal fees." },
];

const grades = ["Montessori", "Nursery", "Class I", "Class II", "Class III", "Class IV", "Class V", "Class VI", "Class VII", "Class VIII", "Class IX", "Class X"];

const faqs = [
  { q: "Is DIS a government or private school?", a: "DIS is a private, non-profit school operating under the Daudi Welfare Trust. We are not government-aided but maintain very affordable fee structures." },
  { q: "What is the medium of instruction?", a: "All subjects are taught in English. Hindi is also offered as a language subject throughout all grades." },
  { q: "Are there scholarships available?", a: "Yes. DIS offers need-based scholarships for deserving students who demonstrate academic potential but face financial constraints." },
  { q: "What documents are required for admission?", a: "Birth certificate, previous school's report card (if applicable), parent's ID proof, address proof, and passport-size photographs." },
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
    toast({ title: "Inquiry Submitted!", description: "Our admissions team will contact you within 2–3 working days." });
    setForm({ parent_name: "", child_name: "", grade: "", phone: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navbar />
      <PageHero title="Admissions" subtitle="Join the DIS family — admissions open for 2026–27"
        bgImage="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=80" />

      {/* Process Steps */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 text-royal-blue text-xs font-bold tracking-widest uppercase mb-3">
              <div className="h-px w-8 bg-gold" /> How to Apply <div className="h-px w-8 bg-gold" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy">Admission Process</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {steps.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:border-royal-blue/20 transition-all duration-300 text-center pt-8">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-royal-blue text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                  <s.icon size={22} className="text-royal-blue" />
                </div>
                <h3 className="font-bold text-navy mb-2 text-sm sm:text-base">{s.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Info Banner */}
      <section className="py-10 sm:py-12 bg-royal-blue">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 text-center">
            {[
              { label: "Academic Year", value: "April – March", sub: "2026–27 Enrollment Open" },
              { label: "Grades Available", value: "Nursery – X", sub: "English Medium" },
              { label: "Admission Fee", value: "Minimal", sub: "Non-profit, Affordable" },
            ].map((item, i) => (
              <div key={i} className="text-white py-2">
                <div className="text-gold text-xl sm:text-2xl font-bold mb-1">{item.value}</div>
                <div className="font-semibold text-sm sm:text-base mb-1">{item.label}</div>
                <div className="text-white/60 text-xs sm:text-sm">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form + Eligibility */}
      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
            {/* Eligibility */}
            <div>
              <div className="inline-flex items-center gap-2 text-royal-blue text-xs font-bold tracking-widest uppercase mb-4">
                <div className="h-px w-8 bg-gold" /> Eligibility
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-5">Who Can Apply?</h2>
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {["Children between 3–15 years of age", "Any religion, caste, or socioeconomic background", "Students transferring from other schools (with TC)", "Scholarship available for underprivileged students", "No prior English proficiency required for lower grades"].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{point}</span>
                  </div>
                ))}
              </div>
              <div className="bg-navy rounded-2xl p-5 sm:p-6 text-white">
                <h3 className="font-bold text-gold mb-3">Documents Required</h3>
                <ul className="space-y-1.5 text-sm text-white/70">
                  <li>• Birth Certificate</li>
                  <li>• Previous School Report Card (if applicable)</li>
                  <li>• Parent / Guardian ID Proof</li>
                  <li>• Address Proof</li>
                  <li>• 4 Passport-size Photographs</li>
                </ul>
              </div>
            </div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100">
              {submitted ? (
                <div className="text-center py-10 sm:py-12">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={36} className="text-green-500" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-navy mb-3">Inquiry Submitted!</h3>
                  <p className="text-gray-500 mb-6 text-sm">Our admissions team will contact you within 2–3 working days.</p>
                  <button onClick={() => setSubmitted(false)} className="px-6 py-3 bg-royal-blue text-white rounded-full font-semibold text-sm hover:bg-navy transition">
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-lg sm:text-xl font-bold text-navy mb-5 sm:mb-6">Admission Inquiry Form</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5 block">Parent's Name *</label>
                        <input required value={form.parent_name} onChange={(e) => setForm({ ...form, parent_name: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30" placeholder="Your full name" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5 block">Child's Name *</label>
                        <input required value={form.child_name} onChange={(e) => setForm({ ...form, child_name: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30" placeholder="Child's full name" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5 block">Grade Applying For *</label>
                        <select required value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30 bg-white">
                          <option value="">Select Grade</option>
                          {grades.map((g) => <option key={g} value={g}>{g}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5 block">Contact Number *</label>
                        <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30" placeholder="+91 XXXXX XXXXX" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5 block">Email Address</label>
                      <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5 block">Message / Questions</label>
                      <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={3}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30 resize-none" placeholder="Any questions or additional information..." />
                    </div>
                    <button type="submit" disabled={submitting}
                      className="w-full py-3.5 sm:py-4 bg-royal-blue text-white font-bold rounded-xl hover:bg-navy transition-all duration-300 shadow-lg text-sm disabled:opacity-60">
                      {submitting ? "Submitting..." : "Submit Inquiry"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-royal-blue text-xs font-bold tracking-widest uppercase mb-3">
              <div className="h-px w-8 bg-gold" /> FAQs <div className="h-px w-8 bg-gold" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-gray-50 rounded-2xl p-5 sm:p-6 border border-gray-100">
                <h3 className="font-bold text-navy mb-2 text-sm sm:text-base">{faq.q}</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, FileText, Users, Calendar, Phone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const steps = [
  { icon: FileText, title: "1. Submit Inquiry", desc: "Fill out the online inquiry form below with your child's details and preferred grade." },
  { icon: Phone, title: "2. Contact & Counseling", desc: "Our admissions team will contact you within 2–3 working days for a counseling session." },
  { icon: Users, title: "3. Entrance Assessment", desc: "A simple age-appropriate assessment is conducted to understand the child's current level." },
  { icon: Calendar, title: "4. Enrollment & Fees", desc: "Upon selection, complete the enrollment formalities and pay the minimal nominal fees." },
];

const grades = ["Nursery", "LKG", "UKG", "Class I", "Class II", "Class III", "Class IV", "Class V", "Class VI", "Class VII", "Class VIII", "Class IX", "Class X"];

const faqs = [
  { q: "Is DIS a government or private school?", a: "DIS is a private, non-profit school operating under the Daudi Welfare Trust. We are not government-aided but maintain very affordable fee structures." },
  { q: "What is the medium of instruction?", a: "All subjects are taught in English. Hindi is also offered as a language subject throughout all grades." },
  { q: "Are there scholarships available?", a: "Yes. DIS offers need-based scholarships for deserving students who demonstrate academic potential but face financial constraints." },
  { q: "What documents are required for admission?", a: "Birth certificate, previous school's report card (if applicable), parent's ID proof, address proof, and passport-size photographs." },
];

export default function Admissions() {
  const { toast } = useToast();
  const [form, setForm] = useState({ parentName: "", childName: "", grade: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "Inquiry Submitted!",
      description: "Thank you! Our admissions team will contact you within 2–3 working days.",
    });
    setForm({ parentName: "", childName: "", grade: "", phone: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navbar />
      <PageHero
        title="Admissions"
        subtitle="Join the DIS family — admissions open for 2025–26"
        bgImage="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=80"
      />

      {/* Process Steps */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-royal-blue text-xs font-bold tracking-widest uppercase mb-3">
              <div className="h-px w-8 bg-gold" /> How to Apply <div className="h-px w-8 bg-gold" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">Admission Process</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:border-royal-blue/20 transition-all duration-300 text-center"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-royal-blue text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                <div className="w-14 h-14 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center mb-4 mt-2">
                  <s.icon size={24} className="text-royal-blue" />
                </div>
                <h3 className="font-bold text-navy mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Info */}
      <section className="py-12 bg-royal-blue">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { label: "Academic Year", value: "April – March", sub: "2025–26 Enrollment Open" },
              { label: "Grades Available", value: "Nursery – X", sub: "English Medium" },
              { label: "Admission Fee", value: "Minimal", sub: "Non-profit, Affordable" },
            ].map((item, i) => (
              <div key={i} className="text-white">
                <div className="text-gold text-2xl font-bold mb-1">{item.value}</div>
                <div className="font-semibold mb-1">{item.label}</div>
                <div className="text-white/60 text-sm">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 text-royal-blue text-xs font-bold tracking-widest uppercase mb-4">
                <div className="h-px w-8 bg-gold" /> Eligibility
              </div>
              <h2 className="text-3xl font-bold text-navy mb-6">Who Can Apply?</h2>
              <div className="space-y-4 mb-8">
                {[
                  "Children between 3–15 years of age",
                  "Any religion, caste, or socioeconomic background",
                  "Students transferring from other schools (with TC)",
                  "Scholarship available for underprivileged students",
                  "No prior English proficiency required for lower grades",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{point}</span>
                  </div>
                ))}
              </div>
              <div className="bg-navy rounded-2xl p-6 text-white">
                <h3 className="font-bold text-gold mb-3">Documents Required</h3>
                <ul className="space-y-2 text-sm text-white/70">
                  <li>• Birth Certificate</li>
                  <li>• Previous School Report Card (if applicable)</li>
                  <li>• Parent / Guardian ID Proof</li>
                  <li>• Address Proof</li>
                  <li>• 4 Passport-size Photographs</li>
                </ul>
              </div>
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
            >
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-3">Inquiry Submitted!</h3>
                  <p className="text-gray-500 mb-6">Our admissions team will contact you within 2–3 working days.</p>
                  <button onClick={() => setSubmitted(false)} className="px-6 py-3 bg-royal-blue text-white rounded-full font-semibold text-sm hover:bg-navy transition">
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-navy mb-6">Admission Inquiry Form</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5 block">Parent's Name *</label>
                        <input
                          required
                          value={form.parentName}
                          onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30 focus:border-royal-blue transition"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5 block">Child's Name *</label>
                        <input
                          required
                          value={form.childName}
                          onChange={(e) => setForm({ ...form, childName: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30 focus:border-royal-blue transition"
                          placeholder="Child's full name"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5 block">Grade Applying For *</label>
                        <select
                          required
                          value={form.grade}
                          onChange={(e) => setForm({ ...form, grade: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30 focus:border-royal-blue transition bg-white"
                        >
                          <option value="">Select Grade</option>
                          {grades.map((g) => <option key={g} value={g}>{g}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5 block">Contact Number *</label>
                        <input
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30 focus:border-royal-blue transition"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5 block">Email Address</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30 focus:border-royal-blue transition"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5 block">Message / Questions</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={3}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30 focus:border-royal-blue transition resize-none"
                        placeholder="Any questions or additional information..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 bg-royal-blue text-white font-bold rounded-xl hover:bg-navy transition-all duration-300 shadow-lg hover:shadow-royal-blue/30 hover:scale-[1.02] text-sm"
                    >
                      Submit Inquiry
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-royal-blue text-xs font-bold tracking-widest uppercase mb-3">
              <div className="h-px w-8 bg-gold" /> FAQs <div className="h-px w-8 bg-gold" />
            </div>
            <h2 className="text-3xl font-bold text-navy">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
              >
                <h3 className="font-bold text-navy mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
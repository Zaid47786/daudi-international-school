import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, UserCheck, FileText, CheckCircle, ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const steps = [
  { icon: ClipboardList, step: "01", title: "Submit Inquiry", desc: "Fill out the online inquiry form below with your child's basic details and the grade you're applying for." },
  { icon: FileText, step: "02", title: "Document Submission", desc: "Bring required documents: birth certificate, previous school report card, passport-size photos, and parent ID." },
  { icon: UserCheck, step: "03", title: "Entrance Assessment", desc: "A simple grade-appropriate assessment to help us understand your child's current learning level." },
  { icon: CheckCircle, step: "04", title: "Admission Confirmed", desc: "Upon successful assessment and document verification, admission is confirmed and fee structure is shared." },
];

const grades = ["Nursery", "KG", "Class I", "Class II", "Class III", "Class IV", "Class V", "Class VI", "Class VII", "Class VIII", "Class IX", "Class X"];

export default function Admissions() {
  const { toast } = useToast();
  const [form, setForm] = useState({ parentName: "", childName: "", grade: "", phone: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({ title: "Inquiry Submitted!", description: "Thank you! Our admissions team will contact you within 2 business days." });
      setForm({ parentName: "", childName: "", grade: "", phone: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        title="Admissions"
        subtitle="Begin your child's journey toward excellence at DIS Muzaffarpur"
        bgImage="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1400&q=80"
      />

      {/* Process */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-royal-blue text-sm font-semibold tracking-widest uppercase">How to Apply</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mt-2">
              Admission <span className="text-gold">Process</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative bg-card rounded-2xl p-7 border border-border hover:border-royal-blue/40 hover:shadow-lg transition-all duration-300 group"
              >
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                    <ChevronRight size={18} className="text-muted-foreground" />
                  </div>
                )}
                <div className="text-5xl font-black text-border group-hover:text-gold/30 transition-colors mb-4">{s.step}</div>
                <div className="w-12 h-12 rounded-xl bg-royal-blue/10 group-hover:bg-royal-blue/20 flex items-center justify-center mb-4 transition-colors">
                  <s.icon size={22} className="text-royal-blue" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility + Form */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Eligibility */}
            <div className="lg:col-span-2">
              <span className="text-royal-blue text-sm font-semibold tracking-widest uppercase">Requirements</span>
              <h2 className="text-2xl md:text-3xl font-black text-foreground mt-2 mb-6">
                Eligibility & <span className="text-gold">Documents</span>
              </h2>
              <div className="space-y-5">
                <div className="bg-card rounded-xl p-5 border border-border">
                  <h4 className="font-bold text-foreground mb-3 text-sm">Age Criteria</h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Nursery: 3+ years as of April 1st</li>
                    <li>• KG: 4+ years as of April 1st</li>
                    <li>• Class I: 5+ years as of April 1st</li>
                    <li>• Higher Classes: Age as per grade norms</li>
                  </ul>
                </div>
                <div className="bg-card rounded-xl p-5 border border-border">
                  <h4 className="font-bold text-foreground mb-3 text-sm">Required Documents</h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    {["Birth Certificate (original + copy)", "Previous Class Report Card", "Transfer Certificate (if applicable)", "4 Passport-size Photos", "Parent/Guardian ID Proof", "Address Proof"].map((d) => (
                      <li key={d} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-royal-blue rounded-xl p-5">
                  <h4 className="font-bold text-white mb-2 text-sm">Academic Year</h4>
                  <p className="text-white/70 text-sm">April to March. Admissions typically open in January–February for the upcoming session.</p>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-2xl p-8 md:p-10 border border-border shadow-lg">
                <h3 className="text-2xl font-black text-foreground mb-2">Admission Inquiry Form</h3>
                <p className="text-muted-foreground text-sm mb-8">Fill in the details below and our team will reach out to you shortly.</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Parent/Guardian Name *</label>
                      <input
                        type="text"
                        name="parentName"
                        value={form.parentName}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/40 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Child's Name *</label>
                      <input
                        type="text"
                        name="childName"
                        value={form.childName}
                        onChange={handleChange}
                        required
                        placeholder="Child's full name"
                        className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/40 transition"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Grade Applying For *</label>
                      <select
                        name="grade"
                        value={form.grade}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/40 transition"
                      >
                        <option value="">Select Grade</option>
                        {grades.map((g) => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Contact Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/40 transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/40 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Additional Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Any specific questions or information you'd like to share..."
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/40 transition resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-royal-blue text-white font-bold rounded-xl hover:bg-navy transition-all duration-300 shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Admission Inquiry"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, CheckCircle, ArrowUpRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import { useSettings } from "../lib/useSchoolData";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
});

export default function Contact() {
  const { toast } = useToast();
  const { settings } = useSettings();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    toast({ title: "Message sent.", description: "We'll get back to you within a day or two." });
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const inputClass = "w-full bg-cream border border-gray-200 rounded px-4 py-3 text-[14px] text-ink placeholder-ink-muted/60 focus:outline-none focus:border-cobalt focus:bg-white transition-colors duration-200";

  return (
    <div className="min-h-screen bg-white font-inter">
      <Navbar />
      <PageHero
        title="Contact"
        subtitle="We're here — reach out with questions about admissions, academics, or anything else"
        bgImage="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=1400&q=80"
      />

      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16">

            {/* Left — info */}
            <div className="lg:col-span-4 space-y-0">
              <motion.div {...fadeUp(0)}>
                <p className="label-stamp text-cobalt mb-5">Find us</p>
                <h2 className="font-inter font-bold text-ink tracking-tight mb-8"
                  style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
                  Get in touch
                </h2>
              </motion.div>

              <div className="space-y-6">
                {[
                  { icon: MapPin, label: "Address", content: settings.address, link: null },
                  { icon: Phone, label: "Phone", content: settings.phone, link: `tel:${settings.phone?.replace(/\s/g, "")}` },
                  { icon: Mail, label: "Email", content: settings.email, link: `mailto:${settings.email}` },
                  { icon: Clock, label: "School hours", content: "Mon – Sat: 8:00 AM – 2:30 PM\nOffice: 9:00 AM – 4:00 PM", link: null },
                ].map((item, i) => (
                  <motion.div key={i} {...fadeUp(i * 0.08)} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded bg-amber-pale flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon size={14} className="text-amber" />
                    </div>
                    <div>
                      <div className="label-stamp text-ink-muted mb-1">{item.label}</div>
                      {item.link ? (
                        <a href={item.link} className="text-[14px] text-ink-soft hover:text-cobalt transition-colors duration-200 break-all">
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-[14px] text-ink-soft whitespace-pre-line leading-relaxed">{item.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div {...fadeUp(0.4)} className="mt-10 pt-8 border-t border-gray-100">
                <div className="label-stamp text-ink-muted mb-4">Follow us</div>
                <div className="flex gap-2">
                  <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[12px] text-ink-soft hover:text-cobalt border border-gray-200 hover:border-cobalt px-3 py-2 rounded transition-all duration-200">
                    Facebook <ArrowUpRight size={11} />
                  </a>
                  <a href={settings.youtube_url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[12px] text-ink-soft hover:text-cobalt border border-gray-200 hover:border-cobalt px-3 py-2 rounded transition-all duration-200">
                    YouTube <ArrowUpRight size={11} />
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right — form */}
            <motion.div {...fadeUp(0.1)} className="lg:col-span-8">
              <div className="bg-cream rounded-lg p-7 sm:p-10 border border-gray-100">
                {submitted ? (
                  <div className="py-14 text-center">
                    <div className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircle size={22} className="text-cobalt" />
                    </div>
                    <h3 className="font-semibold text-ink text-lg mb-2">Message received.</h3>
                    <p className="text-ink-soft text-sm mb-7">We usually reply within 1–2 working days.</p>
                    <button onClick={() => setSubmitted(false)}
                      className="text-cobalt font-medium text-sm border-b border-cobalt/30 hover:border-cobalt pb-0.5 transition">
                      Send another message
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-semibold text-ink text-[16px] mb-7">Send a message</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="label-stamp text-ink-muted block mb-2">Your name</label>
                          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Full name" />
                        </div>
                        <div>
                          <label className="label-stamp text-ink-muted block mb-2">Email</label>
                          <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="your@email.com" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="label-stamp text-ink-muted block mb-2">Phone</label>
                          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="+91 XXXXX XXXXX" />
                        </div>
                        <div>
                          <label className="label-stamp text-ink-muted block mb-2">Subject</label>
                          <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputClass} placeholder="e.g. Admission query" />
                        </div>
                      </div>
                      <div>
                        <label className="label-stamp text-ink-muted block mb-2">Message</label>
                        <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5}
                          className={`${inputClass} resize-none`} placeholder="How can we help?" />
                      </div>
                      <button type="submit"
                        className="w-full py-3.5 bg-cobalt text-white font-semibold text-sm rounded hover:bg-cobalt-deep transition-colors duration-200">
                        Send message
                      </button>
                    </form>
                  </>
                )}
              </div>

              {/* Map */}
              <div className="mt-5 rounded-lg overflow-hidden border border-gray-100 h-52 sm:h-64">
                <iframe
                  title="DIS Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3566.0867756994097!2d85.38412621503748!3d26.11876298346217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed2f5f1ede1555%3A0x7b72e39bb65d4d8b!2sMotijheel%2C%20Muzaffarpur%2C%20Bihar!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
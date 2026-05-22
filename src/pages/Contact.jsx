import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, CheckCircle, Facebook, Youtube } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import { useSettings } from "../lib/useSchoolData";

export default function Contact() {
  const { toast } = useToast();
  const { settings } = useSettings();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    toast({ title: "Message Sent!", description: "Thank you for reaching out. We'll get back to you soon." });
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navbar />
      <PageHero title="Contact Us" subtitle="We'd love to hear from you — reach out anytime"
        bgImage="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=1400&q=80" />

      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-4 sm:space-y-5">
              <div>
                <div className="inline-flex items-center gap-2 text-royal-blue text-xs font-bold tracking-widest uppercase mb-3">
                  <div className="h-px w-8 bg-gold" /> Get In Touch
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-2">Contact Information</h2>
                <p className="text-gray-500 text-sm leading-relaxed">Visit us at our campus in Motijheel, Muzaffarpur, or reach us through any of the channels below.</p>
              </div>

              {[
                { icon: MapPin, label: "Address", content: settings.address, link: null },
                { icon: Phone, label: "Phone", content: settings.phone, link: `tel:${settings.phone?.replace(/\s/g, "")}` },
                { icon: Mail, label: "Email", content: settings.email, link: `mailto:${settings.email}` },
                { icon: Clock, label: "School Hours", content: "Mon – Sat: 8:00 AM – 2:30 PM\nOffice: 9:00 AM – 4:00 PM", link: null },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 sm:gap-4 bg-gray-50 rounded-2xl p-4 sm:p-5 border border-gray-100">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-royal-blue rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon size={16} className="text-gold" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">{item.label}</div>
                    {item.link ? (
                      <a href={item.link} className="text-navy font-medium text-sm hover:text-royal-blue transition-colors break-all">{item.content}</a>
                    ) : (
                      <p className="text-navy font-medium text-sm whitespace-pre-line">{item.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              <div className="bg-navy rounded-2xl p-5">
                <div className="text-gold text-xs font-bold uppercase tracking-widest mb-4">Follow Us</div>
                <div className="flex gap-3">
                  <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/10 hover:bg-gold hover:text-navy text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200">
                    <Facebook size={15} /> Facebook
                  </a>
                  <a href={settings.youtube_url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/10 hover:bg-gold hover:text-navy text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200">
                    <Youtube size={15} /> YouTube
                  </a>
                </div>
              </div>
            </div>

            {/* Form + Map */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">
                {submitted ? (
                  <div className="text-center py-10 sm:py-12">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircle size={36} className="text-green-500" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-navy mb-3">Message Sent!</h3>
                    <p className="text-gray-500 mb-6 text-sm">We'll get back to you as soon as possible.</p>
                    <button onClick={() => setSubmitted(false)} className="px-6 py-3 bg-royal-blue text-white rounded-full font-semibold text-sm hover:bg-navy transition">
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg sm:text-xl font-bold text-navy mb-5 sm:mb-6">Send Us a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Your Name *</label>
                          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30 focus:border-royal-blue transition" placeholder="Full name" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Email Address *</label>
                          <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30 focus:border-royal-blue transition" placeholder="your@email.com" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Phone Number</label>
                          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30 focus:border-royal-blue transition" placeholder="+91 XXXXX XXXXX" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Subject *</label>
                          <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30 focus:border-royal-blue transition" placeholder="e.g. Admission Enquiry" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Message *</label>
                        <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30 focus:border-royal-blue transition resize-none" placeholder="Tell us how we can help you..." />
                      </div>
                      <button type="submit" className="w-full py-3.5 sm:py-4 bg-royal-blue text-white font-bold rounded-xl hover:bg-navy transition-all duration-300 shadow-lg text-sm">
                        Send Message
                      </button>
                    </form>
                  </>
                )}
              </motion.div>

              <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-56 sm:h-72">
                <iframe title="DIS Muzaffarpur Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3566.0867756994097!2d85.38412621503748!3d26.11876298346217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed2f5f1ede1555%3A0x7b72e39bb65d4d8b!2sMotijheel%2C%20Muzaffarpur%2C%20Bihar!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    lines: ["Shafi Manzil, Daudi Market", "Motijheel, Muzaffarpur", "Bihar 842001, India"],
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+91 621 224 3314"],
    link: "tel:+916212243314",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["daudischool.muz@gmail.com"],
    link: "mailto:daudischool.muz@gmail.com",
  },
  {
    icon: Clock,
    title: "School Hours",
    lines: ["Mon – Sat: 7:30 AM – 2:00 PM", "Office: 8:00 AM – 4:00 PM"],
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({ title: "Message Sent!", description: "Thank you for reaching out. We'll get back to you soon." });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you — reach out anytime"
        bgImage="https://images.unsplash.com/photo-1423592707957-3b212afa6733?w=1400&q=80"
      />

      {/* Contact Cards */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-7 border border-border hover:border-royal-blue/30 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-royal-blue/10 group-hover:bg-royal-blue/20 flex items-center justify-center mb-5 transition-colors">
                  <info.icon size={22} className="text-royal-blue" />
                </div>
                <h4 className="font-bold text-foreground mb-3 text-sm">{info.title}</h4>
                {info.lines.map((line, j) => (
                  info.link && j === 0 ? (
                    <a key={j} href={info.link} className="block text-muted-foreground text-sm hover:text-royal-blue transition-colors">{line}</a>
                  ) : (
                    <p key={j} className="text-muted-foreground text-sm">{line}</p>
                  )
                ))}
              </motion.div>
            ))}
          </div>

          {/* Map + Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden border border-border shadow-lg h-full min-h-[400px]"
            >
              <iframe
                title="Daudi International School Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.5!2d85.3863!3d26.119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed1778b56d38a5%3A0x6c5f87cf5cb7e65!2sMotijheel%2C%20Muzaffarpur%2C%20Bihar%20842001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 border border-border shadow-lg"
            >
              <h3 className="text-2xl font-black text-foreground mb-2">Send Us a Message</h3>
              <p className="text-muted-foreground text-sm mb-7">Have a question or feedback? We'd love to hear from you.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Full name"
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/40 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/40 transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/40 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/40 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Write your message here..."
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
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Daudi Welfare Trust banner */}
      <section className="py-14 bg-navy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <img
            src="https://media.base44.com/images/public/user_68a720ca6a1156f1068d37b1/9fb988c1a_dis.png"
            alt="DIS Logo"
            className="h-16 mx-auto mb-5"
          />
          <p className="text-white/60 text-sm">
            Daudi International School is a non-profit institution operating under the{" "}
            <span className="text-gold font-semibold">Daudi Welfare Trust</span>,
            Muzaffarpur, Bihar, India. Dedicated to serving the community through quality education.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
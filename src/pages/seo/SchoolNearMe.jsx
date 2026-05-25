import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Clock, Phone, Navigation } from "lucide-react";
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

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Where is Daudi International School located?", acceptedAnswer: { "@type": "Answer", text: "DIS is located at Shafi Manzil, Daudi Market, Motijheel, Muzaffarpur, Bihar 842001 — centrally situated and easily accessible from all parts of the city." } },
    { "@type": "Question", name: "What are the school timings?", acceptedAnswer: { "@type": "Answer", text: "School timings are Monday to Saturday, 8:00 AM to 3:00 PM." } },
    { "@type": "Question", name: "How do I get to DIS Muzaffarpur?", acceptedAnswer: { "@type": "Answer", text: "The school is located near Motijheel, a well-known area in central Muzaffarpur. You can search 'Daudi International School Muzaffarpur' on Google Maps for directions." } },
  ],
};

export default function SchoolNearMe() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "var(--font-inter)" }}>
      <SEOHead
        title="School Near Me Muzaffarpur | DIS at Motijheel"
        description="Looking for a top school near you in Muzaffarpur? Daudi International School is centrally located at Motijheel, Muzaffarpur — English-medium, non-profit, trusted since 2005."
        canonical="https://daudischool.in/school-near-me"
        schema={schema}
      />
      <Navbar />

      <section className="relative pt-[68px]" style={{ backgroundColor: "var(--cobalt-deep)", minHeight: "380px" }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <Breadcrumb crumbs={[{ label: "School Near Me" }]} />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px" style={{ backgroundColor: "var(--amber)" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,168,32,0.85)" }}>
                Motijheel · Muzaffarpur · Bihar
              </span>
            </div>
            <h1 className="font-inter font-bold text-white leading-tight mb-5" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", letterSpacing: "-0.02em" }}>
              The Best School Near You<br />
              <span className="font-fraunces italic" style={{ color: "var(--amber-light)" }}>in Muzaffarpur</span>
            </h1>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.58)", lineHeight: 1.75, maxWidth: "500px", marginBottom: "28px" }}>
              Centrally located at Motijheel, DIS is accessible from all neighbourhoods in Muzaffarpur. Quality English-medium education, right near you.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.google.com/maps/search/Daudi+International+School+Muzaffarpur"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-lg"
                style={{ backgroundColor: "var(--amber)", color: "var(--cobalt-deep)" }}>
                <Navigation size={14} /> Get Directions
              </a>
              <Link to="/admissions"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium rounded-lg"
                style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}>
                Apply for Admission
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Location info */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div {...fadeUp(0)}>
              <p className="label-stamp text-cobalt mb-4">Find us</p>
              <h2 className="font-inter font-bold text-ink tracking-tight mb-6" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>
                Centrally located,<br />
                <span className="font-fraunces italic" style={{ color: "var(--cobalt)" }}>easily accessible</span>
              </h2>
              <div className="space-y-4 mb-8">
                {[
                  { icon: <MapPin size={16} />, label: "Address", val: "Shafi Manzil, Daudi Market, Motijheel, Muzaffarpur, Bihar 842001" },
                  { icon: <Phone size={16} />, label: "Phone", val: "+91 621 224 3314" },
                  { icon: <Clock size={16} />, label: "School Hours", val: "Monday – Saturday: 8:00 AM – 3:00 PM" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: "var(--cream)" }}>
                    <div className="mt-0.5 shrink-0" style={{ color: "var(--amber)" }}>{item.icon}</div>
                    <div>
                      <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--ink-muted)" }}>{item.label}</p>
                      <p className="text-sm" style={{ color: "var(--ink-soft)" }}>{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/admissions"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm"
                style={{ backgroundColor: "var(--cobalt-deep)", color: "#fff" }}>
                Apply Now <ArrowRight size={14} />
              </Link>
            </motion.div>

            <motion.div {...fadeUp(0.1)}>
              <div className="rounded-2xl overflow-hidden shadow-xl" style={{ height: "400px" }}>
                <iframe
                  title="Daudi International School Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3566.2!2d85.3910!3d26.1197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDA3JzEwLjkiTiA4NcKwMjMnMjcuNiJF!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
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
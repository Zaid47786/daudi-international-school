import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, Target, Eye, Heart } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const coreValues = [
  "Integrity & Honesty",
  "Inclusive Education for All",
  "Academic Excellence",
  "Character & Discipline",
  "Community Service",
  "Holistic Development",
];

const milestones = [
  { year: "2005", event: "Daudi International School founded by Altamash Daudi under the Daudi Welfare Trust." },
  { year: "2008", event: "First batch of students completed primary education with outstanding results." },
  { year: "2012", event: "Received the Daudi International School Development and Extension Award." },
  { year: "2018", event: "Expanded to secondary classes; enrollment crossed 300 students." },
  { year: "2023", event: "Launched community scholarship program for underprivileged students." },
  { year: "2026", event: "500+ students enrolled; recognized as a leading non-profit institution in Muzaffarpur." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navbar />
      <PageHero
        title="About Us"
        subtitle="Our story, mission, and the people behind DIS"
        bgImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&q=80"
      />

      {/* Mission & Vision */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 text-royal-blue text-xs font-bold tracking-widest uppercase mb-4">
                <div className="h-px w-8 bg-gold" /> Our Story
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-5">
                A School Born from <span className="text-royal-blue">Purpose</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
                Daudi International School (DIS) was established with a singular vision: to provide quality English-medium education to children in Muzaffarpur, Bihar, regardless of their socioeconomic background. Founded under the aegis of the <strong>Daudi Welfare Trust</strong>, DIS operates as a fully non-profit institution.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
                Located in the heart of Motijheel, Muzaffarpur, the school has grown from a small community initiative into one of the most trusted educational institutions in the region, serving over 500 students each year.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                DIS is committed to holistic development — academic excellence, character building, and community participation go hand in hand at our school.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: Target, label: "Our Mission", text: "Provide quality, inclusive, English-medium education to all children in Muzaffarpur.", color: "bg-royal-blue" },
                { icon: Eye, label: "Our Vision", text: "A community where every child has equal access to knowledge and opportunity.", color: "bg-navy" },
                { icon: Heart, label: "Our Values", text: "Integrity, inclusivity, excellence, discipline, and community service.", color: "bg-gold" },
                { icon: CheckCircle, label: "Our Promise", text: "Every student receives dedicated attention, care, and a pathway to success.", color: "bg-royal-blue" },
              ].map((item, i) => (
                <div key={i} className={`${item.color === "bg-gold" ? "bg-gold text-navy" : `${item.color} text-white`} rounded-2xl p-4 sm:p-6 flex flex-col gap-2 sm:gap-3`}>
                  <item.icon size={24} className={item.color === "bg-gold" ? "text-navy" : "text-gold"} />
                  <div className="font-bold text-sm sm:text-base">{item.label}</div>
                  <p className="text-xs leading-relaxed opacity-80">{item.text}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://i.ytimg.com/vi/qXYJYEKhXTY/maxresdefault.jpg"
                  alt="Altamash Daudi - Founder"
                  className="w-full h-64 sm:h-80 md:h-96 object-cover object-top"
                  onError={(e) => { e.target.src = "https://i.ytimg.com/vi/qXYJYEKhXTY/hqdefault.jpg"; }}
                />
              </div>
              <div className="absolute -bottom-4 right-4 sm:-bottom-6 sm:-right-6 bg-navy rounded-2xl p-4 sm:p-5 shadow-xl">
                <div className="text-gold font-bold text-base sm:text-lg">Altamash Daudi</div>
                <div className="text-white/60 text-xs">Founder & Director</div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mt-8 lg:mt-0">
              <div className="inline-flex items-center gap-2 text-royal-blue text-xs font-bold tracking-widest uppercase mb-4">
                <div className="h-px w-8 bg-gold" /> Founder's Message
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-5">
                A Message from <span className="text-royal-blue">Altamash Daudi</span>
              </h2>
              <div className="text-4xl sm:text-5xl text-gold/30 font-playfair mb-2">"</div>
              <p className="text-gray-600 leading-relaxed mb-4 italic text-sm sm:text-base">
                When I founded Daudi International School, my dream was simple: to ensure that no child in Muzaffarpur would be denied a quality education due to financial constraints. Education is not a privilege — it is a right.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
                I invite parents to partner with us on this journey. Together, we can build a generation that will lead Bihar and India to greater heights.
              </p>
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-gold" />
                <span className="text-royal-blue font-bold text-sm">Altamash Daudi, Founder</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 text-royal-blue text-xs font-bold tracking-widest uppercase mb-3">
              <div className="h-px w-8 bg-gold" /> What We Stand For <div className="h-px w-8 bg-gold" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy">Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {coreValues.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 sm:px-5 py-3 sm:py-4 border border-gray-100">
                <CheckCircle size={16} className="text-gold flex-shrink-0" />
                <span className="text-navy font-medium text-sm">{v}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-14 sm:py-20 bg-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 text-gold text-xs font-bold tracking-widest uppercase mb-3">
              <div className="h-px w-8 bg-gold/40" /> Our Journey <div className="h-px w-8 bg-gold/40" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Milestones</h2>
          </div>
          <div className="relative pl-10 sm:pl-0">
            <div className="absolute left-4 sm:left-8 md:left-1/2 top-0 bottom-0 w-px bg-gold/20" />
            {milestones.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`relative flex items-start gap-4 sm:gap-6 mb-6 sm:mb-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="flex-1">
                  <div className={`bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5 ${i % 2 !== 0 ? "md:text-right" : ""}`}>
                    <div className="text-gold font-bold text-base sm:text-lg mb-1">{m.year}</div>
                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed">{m.event}</p>
                  </div>
                </div>
                <div className="absolute left-[-22px] sm:left-2 md:left-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-gold rounded-full border-4 border-navy -translate-x-1/2 mt-5" />
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Users, Clock, Award, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const levels = [
  {
    level: "Montessori",
    age: "Ages 3–5",
    desc: "A Montessori-based foundational program focused on motor skills, language, creativity, and social development through child-led, hands-on learning.",
    subjects: ["English", "Hindi", "Basic Maths", "Drawing & Art", "Sensorial Activities", "Practical Life"],
    color: "bg-yellow-50 border-yellow-200",
    accent: "text-yellow-600",
    badge: "bg-yellow-100 text-yellow-700",
  },
  {
    level: "Primary (Class I – V)",
    age: "Ages 6–10",
    desc: "Core academic foundation with emphasis on literacy, numeracy, and environmental studies.",
    subjects: ["English", "Hindi", "Mathematics", "EVS / Science", "Social Studies", "Computer Basics"],
    color: "bg-blue-50 border-blue-200",
    accent: "text-royal-blue",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    level: "Middle School (VI – VIII)",
    age: "Ages 11–13",
    desc: "Deepening subject knowledge with introduction to sciences, social sciences, and creative arts.",
    subjects: ["English", "Hindi", "Mathematics", "Science", "Social Science", "Computer Science", "Sanskrit"],
    color: "bg-purple-50 border-purple-200",
    accent: "text-purple-700",
    badge: "bg-purple-100 text-purple-700",
  },
  {
    level: "Secondary (Class IX – X)",
    age: "Ages 14–15",
    desc: "Board-aligned comprehensive curriculum preparing students for secondary examinations.",
    subjects: ["English", "Hindi", "Mathematics", "Science", "Social Science", "Computer Applications"],
    color: "bg-green-50 border-green-200",
    accent: "text-green-700",
    badge: "bg-green-100 text-green-700",
  },
];

const features = [
  { icon: BookOpen, title: "English Medium", desc: "All subjects taught in English to prepare students for global opportunities." },
  { icon: Users, title: "Small Class Sizes", desc: "Low student-to-teacher ratios ensure personalized attention for each child." },
  { icon: Clock, title: "Co-curricular", desc: "Sports, arts, debate, and cultural events complement academic learning." },
  { icon: Award, title: "Board Exam Prep", desc: "Structured coaching and mock tests for BSEB secondary board examinations." },
];

export default function Academics() {
  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navbar />
      <PageHero
        title="Academics"
        subtitle="A world-class curriculum designed for holistic development"
        bgImage="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400&q=80"
      />

      {/* Philosophy */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-royal-blue text-xs font-bold tracking-widest uppercase mb-4">
              <div className="h-px w-8 bg-gold" /> Teaching Philosophy <div className="h-px w-8 bg-gold" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-5">
              Education Beyond <span className="text-royal-blue">Textbooks</span>
            </h2>
            <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
              At DIS, we believe true education goes beyond rote learning. Our English-medium curriculum integrates critical thinking, creativity, and character development — preparing learners not just for examinations, but for life.
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum Features */}
      <section className="py-10 sm:py-12 bg-royal-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center px-2 sm:px-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-3 sm:mb-4">
                  <f.icon size={22} className="text-gold" />
                </div>
                <h3 className="text-white font-bold mb-1 sm:mb-2 text-sm sm:text-base">{f.title}</h3>
                <p className="text-white/60 text-xs leading-relaxed hidden sm:block">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Grade Levels */}
      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 text-royal-blue text-xs font-bold tracking-widest uppercase mb-3">
              <div className="h-px w-8 bg-gold" /> Curriculum Structure <div className="h-px w-8 bg-gold" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy">Grade Levels & Programs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {levels.map((lv, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`rounded-2xl border-2 p-5 sm:p-7 ${lv.color} hover:shadow-xl transition-all duration-300`}>
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <div>
                    <h3 className="font-bold text-lg sm:text-xl text-navy mb-1">{lv.level}</h3>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${lv.badge}`}>{lv.age}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 sm:mb-5">{lv.desc}</p>
                <div>
                  <div className={`text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3 ${lv.accent}`}>Subjects</div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {lv.subjects.map((s, j) => (
                      <span key={j} className="bg-white/80 text-navy text-xs px-2.5 sm:px-3 py-1 rounded-full border border-gray-200 font-medium">{s}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Co-curricular */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-royal-blue text-xs font-bold tracking-widest uppercase mb-4">
                <div className="h-px w-8 bg-gold" /> Beyond the Classroom
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-5">Co-Curricular Activities</h2>
              <p className="text-gray-600 leading-relaxed mb-5 sm:mb-6 text-sm sm:text-base">
                DIS believes in nurturing the complete child. Our co-curricular program provides students opportunities to explore their talents in sports, arts, culture, and leadership.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {["Annual Sports Day", "Republic Day Parade", "Cultural Festivals", "Science Fair", "Debate Club", "Art & Craft", "Music & Dance", "Community Service"].map((act, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                    <ChevronRight size={13} className="text-gold flex-shrink-0" />
                    {act}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80"
                alt="Students activities"
                className="w-full h-56 sm:h-72 md:h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-16 bg-gradient-to-r from-navy to-royal-blue text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Enroll Your Child Today</h2>
          <p className="text-white/70 mb-8 text-sm sm:text-base">Give your child the gift of quality English-medium education at DIS Muzaffarpur.</p>
          <Link to="/admissions" className="inline-block px-8 sm:px-10 py-3.5 sm:py-4 bg-gold text-navy font-bold rounded-full hover:bg-gold-dark transition-all hover:scale-105 shadow-xl text-sm sm:text-base">
            Start Admission Process
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
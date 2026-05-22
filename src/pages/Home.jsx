import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Users, Award, Heart, ArrowRight, Calendar, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const stats = [
  { icon: BookOpen, label: "Years of Excellence", value: "10+" },
  { icon: Users, label: "Students Enrolled", value: "500+" },
  { icon: Award, label: "Programs Offered", value: "12+" },
  { icon: Heart, label: "Non-Profit Mission", value: "100%" },
];

const values = [
  { title: "Quality Education", desc: "English-medium instruction with a holistic curriculum designed to unlock every child's potential.", icon: "📚" },
  { title: "Inclusive Community", desc: "A non-profit school committed to making quality education accessible to all students in Muzaffarpur.", icon: "🤝" },
  { title: "Character Building", desc: "We nurture not just academic excellence but strong values, discipline, and civic responsibility.", icon: "⭐" },
  { title: "Modern Learning", desc: "Contemporary teaching methods combined with traditional values for a well-rounded education.", icon: "🎓" },
];

const upcomingEvents = [
  { date: "Jan 26", title: "Republic Day Celebration", desc: "Annual Republic Day parade and cultural program with students and staff." },
  { date: "Mar 15", title: "Annual Science Fair", desc: "Students showcase innovative science projects and experiments." },
  { date: "Apr 5", title: "Annual Sports Day", desc: "Inter-house athletic competitions and prize distribution ceremony." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navbar />

      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(13,36,86,0.95) 0%, rgba(26,58,143,0.88) 60%, rgba(13,36,86,0.95) 100%), url(https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-royal-blue/30 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex flex-col lg:flex-row items-center gap-12">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              <span className="text-gold text-xs font-semibold tracking-widest uppercase">
                Admissions Open 2026–27
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Daudi <span className="text-gold">International</span>{" "}
              School
            </h1>
            <p className="text-white/60 text-sm font-semibold tracking-widest uppercase mb-4">
              Muzaffarpur, Bihar — Non-Profit English Medium School
            </p>
            <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Empowering young minds with quality education, strong values, and a vision for a brighter tomorrow — under the Daudi Welfare Trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/admissions"
                className="px-8 py-4 bg-gold text-navy font-bold rounded-full hover:bg-gold-dark transition-all duration-300 shadow-xl hover:shadow-gold/40 hover:scale-105 text-sm"
              >
                Apply Now →
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:border-gold hover:text-gold transition-all duration-300 text-sm"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Right — Logo Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-white/10 backdrop-blur-sm border-2 border-gold/30 flex items-center justify-center shadow-2xl">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/10 to-transparent" />
              <img
                src="https://media.base44.com/images/public/user_68a720ca6a1156f1068d37b1/9fb988c1a_dis.png"
                alt="DIS Logo"
                className="w-48 md:w-60 h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-8 bg-white/30" />
          <div className="w-4 h-4 border-2 border-white/30 border-t-0 border-l-0 rotate-45" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-royal-blue py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <s.icon className="w-8 h-8 text-gold mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">{s.value}</div>
                <div className="text-white/60 text-sm mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-royal-blue text-xs font-bold tracking-widest uppercase mb-3">
              <div className="h-px w-8 bg-gold" /> Why Choose DIS <div className="h-px w-8 bg-gold" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              Building Tomorrow's <span className="text-royal-blue">Leaders</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl border border-gray-100 hover:border-gold/30 transition-all duration-300 group"
              >
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-navy text-lg mb-2 group-hover:text-royal-blue transition-colors">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Quote */}
      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-royal-blue/30 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="text-6xl text-gold/30 font-playfair mb-4">"</div>
          <p className="text-white text-xl md:text-2xl font-light leading-relaxed italic mb-8">
            Education is the most powerful weapon which you can use to change the world. At Daudi International School, we believe every child deserves a chance to rise.
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gold/40" />
            <div>
              <div className="text-gold font-bold">Altamash Daudi</div>
              <div className="text-white/50 text-sm">Founder, Daudi International School</div>
            </div>
            <div className="h-px w-12 bg-gold/40" />
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-royal-blue text-xs font-bold tracking-widest uppercase mb-2">
                <div className="h-px w-8 bg-gold" /> Upcoming Events
              </div>
              <h2 className="text-3xl font-bold text-navy">School Calendar</h2>
            </div>
            <Link to="/events" className="flex items-center gap-2 text-royal-blue font-semibold hover:text-gold transition-colors text-sm">
              View All Events <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5 bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-royal-blue/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-royal-blue flex flex-col items-center justify-center text-white">
                  <Calendar size={14} className="text-gold mb-0.5" />
                  <span className="text-xs font-bold">{ev.date}</span>
                </div>
                <div>
                  <h3 className="font-bold text-navy text-sm mb-1">{ev.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{ev.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-royal-blue to-navy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Join the <span className="text-gold">DIS Family?</span>
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Admissions are open for the 2026–27 academic year. Secure your child's future today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/admissions"
              className="px-10 py-4 bg-gold text-navy font-bold rounded-full hover:bg-gold-dark transition-all duration-300 shadow-xl hover:scale-105"
            >
              Apply for Admission
            </Link>
            <Link
              to="/contact"
              className="px-10 py-4 border-2 border-white/40 text-white font-semibold rounded-full hover:border-gold hover:text-gold transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Users, Award, Heart, Star, Globe, Trophy, ArrowRight, Calendar } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSettings, useStats, useEvents } from "../lib/useSchoolData";

const ICON_MAP = { BookOpen, Users, Award, Heart, Star, Globe, Trophy };

export default function Home() {
  const { settings } = useSettings();
  const { stats } = useStats();
  const { events: upcomingEvents } = useEvents("upcoming");

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
        <div className="absolute top-20 right-10 w-64 md:w-96 h-64 md:h-96 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-56 md:w-80 h-56 md:h-80 rounded-full bg-royal-blue/30 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 rounded-full px-4 py-1.5 mb-5">
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              <span className="text-gold text-xs font-semibold tracking-widest uppercase">{settings.hero_badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              {settings.school_name?.split(" ").slice(0, 1).join(" ")}{" "}
              <span className="text-gold">{settings.school_name?.split(" ").slice(1, 2).join(" ")}</span>{" "}
              {settings.school_name?.split(" ").slice(2).join(" ")}
            </h1>
            <p className="text-white/60 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4">{settings.tagline}</p>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">{settings.hero_description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/admissions" className="px-7 py-3.5 sm:px-8 sm:py-4 bg-gold text-navy font-bold rounded-full hover:bg-gold-dark transition-all duration-300 shadow-xl hover:shadow-gold/40 hover:scale-105 text-sm text-center">
                Apply Now →
              </Link>
              <Link to="/about" className="px-7 py-3.5 sm:px-8 sm:py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:border-gold hover:text-gold transition-all duration-300 text-sm text-center">
                Learn More
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-white/10 backdrop-blur-sm border-2 border-gold/30 flex items-center justify-center shadow-2xl">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/10 to-transparent" />
              <img
                src="https://media.base44.com/images/public/user_68a720ca6a1156f1068d37b1/9fb988c1a_dis.png"
                alt="DIS Logo"
                className="w-36 sm:w-48 md:w-60 h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce hidden sm:flex">
          <div className="w-px h-8 bg-white/30" />
          <div className="w-4 h-4 border-2 border-white/30 border-t-0 border-l-0 rotate-45" />
        </div>
      </section>

      {/* Stats */}
      {stats.length > 0 && (
        <section className="bg-royal-blue py-10 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((s, i) => {
                const Icon = ICON_MAP[s.icon] || Star;
                return (
                  <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center px-2">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-gold mx-auto mb-2" />
                    <div className="text-2xl sm:text-3xl font-bold text-white">{s.value}</div>
                    <div className="text-white/60 text-xs sm:text-sm mt-1">{s.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Founder Quote */}
      <section className="py-16 sm:py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-royal-blue/30 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl sm:text-6xl text-gold/30 font-playfair mb-4">"</div>
          <p className="text-white text-lg sm:text-xl md:text-2xl font-light leading-relaxed italic mb-8 px-2">
            {settings.founder_quote}
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-8 sm:w-12 bg-gold/40" />
            <div>
              <div className="text-gold font-bold text-sm sm:text-base">Altamash Daudi</div>
              <div className="text-white/50 text-xs">Founder, Daudi International School</div>
            </div>
            <div className="h-px w-8 sm:w-12 bg-gold/40" />
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 sm:mb-12 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-royal-blue text-xs font-bold tracking-widest uppercase mb-2">
                  <div className="h-px w-8 bg-gold" /> Upcoming Events
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-navy">School Calendar</h2>
              </div>
              <Link to="/events" className="flex items-center gap-2 text-royal-blue font-semibold hover:text-gold transition-colors text-sm whitespace-nowrap">
                View All Events <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {upcomingEvents.slice(0, 3).map((ev, i) => (
                <motion.div key={ev.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex gap-4 bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-royal-blue/20 hover:shadow-lg transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-royal-blue flex flex-col items-center justify-center text-white">
                    <Calendar size={13} className="text-gold mb-0.5" />
                    <span className="text-[10px] font-bold text-center leading-tight px-1">{ev.date?.split(",")[0] || ev.date}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-navy text-sm mb-1 leading-snug">{ev.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{ev.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-14 sm:py-16 bg-gradient-to-r from-royal-blue to-navy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Join the <span className="text-gold">DIS Family?</span>
          </h2>
          <p className="text-white/70 mb-8 text-base sm:text-lg">{settings.hero_badge} — Secure your child's future today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/admissions" className="px-8 sm:px-10 py-3.5 sm:py-4 bg-gold text-navy font-bold rounded-full hover:bg-gold-dark transition-all duration-300 shadow-xl hover:scale-105 text-sm sm:text-base">
              Apply for Admission
            </Link>
            <Link to="/contact" className="px-8 sm:px-10 py-3.5 sm:py-4 border-2 border-white/40 text-white font-semibold rounded-full hover:border-gold hover:text-gold transition-all duration-300 text-sm sm:text-base">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
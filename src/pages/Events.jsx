import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const upcomingEvents = [
  {
    date: "January 26, 2025",
    title: "Republic Day Celebration",
    time: "9:00 AM",
    location: "School Ground, DIS Muzaffarpur",
    desc: "Our annual Republic Day celebration features a flag hoisting ceremony, student parade, patriotic songs, and cultural performances. All parents are warmly invited to attend.",
    category: "National Event",
    color: "bg-blue-50 border-blue-200",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    date: "February 14, 2025",
    title: "Annual Science Exhibition",
    time: "10:00 AM – 4:00 PM",
    location: "School Hall, DIS Muzaffarpur",
    desc: "Students from Class V to X showcase innovative science projects and experiments. Judges from local colleges will evaluate entries for prizes.",
    category: "Academic",
    color: "bg-green-50 border-green-200",
    badge: "bg-green-100 text-green-700",
  },
  {
    date: "March 10, 2025",
    title: "Annual Sports Day",
    time: "8:00 AM",
    location: "School Ground, DIS Muzaffarpur",
    desc: "Inter-house athletic competitions including track events, team sports, and fun activities. Prize distribution ceremony follows the events.",
    category: "Sports",
    color: "bg-orange-50 border-orange-200",
    badge: "bg-orange-100 text-orange-700",
  },
  {
    date: "April 5, 2025",
    title: "Annual Cultural Day",
    time: "4:00 PM",
    location: "School Auditorium",
    desc: "A grand cultural evening featuring student performances — drama, dance, music, and poetry. The event celebrates the rich cultural heritage of Bihar.",
    category: "Cultural",
    color: "bg-purple-50 border-purple-200",
    badge: "bg-purple-100 text-purple-700",
  },
];

const pastEvents = [
  { date: "August 15, 2024", title: "Independence Day Celebration", category: "National Event", desc: "Flag hoisting, patriotic performances, and prize distribution for academic achievers." },
  { date: "October 2024", title: "Diwali & Eid Celebration", category: "Cultural", desc: "A joint celebration of Diwali and Eid, promoting communal harmony and unity among students." },
  { date: "November 14, 2024", title: "Children's Day Celebration", category: "School Event", desc: "Teachers performed for students as a special treat — skits, songs, and fun games." },
  { date: "December 20, 2024", title: "Annual Prize Distribution", category: "Academic", desc: "Annual ceremony honouring top academic performers, sports champions, and students showing exemplary character." },
  { date: "January 26, 2024", title: "Republic Day Parade", category: "National Event", desc: "Vibrant Republic Day parade and cultural program attended by community dignitaries." },
  { date: "March 2024", title: "Daudi Welfare Trust Annual Day", category: "Trust Event", desc: "Annual gathering of the Daudi Welfare Trust featuring the School Development and Extension Awards." },
];

export default function Events() {
  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navbar />
      <PageHero
        title="Events"
        subtitle="Celebrations, competitions, and community milestones"
        bgImage="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&q=80"
      />

      {/* Upcoming Events */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-royal-blue text-xs font-bold tracking-widest uppercase mb-3">
              <div className="h-px w-8 bg-gold" /> Mark Your Calendar <div className="h-px w-8 bg-gold" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">Upcoming Events</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl border-2 p-7 hover:shadow-xl transition-all duration-300 ${ev.color}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${ev.badge}`}>{ev.category}</span>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                      <Calendar size={12} /> {ev.date}
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                      <Clock size={12} /> {ev.time}
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-navy text-xl mb-3">{ev.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{ev.desc}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <MapPin size={12} className="text-royal-blue" />
                  {ev.location}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-royal-blue text-xs font-bold tracking-widest uppercase mb-3">
              <div className="h-px w-8 bg-gold" /> Looking Back <div className="h-px w-8 bg-gold" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">Past Events</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pastEvents.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={14} className="text-gold" />
                  <span className="text-gray-400 text-xs">{ev.date}</span>
                </div>
                <h3 className="font-bold text-navy mb-2 group-hover:text-royal-blue transition-colors">{ev.title}</h3>
                <span className="inline-block text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full mb-3">{ev.category}</span>
                <p className="text-gray-500 text-xs leading-relaxed">{ev.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Republic Day Banner */}
      <section
        className="py-20 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(13,36,86,0.95) 0%, rgba(26,58,143,0.85) 100%), url(https://images.unsplash.com/photo-1531685250784-7569952593d2?w=1400&q=80)`,
          backgroundSize: "cover", backgroundPosition: "center",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-gold text-xs font-bold tracking-widest uppercase mb-3">Featured Event</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Republic Day Celebration 2025</h2>
          <p className="text-white/70 text-lg mb-8 leading-relaxed">
            Join us on January 26, 2025 for our vibrant Republic Day celebration — a tribute to our nation's spirit, featuring student parades, cultural performances, and patriotic speeches.
          </p>
          <div className="inline-flex items-center gap-3 bg-gold/20 border border-gold/40 rounded-full px-6 py-3 text-gold font-semibold">
            <Calendar size={18} /> January 26, 2025 · 9:00 AM · School Ground
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
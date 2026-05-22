import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import { useEvents } from "../lib/useSchoolData";

const CATEGORY_COLORS = {
  "National Event": "bg-blue-100 text-blue-700",
  "Academic": "bg-green-100 text-green-700",
  "Sports": "bg-orange-100 text-orange-700",
  "Cultural": "bg-purple-100 text-purple-700",
  "Trust Event": "bg-yellow-100 text-yellow-700",
  "School Event": "bg-gray-100 text-gray-700",
};

const CARD_COLORS = {
  "National Event": "bg-blue-50 border-blue-200",
  "Academic": "bg-green-50 border-green-200",
  "Sports": "bg-orange-50 border-orange-200",
  "Cultural": "bg-purple-50 border-purple-200",
  "Trust Event": "bg-yellow-50 border-yellow-200",
  "School Event": "bg-gray-50 border-gray-200",
};

export default function Events() {
  const { events: upcoming } = useEvents("upcoming");
  const { events: past } = useEvents("past");
  const featured = [...upcoming, ...past].find((e) => e.featured);

  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navbar />
      <PageHero
        title="Events"
        subtitle="Celebrations, competitions, and community milestones"
        bgImage="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&q=80"
      />

      {/* Upcoming Events */}
      {upcoming.length > 0 && (
        <section className="py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-2 text-royal-blue text-xs font-bold tracking-widest uppercase mb-3">
                <div className="h-px w-8 bg-gold" /> Mark Your Calendar <div className="h-px w-8 bg-gold" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy">Upcoming Events</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {upcoming.map((ev, i) => (
                <motion.div key={ev.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className={`rounded-2xl border-2 p-5 sm:p-7 hover:shadow-xl transition-all duration-300 ${CARD_COLORS[ev.category] || "bg-gray-50 border-gray-200"}`}>
                  <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4 flex-wrap">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${CATEGORY_COLORS[ev.category] || "bg-gray-100 text-gray-700"}`}>{ev.category}</span>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-gray-500 text-xs mb-1 justify-end"><Calendar size={11} /> {ev.date}</div>
                      {ev.time && <div className="flex items-center gap-1 text-gray-500 text-xs justify-end"><Clock size={11} /> {ev.time}</div>}
                    </div>
                  </div>
                  <h3 className="font-bold text-navy text-lg sm:text-xl mb-2 sm:mb-3">{ev.title}</h3>
                  {ev.description && <p className="text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4">{ev.description}</p>}
                  {ev.location && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin size={11} className="text-royal-blue flex-shrink-0" />{ev.location}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Events */}
      {past.length > 0 && (
        <section className="py-14 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-2 text-royal-blue text-xs font-bold tracking-widest uppercase mb-3">
                <div className="h-px w-8 bg-gold" /> Looking Back <div className="h-px w-8 bg-gold" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy">Past Events</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {past.map((ev, i) => (
                <motion.div key={ev.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={13} className="text-gold" />
                    <span className="text-gray-400 text-xs">{ev.date}</span>
                  </div>
                  <h3 className="font-bold text-navy mb-2 text-sm sm:text-base group-hover:text-royal-blue transition-colors leading-snug">{ev.title}</h3>
                  <span className="inline-block text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full mb-3">{ev.category}</span>
                  {ev.description && <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">{ev.description}</p>}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Event Banner */}
      {featured && (
        <section className="py-14 sm:py-20 relative overflow-hidden"
          style={{ backgroundImage: `linear-gradient(to right, rgba(13,36,86,0.95) 0%, rgba(26,58,143,0.85) 100%), url(https://images.unsplash.com/photo-1531685250784-7569952593d2?w=1400&q=80)`, backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="text-gold text-xs font-bold tracking-widest uppercase mb-3">Featured Event</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">{featured.title}</h2>
            {featured.description && <p className="text-white/70 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">{featured.description}</p>}
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-gold/20 border border-gold/40 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 text-gold font-semibold text-sm flex-wrap justify-center">
              <Calendar size={16} /> {featured.date} {featured.time && `· ${featured.time}`} {featured.location && `· ${featured.location}`}
            </div>
          </div>
        </section>
      )}

      {upcoming.length === 0 && past.length === 0 && (
        <section className="py-32 text-center text-gray-400">
          <p className="text-lg">No events have been added yet.</p>
        </section>
      )}

      <Footer />
    </div>
  );
}
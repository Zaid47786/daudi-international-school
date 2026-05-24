import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import { useEvents } from "../lib/useSchoolData";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
});

const CATEGORY_COLOR = {
  "National Event": "#3b82f6",
  "Academic": "#10b981",
  "Sports": "#f97316",
  "Cultural": "#a855f7",
  "Trust Event": "var(--amber)",
  "School Event": "#9ca3af",
};

export default function Events() {
  const { events: upcoming } = useEvents("upcoming");
  const { events: past } = useEvents("past");
  const featured = [...upcoming, ...past].find((e) => e.featured);

  return (
    <div className="min-h-screen bg-white font-inter">
      <Navbar />
      <PageHero
        title="Events"
        subtitle="Celebrations, competitions, and milestones from the DIS calendar"
        bgImage="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&q=80"
      />

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="flex items-end justify-between gap-4 mb-12 border-b border-gray-100 pb-7">
              <div>
                <p className="label-stamp text-cobalt mb-3">On the horizon</p>
                <h2 className="font-inter font-bold text-ink tracking-tight"
                  style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
                  Upcoming Events
                </h2>
              </div>
            </div>

            <div className="space-y-0">
              {upcoming.map((ev, i) => (
                <motion.div key={ev.id} {...fadeUp(i * 0.07)}
                  className="grid grid-cols-12 gap-4 sm:gap-8 items-start py-7 border-b border-gray-100 group hover:bg-slate-light/40 -mx-3 px-3 rounded transition-colors duration-200">
                  {/* Date */}
                  <div className="col-span-4 sm:col-span-2">
                    <div className="text-cobalt font-bold text-lg leading-none">{ev.date?.split(",")[0] || ev.date?.split(" ")[0] || "—"}</div>
                    <div className="text-ink-muted text-[11px] mt-1 leading-tight">{ev.date?.split(" ").slice(1, 3).join(" ")}</div>
                    {ev.time && <div className="text-ink-muted text-[11px] mt-1">{ev.time}</div>}
                  </div>

                  {/* Dot */}
                  <div className="col-span-1 hidden sm:flex justify-center pt-2">
                    <div className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: CATEGORY_COLOR[ev.category] || "#9ca3af" }} />
                  </div>

                  {/* Content */}
                  <div className="col-span-8 sm:col-span-9">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <h3 className="font-semibold text-ink text-[15px] leading-snug group-hover:text-cobalt transition-colors">{ev.title}</h3>
                        {ev.location && (
                          <div className="flex items-center gap-1 text-ink-muted text-xs mt-1.5">
                            <MapPin size={10} /> {ev.location}
                          </div>
                        )}
                        {ev.description && (
                          <p className="text-ink-soft text-[13px] leading-relaxed mt-2 max-w-lg line-clamp-2">{ev.description}</p>
                        )}
                      </div>
                      <span className="flex-shrink-0 text-[11px] font-semibold text-ink-muted bg-slate-light px-2.5 py-1 rounded-full hidden sm:inline-block">{ev.category}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured banner */}
      {featured && (
        <section className="bg-cobalt-deep py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-gradient-to-l from-amber/5 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative">
            <div className="max-w-2xl">
              <p className="label-stamp text-amber/70 mb-5">Featured event</p>
              <h2 className="font-inter font-bold text-white tracking-tight mb-5"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)" }}>{featured.title}</h2>
              {featured.description && (
                <p className="text-white/60 text-[15px] leading-relaxed mb-8">{featured.description}</p>
              )}
              <div className="flex flex-wrap gap-5 text-sm text-white/60">
                {featured.date && <span className="flex items-center gap-2"><Calendar size={14} className="text-amber/70" />{featured.date}</span>}
                {featured.time && <span className="flex items-center gap-2"><Clock size={14} className="text-amber/70" />{featured.time}</span>}
                {featured.location && <span className="flex items-center gap-2"><MapPin size={14} className="text-amber/70" />{featured.location}</span>}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Past Events */}
      {past.length > 0 && (
        <section className="py-20 sm:py-28 bg-cream">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="mb-12 border-b border-gray-200 pb-7">
              <p className="label-stamp text-cobalt mb-3">Looking back</p>
              <h2 className="font-inter font-bold text-ink tracking-tight"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>Past Events</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {past.map((ev, i) => (
                <motion.div key={ev.id} {...fadeUp(i * 0.06)}
                  className="bg-white rounded-lg p-5 border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 group">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: CATEGORY_COLOR[ev.category] || "#9ca3af" }} />
                    <span className="text-ink-muted text-[11px] font-semibold tracking-wide uppercase">{ev.category}</span>
                  </div>
                  <h3 className="font-semibold text-ink text-[14px] leading-snug mb-2 group-hover:text-cobalt transition-colors">{ev.title}</h3>
                  <div className="text-ink-muted text-xs">{ev.date}</div>
                  {ev.description && (
                    <p className="text-ink-soft text-[12px] leading-relaxed mt-2.5 line-clamp-2">{ev.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {upcoming.length === 0 && past.length === 0 && (
        <section className="py-40 text-center text-ink-muted">
          <p>No events have been added yet.</p>
        </section>
      )}

      <Footer />
    </div>
  );
}
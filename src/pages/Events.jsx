import { motion } from "framer-motion";
import { Calendar, Tag } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const events = [
  {
    title: "Annual Day Celebration 2024",
    date: "December 15, 2024",
    category: "Annual Event",
    status: "upcoming",
    desc: "A grand celebration of academic achievements, cultural performances, dance, music, and prize distribution for students across all grades.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  },
  {
    title: "Science Exhibition & Fair",
    date: "November 20, 2024",
    category: "Academic",
    status: "upcoming",
    desc: "Students present innovative science projects and experiments. Open to parents and community members. Best project wins the DIS Science Trophy.",
    image: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=600&q=80",
  },
  {
    title: "Sports Day 2024",
    date: "November 5, 2024",
    category: "Sports",
    status: "upcoming",
    desc: "Inter-house sports competitions including track & field, cricket, kabaddi, and more. Celebrating physical fitness and team spirit.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80",
  },
  {
    title: "Republic Day Celebration 2024",
    date: "January 26, 2024",
    category: "National Event",
    status: "past",
    desc: "A patriotic celebration with flag hoisting, parade, cultural program, and speeches by students and teachers. A proud moment for the DIS family.",
    image: "https://images.unsplash.com/photo-1587502537745-84b86da1204f?w=600&q=80",
  },
  {
    title: "Independence Day Celebration",
    date: "August 15, 2024",
    category: "National Event",
    status: "past",
    desc: "Students performed patriotic songs, skits, and speeches celebrating India's independence. The event united students, parents, and staff.",
    image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=600&q=80",
  },
  {
    title: "Teachers' Day Celebration",
    date: "September 5, 2024",
    category: "School Event",
    status: "past",
    desc: "Students honored their teachers with heartfelt performances, speeches, and gratitude as part of the Dr. S. Radhakrishnan Teachers' Day tradition.",
    image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=600&q=80",
  },
  {
    title: "DIS Development Award Ceremony 2018",
    date: "2018",
    category: "Award",
    status: "past",
    desc: "The prestigious Daudi International School Development and Extension Award presented by the Board of Directors of Daudi Welfare Trust, Muzaffarpur.",
    image: "https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=600&q=80",
  },
  {
    title: "Annual Examination & Result Day",
    date: "March 2024",
    category: "Academic",
    status: "past",
    desc: "End-of-year examinations followed by result declaration and recognition of top academic performers with merit certificates and scholarships.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
  },
];

const categoryColors = {
  "Annual Event": "bg-purple-100 text-purple-800",
  "Academic": "bg-blue-100 text-blue-800",
  "Sports": "bg-green-100 text-green-800",
  "National Event": "bg-orange-100 text-orange-800",
  "School Event": "bg-yellow-100 text-yellow-800",
  "Award": "bg-gold/20 text-yellow-800",
};

export default function Events() {
  const upcoming = events.filter((e) => e.status === "upcoming");
  const past = events.filter((e) => e.status === "past");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        title="Events"
        subtitle="Celebrating learning, culture, and community throughout the year"
        bgImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80"
      />

      {/* Upcoming Events */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-3 h-8 bg-gold rounded-full" />
            <h2 className="text-2xl md:text-3xl font-black text-foreground">Upcoming Events</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {upcoming.map((ev, i) => (
              <motion.div
                key={ev.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden h-44">
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-gold text-navy text-xs font-bold rounded-full shadow">
                      Upcoming
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColors[ev.category]}`}>
                      <Tag size={10} className="inline mr-1" />{ev.category}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground text-xs">
                      <Calendar size={12} />{ev.date}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground mb-2 text-base">{ev.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{ev.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-3 h-8 bg-muted-foreground/30 rounded-full" />
            <h2 className="text-2xl md:text-3xl font-black text-foreground">Past Events</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {past.map((ev, i) => (
              <motion.div
                key={ev.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative overflow-hidden h-40">
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-semibold rounded-full">
                      Past
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColors[ev.category]}`}>
                      {ev.category}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground text-xs">
                      <Calendar size={11} />{ev.date}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground mb-2 text-sm">{ev.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{ev.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
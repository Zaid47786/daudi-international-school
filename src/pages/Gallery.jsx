import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const categories = ["All", "Campus", "Events", "Classroom", "Sports", "Community"];

const photos = [
  { url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80", title: "School Building", cat: "Campus" },
  { url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80", title: "Students in Class", cat: "Classroom" },
  { url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80", title: "Learning Together", cat: "Classroom" },
  { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", title: "Annual Day Celebration", cat: "Events" },
  { url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80", title: "Sports Day", cat: "Sports" },
  { url: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&q=80", title: "Teachers' Day", cat: "Events" },
  { url: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800&q=80", title: "Independence Day", cat: "Events" },
  { url: "https://images.unsplash.com/photo-1587502537745-84b86da1204f?w=800&q=80", title: "Republic Day Flag Hoisting", cat: "Events" },
  { url: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80", title: "School Library", cat: "Campus" },
  { url: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=800&q=80", title: "Science Exhibition", cat: "Events" },
  { url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80", title: "Examination Hall", cat: "Classroom" },
  { url: "https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=800&q=80", title: "Award Ceremony", cat: "Events" },
  { url: "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?w=800&q=80", title: "Football Tournament", cat: "Sports" },
  { url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80", title: "Campus Grounds", cat: "Campus" },
  { url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80", title: "Community Outreach", cat: "Community" },
  { url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80", title: "School Entrance", cat: "Campus" },
  { url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80", title: "Art & Craft Class", cat: "Classroom" },
  { url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80", title: "Community Program", cat: "Community" },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered = activeCategory === "All" ? photos : photos.filter((p) => p.cat === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        title="Gallery"
        subtitle="Glimpses of life, learning, and celebrations at DIS Muzaffarpur"
        bgImage="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1400&q=80"
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-royal-blue text-white shadow-lg"
                    : "bg-card border border-border text-muted-foreground hover:border-royal-blue/40 hover:text-royal-blue"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {filtered.map((photo, i) => (
                <motion.div
                  key={photo.url}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.04 }}
                  className="group relative rounded-xl overflow-hidden cursor-pointer bg-muted aspect-square"
                  onClick={() => setLightbox(photo)}
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/60 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2 text-white">
                      <ZoomIn size={22} />
                      <span className="text-xs font-medium text-center px-2">{photo.title}</span>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-2 py-0.5 bg-gold text-navy text-xs font-semibold rounded-full">
                      {photo.cat}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
              >
                <X size={28} />
              </button>
              <img
                src={lightbox.url}
                alt={lightbox.title}
                className="w-full rounded-xl object-contain max-h-[80vh]"
              />
              <p className="text-white/70 text-center mt-4 text-sm">{lightbox.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
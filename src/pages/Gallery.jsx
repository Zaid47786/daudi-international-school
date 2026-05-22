import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const categories = ["All", "Campus", "Events", "Classrooms", "Sports", "Cultural"];

const photos = [
  // Campus
  { src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80", cat: "Campus", title: "School Building" },
  { src: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80", cat: "Campus", title: "School Entrance" },
  { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80", cat: "Campus", title: "Morning Assembly" },
  { src: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&q=80", cat: "Campus", title: "School Grounds" },

  // Classrooms
  { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80", cat: "Classrooms", title: "English Class in Progress" },
  { src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80", cat: "Classrooms", title: "Library & Study" },
  { src: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=800&q=80", cat: "Classrooms", title: "Science Lab" },
  { src: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80", cat: "Classrooms", title: "Interactive Learning" },

  // Events
  { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80", cat: "Events", title: "Republic Day Celebration" },
  { src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80", cat: "Events", title: "Prize Distribution Ceremony" },
  { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80", cat: "Events", title: "Annual Day Function" },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", cat: "Events", title: "Graduation Ceremony" },

  // Sports
  { src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80", cat: "Sports", title: "Annual Sports Day" },
  { src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80", cat: "Sports", title: "Athletics Track" },
  { src: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=800&q=80", cat: "Sports", title: "Cricket Practice" },
  { src: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80", cat: "Sports", title: "Football Match" },

  // Cultural
  { src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80", cat: "Cultural", title: "Cultural Program" },
  { src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80", cat: "Cultural", title: "Dance Performance" },
  { src: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80", cat: "Cultural", title: "Music Concert" },
  { src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80", cat: "Cultural", title: "Art Exhibition" },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const filtered = activeCategory === "All" ? photos : photos.filter((p) => p.cat === activeCategory);

  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navbar />
      <PageHero
        title="Gallery"
        subtitle="Moments, milestones, and memories from DIS Muzaffarpur"
        bgImage="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1400&q=80"
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-royal-blue text-white shadow-lg shadow-royal-blue/30"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Photo Grid */}
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {filtered.map((photo, i) => (
                <motion.div
                  key={photo.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="relative group cursor-pointer rounded-2xl overflow-hidden aspect-square shadow-sm"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-semibold text-sm">{photo.title}</p>
                      <p className="text-gold text-xs">{photo.cat}</p>
                    </div>
                    <div className="absolute top-4 right-4">
                      <ZoomIn size={20} className="text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="absolute top-6 right-6 text-white bg-white/10 rounded-full p-2 hover:bg-white/20 transition z-10"
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="w-full rounded-2xl shadow-2xl max-h-[75vh] object-cover"
              />
              <div className="text-center mt-4">
                <p className="text-white font-semibold text-lg">{selectedPhoto.title}</p>
                <p className="text-gold text-sm">{selectedPhoto.cat}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import { useGalleryPhotos } from "../lib/useSchoolData";

const categories = ["All", "Campus", "Events", "Classrooms", "Sports", "Cultural"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const { photos, loading } = useGalleryPhotos();

  const filtered = activeCategory === "All" ? photos : photos.filter((p) => p.category === activeCategory);

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
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat ? "bg-royal-blue text-white shadow-lg shadow-royal-blue/30" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}>
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-400">Loading gallery...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">No photos in this category yet.</div>
          ) : (
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {filtered.map((photo, i) => (
                  <motion.div key={photo.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="relative group cursor-pointer rounded-2xl overflow-hidden aspect-square shadow-sm"
                    onClick={() => setSelectedPhoto(photo)}>
                    <img src={photo.src} alt={photo.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    {photo.is_real && (
                      <div className="absolute top-2 left-2 z-10 bg-gold text-navy text-[10px] font-bold px-2 py-0.5 rounded-full">DIS</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-semibold text-sm">{photo.title}</p>
                        <p className="text-gold text-xs">{photo.category}</p>
                      </div>
                      <div className="absolute top-4 right-4"><ZoomIn size={20} className="text-white" /></div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}>
            <button className="absolute top-6 right-6 text-white bg-white/10 rounded-full p-2 hover:bg-white/20 transition z-10" onClick={() => setSelectedPhoto(null)}>
              <X size={24} />
            </button>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <img src={selectedPhoto.src} alt={selectedPhoto.title} className="w-full rounded-2xl shadow-2xl max-h-[75vh] object-cover" />
              <div className="text-center mt-4">
                <p className="text-white font-semibold text-lg">{selectedPhoto.title}</p>
                <p className="text-gold text-sm">{selectedPhoto.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
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
    <div className="min-h-screen bg-white font-inter">
      <Navbar />
      <PageHero
        title="Gallery"
        subtitle="Moments from DIS — real events, real students, real stories"
        bgImage="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1400&q=80"
      />

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          {/* Filter bar — simple, not pill-heavy */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[13px] font-medium rounded transition-all duration-150 ${
                  activeCategory === cat
                    ? "bg-cobalt text-white"
                    : "text-ink-soft hover:text-ink border border-gray-200 hover:border-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="py-24 text-center text-ink-muted text-sm">Loading gallery…</div>
          ) : filtered.length === 0 ? (
            <div className="py-24 text-center text-ink-muted text-sm">No photos in this category yet.</div>
          ) : (
            <motion.div layout className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
              <AnimatePresence>
                {filtered.map((photo, i) => (
                  <motion.div
                    key={photo.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="relative break-inside-avoid overflow-hidden rounded cursor-pointer group"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 rounded"
                    />
                    {photo.is_real && (
                      <div className="absolute top-2 left-2 bg-amber text-ink text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">DIS</div>
                    )}
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-colors duration-300 rounded flex items-end">
                      <div className="p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <p className="text-white font-semibold text-xs leading-snug">{photo.title}</p>
                        <p className="text-white/60 text-[10px]">{photo.category}</p>
                      </div>
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/95 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="absolute top-5 right-5 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded p-2 transition"
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={20} />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="w-full rounded max-h-[78vh] object-contain"
              />
              <div className="mt-4 flex items-center justify-between">
                <p className="text-white font-medium text-sm">{selectedPhoto.title}</p>
                <span className="text-white/40 text-xs">{selectedPhoto.category}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
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

  const selectedIndex = selectedPhoto ? filtered.findIndex(p => p.id === selectedPhoto.id) : -1;

  const navigate = (dir) => {
    const next = filtered[(selectedIndex + dir + filtered.length) % filtered.length];
    setSelectedPhoto(next);
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "var(--font-inter)" }}>
      <Navbar />
      <PageHero
        title="Gallery"
        subtitle="Moments from DIS — real events, real students, real stories"
        bgImage="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1400&q=80"
      />

      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          {/* Filter row — clean text buttons */}
          <div className="flex flex-wrap items-center gap-1 mb-10">
            {categories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="relative px-4 py-2 text-[13px] font-medium rounded-lg transition-all duration-150"
                  style={{
                    backgroundColor: active ? "var(--cobalt-deep)" : "transparent",
                    color: active ? "#fff" : "var(--ink-muted)",
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = "var(--ink)"; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = "var(--ink-muted)"; }}
                >
                  {cat}
                  {active && (
                    <motion.span layoutId="cat-pill"
                      className="absolute inset-0 rounded-lg -z-10"
                      style={{ backgroundColor: "var(--cobalt-deep)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
            {!loading && filtered.length > 0 && (
              <span className="ml-auto text-xs" style={{ color: "var(--ink-muted)" }}>{filtered.length} photos</span>
            )}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="rounded-xl animate-pulse" style={{ backgroundColor: "var(--cream-dark)", aspectRatio: i % 3 === 0 ? "1/1.3" : "1/1" }} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-28 text-center">
              <p style={{ color: "var(--ink-muted)", fontSize: "14px" }}>No photos in this category yet.</p>
            </div>
          ) : (
            <motion.div layout className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
              <AnimatePresence>
                {filtered.map((photo, i) => (
                  <motion.div
                    key={photo.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3, delay: i * 0.025 }}
                    className="relative break-inside-avoid overflow-hidden rounded-xl cursor-pointer group"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-auto object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    />
                    {/* DIS badge */}
                    {photo.is_real && (
                      <div className="absolute top-2.5 left-2.5 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-widest"
                        style={{ backgroundColor: "var(--amber)", color: "var(--cobalt-deep)" }}>
                        DIS
                      </div>
                    )}
                    {/* hover overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end rounded-xl"
                      style={{ background: "linear-gradient(to top, rgba(14,31,82,0.85) 0%, transparent 60%)" }}>
                      <div className="p-4 w-full">
                        <p className="text-white font-semibold text-xs leading-snug">{photo.title}</p>
                        <p className="text-white/50 text-[10px] mt-0.5">{photo.category}</p>
                      </div>
                      <div className="absolute top-3 right-3">
                        <ZoomIn size={16} className="text-white/70" />
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            style={{ backgroundColor: "rgba(10,14,30,0.97)" }}
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 z-10 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
              style={{ color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={14} /> Close
            </button>

            {/* Prev/Next */}
            {filtered.length > 1 && (
              <>
                <button
                  onClick={e => { e.stopPropagation(); navigate(-1); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-lg transition-colors"
                  style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={e => { e.stopPropagation(); navigate(1); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-lg transition-colors"
                  style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            <motion.div
              key={selectedPhoto.id}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="max-w-4xl w-full mx-12 sm:mx-20"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="w-full rounded-xl shadow-2xl"
                style={{ maxHeight: "76vh", objectFit: "contain" }}
              />
              <div className="mt-4 flex items-center justify-between px-1">
                <p className="text-white font-medium text-sm">{selectedPhoto.title}</p>
                <div className="flex items-center gap-3">
                  <span className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>
                    {selectedPhoto.category}
                  </span>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>
                    {selectedIndex + 1} / {filtered.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
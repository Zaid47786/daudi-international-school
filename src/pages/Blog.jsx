import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import Breadcrumb from "../components/Breadcrumb";
import { base44 } from "@/api/base44Client";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

const CATEGORY_COLORS = {
  Events: "bg-blue-50 text-blue-700",
  Academics: "bg-green-50 text-green-700",
  Achievements: "bg-amber-50 text-amber-700",
  Admissions: "bg-purple-50 text-purple-700",
  "Science & Tech": "bg-cyan-50 text-cyan-700",
  "School Life": "bg-pink-50 text-pink-700",
  Announcements: "bg-orange-50 text-orange-700",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "DIS Muzaffarpur School Blog",
  description: "Latest news, events, achievements, and educational updates from Daudi International School, Muzaffarpur.",
  url: "https://daudischool.in/blog",
  publisher: {
    "@type": "Organization",
    name: "Daudi International School",
    logo: "https://media.base44.com/images/public/user_68a720ca6a1156f1068d37b1/9fb988c1a_dis.png",
  },
};

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    base44.entities.BlogPost.filter({ published: true }, "-created_date").then((data) => {
      setPosts(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const categories = ["All", ...Array.from(new Set(posts.map(p => p.category)))];
  const filtered = activeCategory === "All" ? posts : posts.filter(p => p.category === activeCategory);
  const featured = posts.find(p => p.featured);
  const rest = filtered.filter(p => !p.featured || activeCategory !== "All");

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "var(--font-inter)" }}>
      <SEOHead
        title="School Blog | News & Updates from DIS Muzaffarpur"
        description="Read the latest news, event reports, student achievements, and educational articles from Daudi International School, Muzaffarpur."
        canonical="https://daudischool.in/blog"
        schema={schema}
      />
      <Navbar />

      <section className="relative pt-[68px]" style={{ backgroundColor: "var(--cobalt-deep)", minHeight: "320px" }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <Breadcrumb crumbs={[{ label: "Blog" }]} />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="label-stamp mb-4" style={{ color: "rgba(232,168,32,0.75)" }}>School News & Stories</p>
            <h1 className="font-inter font-bold text-white tracking-tight leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              From the DIS Community
            </h1>
            <p className="mt-3 text-sm max-w-xl" style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>
              Events, achievements, educational insights, and stories from our students and staff.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          {/* Featured post */}
          {featured && activeCategory === "All" && (
            <motion.div {...fadeUp(0)} className="mb-12">
              <Link to={`/blog/${featured.slug}`}
                className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-xl group"
                style={{ backgroundColor: "var(--cobalt-deep)" }}>
                {featured.cover_image && (
                  <div className="overflow-hidden" style={{ minHeight: "280px" }}>
                    <img
                      src={featured.cover_image}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: "rgba(232,168,32,0.15)", color: "var(--amber)" }}>
                      Featured
                    </span>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{featured.category}</span>
                  </div>
                  <h2 className="font-inter font-bold text-white leading-tight mb-3" style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)" }}>
                    {featured.title}
                  </h2>
                  {featured.excerpt && (
                    <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>{featured.excerpt}</p>
                  )}
                  <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--amber)" }}>
                    Read more <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Category filter */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-150"
                  style={{
                    backgroundColor: activeCategory === cat ? "var(--cobalt-deep)" : "var(--cream)",
                    color: activeCategory === cat ? "#fff" : "var(--ink-soft)",
                    border: "1px solid",
                    borderColor: activeCategory === cat ? "var(--cobalt-deep)" : "var(--cream-dark)",
                  }}>
                  {cat}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="rounded-2xl overflow-hidden" style={{ backgroundColor: "var(--cream)" }}>
                  <div className="h-48 animate-pulse" style={{ backgroundColor: "var(--cream-dark)" }} />
                  <div className="p-6 space-y-3">
                    <div className="h-4 rounded animate-pulse" style={{ backgroundColor: "var(--cream-dark)", width: "60%" }} />
                    <div className="h-3 rounded animate-pulse" style={{ backgroundColor: "var(--cream-dark)" }} />
                    <div className="h-3 rounded animate-pulse" style={{ backgroundColor: "var(--cream-dark)", width: "80%" }} />
                  </div>
                </div>
              ))}
            </div>
          ) : rest.length === 0 && !featured ? (
            <div className="text-center py-20">
              <p className="text-lg font-semibold mb-2" style={{ color: "var(--ink)" }}>No posts yet</p>
              <p className="text-sm" style={{ color: "var(--ink-muted)" }}>Check back soon — updates from DIS are on the way.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post, i) => (
                <motion.article key={post.id} {...fadeUp(i * 0.06)}>
                  <Link to={`/blog/${post.slug}`}
                    className="group block rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                    style={{ borderColor: "var(--cream-dark)", backgroundColor: "var(--cream)" }}>
                    {post.cover_image && (
                      <div className="overflow-hidden" style={{ height: "200px" }}>
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[post.category] || "bg-gray-100 text-gray-600"}`}>
                          {post.category}
                        </span>
                      </div>
                      <h2 className="font-semibold text-sm leading-snug mb-2 group-hover:text-cobalt transition-colors"
                        style={{ color: "var(--ink)" }}>
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-[13px] leading-relaxed line-clamp-2 mb-4" style={{ color: "var(--ink-soft)" }}>
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "var(--cobalt)" }}>
                        Read more <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
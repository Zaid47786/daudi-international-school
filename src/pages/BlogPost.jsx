import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import Breadcrumb from "../components/Breadcrumb";
import { base44 } from "@/api/base44Client";

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    base44.entities.BlogPost.filter({ slug, published: true }).then(async (data) => {
      const found = data[0];
      setPost(found || null);
      setLoading(false);
      if (found) {
        const rel = await base44.entities.BlogPost.filter({ category: found.category, published: true }, "-created_date", 4);
        setRelated(rel.filter(r => r.id !== found.id).slice(0, 3));
      }
    }).catch(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--cobalt-deep)" }}>
      <div className="w-8 h-8 border-2 border-amber/30 border-t-amber rounded-full animate-spin" style={{ borderTopColor: "var(--amber)" }} />
    </div>
  );

  if (!post) return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-5 py-32">
        <p className="text-4xl mb-4">📄</p>
        <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--ink)" }}>Post not found</h1>
        <p className="text-sm mb-6" style={{ color: "var(--ink-muted)" }}>This article may have been moved or doesn't exist.</p>
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--cobalt)" }}>
          <ArrowLeft size={14} /> Back to Blog
        </Link>
      </div>
      <Footer />
    </div>
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.meta_description || post.excerpt,
    image: post.cover_image,
    author: { "@type": "Organization", name: post.author || "DIS Team" },
    publisher: {
      "@type": "Organization",
      name: "Daudi International School",
      logo: "https://media.base44.com/images/public/user_68a720ca6a1156f1068d37b1/9fb988c1a_dis.png",
    },
    datePublished: post.created_date,
    dateModified: post.updated_date,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://daudischool.in/blog/${post.slug}` },
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "var(--font-inter)" }}>
      <SEOHead
        title={post.title}
        description={post.meta_description || post.excerpt || `${post.title} — DIS Muzaffarpur`}
        canonical={`https://daudischool.in/blog/${post.slug}`}
        ogImage={post.cover_image}
        schema={schema}
      />
      <Navbar />

      <div className="pt-[68px]" style={{ backgroundColor: "var(--cobalt-deep)" }}>
        <Breadcrumb crumbs={[{ label: "Blog", path: "/blog" }, { label: post.title }]} />
      </div>

      {/* Cover */}
      {post.cover_image && (
        <div className="w-full overflow-hidden" style={{ maxHeight: "480px" }}>
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full object-cover"
            style={{ height: "480px" }}
            loading="eager"
          />
        </div>
      )}

      {/* Article */}
      <article className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ backgroundColor: "var(--amber-pale)", color: "var(--cobalt)" }}>
              {post.category}
            </span>
            {post.author && (
              <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--ink-muted)" }}>
                <User size={11} /> {post.author}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--ink-muted)" }}>
              <Calendar size={11} /> {new Date(post.created_date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
            </span>
          </div>

          <h1 className="font-inter font-bold tracking-tight leading-tight mb-6" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "var(--ink)" }}>
            {post.title}
          </h1>

          {/* Content */}
          <div className="prose prose-sm max-w-none" style={{
            color: "var(--ink-soft)",
            lineHeight: 1.85,
            fontSize: "15px",
          }}>
            <ReactMarkdown>{post.content || post.excerpt || ""}</ReactMarkdown>
          </div>

          {/* Tags */}
          {post.tags && (
            <div className="mt-10 pt-6 border-t flex flex-wrap gap-2" style={{ borderColor: "var(--cream-dark)" }}>
              {post.tags.split(",").map(t => t.trim()).filter(Boolean).map((tag, i) => (
                <span key={i} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: "var(--cream)", color: "var(--ink-muted)", border: "1px solid var(--cream-dark)" }}>
                  <Tag size={10} /> {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-10">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--cobalt)" }}>
              <ArrowLeft size={14} /> Back to all posts
            </Link>
          </div>
        </motion.div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-12 sm:py-16" style={{ backgroundColor: "var(--cream)", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <p className="label-stamp text-cobalt mb-6">More from DIS</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map(rel => (
                <Link key={rel.id} to={`/blog/${rel.slug}`}
                  className="group block rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-md bg-white"
                  style={{ borderColor: "var(--cream-dark)" }}>
                  {rel.cover_image && (
                    <div className="overflow-hidden h-36">
                      <img src={rel.cover_image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                  )}
                  <div className="p-4">
                    <p className="text-[11px] font-semibold mb-1" style={{ color: "var(--ink-muted)" }}>{rel.category}</p>
                    <h3 className="text-sm font-semibold leading-snug" style={{ color: "var(--ink)" }}>{rel.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
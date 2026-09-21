import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { base44 } from "@/api/base44Client";

const FALLBACK = [
  { parent_name: "Shabana Parveen", child_class: "Class V", quote: "The teachers are very caring and they bring out the best in every student. The school provides a nurturing and supportive environment for holistic development.", rating: 5 },
  { parent_name: "Rajan Kumar", child_class: "Class VIII", quote: "Bahut achha school hai. Yahan ke teachers bahut mehnat karte hain aur bacchon ko personally dhyan dete hain. Mera beta yahan se bahut kuch seekh raha hai.", rating: 5 },
  { parent_name: "Nasreen Begum", child_class: "Class III", quote: "DIS is the best school in Motijheel area. Fee bhi reasonable hai aur padhai ka level bhi bahut achha hai. Hamari beti English mein bahut confident ho gayi hai.", rating: 5 },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(FALLBACK);

  useEffect(() => {
    base44.entities.Testimonial.filter({ is_featured: true }, "sort_order").then((data) => {
      if (data.length > 0) setTestimonials(data);
    }).catch(() => {});
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Parent Testimonials — DIS Muzaffarpur",
    itemListElement: testimonials.map((t, i) => ({
      "@type": "Review",
      position: i + 1,
      author: { "@type": "Person", name: t.parent_name },
      reviewBody: t.quote,
      reviewRating: { "@type": "Rating", ratingValue: t.rating || 5, bestRating: 5 },
      itemReviewed: { "@type": "School", name: "Daudi International School" },
    })),
  };

  return (
    <section className="py-20 sm:py-28 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <motion.div {...fadeUp(0)} className="mb-12">
          <p className="label-stamp text-cobalt mb-3">Voices from our community</p>
          <h2 className="font-fraunces font-bold tracking-tight leading-tight" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "var(--cobalt-deep)" }}>
            What parents say about DIS
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div key={i} {...fadeUp(i * 0.08)}
              className="rounded-2xl p-7 border flex flex-col gap-5 transition-all duration-300 hover:shadow-md"
              style={{ backgroundColor: "var(--cream)", borderColor: "var(--cream-dark)" }}>
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating || 5 }).map((_, j) => (
                  <Star key={j} size={13} fill="var(--amber)" style={{ color: "var(--amber)" }} />
                ))}
              </div>
              <Quote size={22} strokeWidth={1.5} style={{ color: "var(--amber)", opacity: 0.4 }} />
              <p className="font-fraunces italic leading-[1.7] flex-1" style={{ fontSize: "0.95rem", color: "var(--ink)" }}>
                "{t.quote}"
              </p>
              <div>
                <p className="font-semibold text-sm" style={{ color: "var(--ink)" }}>{t.parent_name}</p>
                {t.child_class && <p className="text-xs mt-0.5" style={{ color: "var(--ink-muted)" }}>Parent of {t.child_class} student</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { base44 } from "@/api/base44Client";

const FALLBACK = [
  { parent_name: "Shabana Parveen", child_class: "Class V", quote: "The teachers are very caring and they bring out the best in every student. The school provides a nurturing and supportive environment for holistic development.", rating: 5 },
  { parent_name: "Rajan Kumar", child_class: "Class VIII", quote: "Bahut achha school hai. Yahan ke teachers bahut mehnat karte hain aur bacchon ko personally dhyan dete hain. Mera beta yahan se bahut kuch seekh raha hai.", rating: 5 },
  { parent_name: "Nasreen Begum", child_class: "Class III", quote: "DIS is the best school in Motijheel area. Fee bhi reasonable hai aur padhai ka level bhi bahut achha hai. Hamari beti English mein bahut confident ho gayi hai.", rating: 5 },
];

const reveal = (delay = 0) => ({ initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-50px" }, transition: { duration: .6, delay, ease: [0.22, 1, 0.36, 1] } });

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(FALLBACK);
  useEffect(() => { base44.entities.Testimonial.filter({ is_featured: true }, "sort_order").then((data) => { if (data.length > 0) setTestimonials(data); }).catch(() => {}); }, []);
  const schema = { "@context": "https://schema.org", "@type": "ItemList", name: "Parent Testimonials — DIS Muzaffarpur", itemListElement: testimonials.map((t, i) => ({ "@type": "Review", position: i + 1, author: { "@type": "Person", name: t.parent_name }, reviewBody: t.quote, reviewRating: { "@type": "Rating", ratingValue: t.rating || 5, bestRating: 5 }, itemReviewed: { "@type": "School", name: "Daudi International School" } })) };
  return <section className="bg-[#f6f1e8] py-24 sm:py-32"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12"><motion.div {...reveal()} className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="site-kicker">From the community</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] text-[#173b66] sm:text-5xl">Good things travel<br /><span className="font-fraunces italic text-[#d68f2d]">by word of mouth.</span></h2></div><p className="max-w-xs text-sm leading-6 text-[#718095]">The best measure of a school is how families feel when they talk about it.</p></motion.div><div className="mt-14 grid gap-4 lg:grid-cols-3">{testimonials.slice(0, 3).map((testimonial, index) => <motion.article key={testimonial.parent_name || index} {...reveal(index * .08)} className={`flex min-h-[310px] flex-col rounded-[28px] p-7 ${index === 1 ? "bg-[#173b66] text-white" : "bg-white text-[#173b66]"}`}><div className="flex items-center justify-between"><div className="flex gap-0.5">{Array.from({ length: testimonial.rating || 5 }).map((_, i) => <Star key={i} size={13} fill={index === 1 ? "#f2c46e" : "#e4a13d"} className={index === 1 ? "text-[#f2c46e]" : "text-[#e4a13d]"} />)}</div><Quote size={25} className={index === 1 ? "text-white/25" : "text-[#173b66]/15"} /></div><p className={`mt-10 flex-1 font-fraunces text-lg italic leading-8 ${index === 1 ? "text-white/85" : "text-[#173b66]/80"}`}>“{testimonial.quote}”</p><div className={`mt-8 border-t pt-4 ${index === 1 ? "border-white/15" : "border-[#173b66]/10"}`}><p className="text-sm font-bold">{testimonial.parent_name}</p>{testimonial.child_class && <p className={`mt-1 text-xs ${index === 1 ? "text-white/45" : "text-[#718095]"}`}>Parent of {testimonial.child_class} student</p>}</div></motion.article>)}</div></div></section>;
}

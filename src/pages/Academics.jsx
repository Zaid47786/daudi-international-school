import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import SEOHead from "../components/SEOHead";

const academicsSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Daudi International School",
  "url": "https://daudischool.in/academics",
  "description": "English-medium academic programs from Nursery to Class X at Daudi International School, Muzaffarpur. Holistic education combining NCERT curriculum with activity-based learning.",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Academic Programs at DIS Muzaffarpur",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Course", "name": "Montessori & Nursery (Ages 3–5)", "description": "Play-based foundational learning focusing on motor skills, language, creativity, and social confidence."}},
      {"@type": "Offer", "itemOffered": {"@type": "Course", "name": "Primary School — Class I to V (Ages 6–10)", "description": "Core academic foundations: English, Hindi, Mathematics, Science, and Social Studies."}},
      {"@type": "Offer", "itemOffered": {"@type": "Course", "name": "Middle School — Class VI to VIII (Ages 11–13)", "description": "Expanding subject depth with structured sciences, critical thinking, and Computer Science."}},
      {"@type": "Offer", "itemOffered": {"@type": "Course", "name": "Secondary — Class IX & X (Ages 14–15)", "description": "Board-aligned curriculum with focused preparation for BSEB secondary examinations."}}
    ]
  }
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
});

const levels = [
  {
    level: "Montessori",
    age: "Ages 3–5",
    desc: "Child-led, hands-on learning focused on motor skills, language, creativity, and social confidence.",
    subjects: ["English", "Hindi", "Basic Maths", "Drawing & Art", "Sensorial Activities", "Practical Life"],
    borderColor: "var(--amber)",
  },
  {
    level: "Primary — Class I to V",
    age: "Ages 6–10",
    desc: "Core academic foundations: literacy, numeracy, and an introduction to the world around them.",
    subjects: ["English", "Hindi", "Mathematics", "EVS / Science", "Social Studies", "Computer Basics"],
    borderColor: "var(--cobalt)",
  },
  {
    level: "Middle School — Class VI to VIII",
    age: "Ages 11–13",
    desc: "Expanding subject depth, critical thinking, and introduction to structured sciences.",
    subjects: ["English", "Hindi", "Mathematics", "Science", "Social Science", "Computer Science", "Sanskrit"],
    borderColor: "var(--cobalt)",
  },
  {
    level: "Secondary — Class IX & X",
    age: "Ages 14–15",
    desc: "Board-aligned curriculum with focused preparation for BSEB secondary examinations.",
    subjects: ["English", "Hindi", "Mathematics", "Science", "Social Science", "Computer Applications"],
    borderColor: "var(--ink)",
  },
];

const activities = ["Annual Sports Day", "Republic Day Parade", "Cultural Festivals", "Science Fair", "Debate Club", "Art & Craft", "Music & Dance", "Community Service"];

export default function Academics() {
  return (
    <div className="min-h-screen bg-white font-inter">
      <SEOHead
        title="Academics | English-Medium Nursery to Class X — DIS Muzaffarpur"
        description="Explore the academic programs at Daudi International School, Muzaffarpur — from Montessori & Nursery through Class X. English-medium, NCERT-aligned, activity-based learning."
        canonical="https://daudischool.in/academics"
        schema={academicsSchema}
      />
      <Navbar />
      <PageHero
        title="Academics"
        subtitle="English-medium, holistic education from Nursery through Class X"
        bgImage="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=80"
      />

      {/* Philosophy */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <motion.div {...fadeUp(0)} className="lg:col-span-5">
              <p className="label-stamp text-cobalt mb-5">How we teach</p>
              <h2 className="font-inter font-bold text-ink tracking-tight leading-tight"
                style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)" }}>
                Beyond textbooks.<br />
                <em className="font-fraunces not-italic text-cobalt">Beyond rote.</em>
              </h2>
            </motion.div>
            <motion.div {...fadeUp(0.1)} className="lg:col-span-7">
              <p className="text-ink-soft text-[15px] leading-[1.78] max-w-prose">
                At DIS, we take a student-centered approach. Our teachers are trained to develop critical thinkers — children who can question, reason, and collaborate. We combine NCERT-aligned content with activity-based methods so learning sticks.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6">
                {[
                  { num: "Small", label: "Class sizes for personal attention" },
                  { num: "English", label: "Medium instruction throughout" },
                  { num: "BSEB", label: "Board exam preparation track" },
                  { num: "More", label: "Sports, arts & co-curricular" },
                ].map((item, i) => (
                  <div key={i} className="border-l-2 border-amber pl-4 py-1">
                    <div className="font-bold text-ink text-sm">{item.num}</div>
                    <div className="text-ink-muted text-[12px] mt-0.5 leading-snug">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 sm:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div {...fadeUp(0)} className="mb-12 border-b border-gray-200 pb-7">
            <p className="label-stamp text-cobalt mb-3">Programs offered</p>
            <h2 className="font-inter font-bold text-ink tracking-tight"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
              What we offer, grade by grade
            </h2>
          </motion.div>

          <div className="space-y-5">
            {levels.map((lv, i) => (
              <motion.div key={i} {...fadeUp(i * 0.07)}
                className="bg-white rounded-lg p-6 sm:p-8 border-l-4 border border-gray-100 hover:shadow-sm transition-shadow duration-200"
                style={{ borderLeftColor: lv.borderColor }}>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-semibold text-ink text-[16px] tracking-tight">{lv.level}</h3>
                    <span className="inline-block mt-1 text-[11px] font-semibold text-ink-muted bg-slate-light px-2.5 py-1 rounded-full">{lv.age}</span>
                  </div>
                </div>
                <p className="text-ink-soft text-[14px] leading-relaxed mb-5">{lv.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {lv.subjects.map((s, j) => (
                    <span key={j} className="text-[12px] font-medium text-ink-soft bg-cream border border-gray-200 px-2.5 py-1 rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Co-curricular */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div {...fadeUp(0)} className="lg:col-span-6">
              <div className="rounded-lg overflow-hidden aspect-video">
                <img
                  src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=900&q=80"
                  alt="DIS Muzaffarpur students participating in co-curricular activities"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div {...fadeUp(0.1)} className="lg:col-span-6">
              <p className="label-stamp text-cobalt mb-5">Life outside the classroom</p>
              <h2 className="font-inter font-bold text-ink tracking-tight leading-tight mb-5"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
                We build the whole child,<br />
                <em className="font-fraunces not-italic text-cobalt">not just the student</em>
              </h2>
              <p className="text-ink-soft text-[14px] leading-[1.75] mb-7">
                From Republic Day parades to science fairs to cricket matches — at DIS, there's always something happening beyond the syllabus. Co-curricular activities are considered core, not optional.
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {activities.map((act, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-ink-soft text-[13px]">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0" />
                    {act}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cobalt-deep py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
            <div>
              <p className="label-stamp text-amber/70 mb-4">Admissions open</p>
              <h2 className="font-inter font-bold text-white tracking-tight"
                style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)" }}>
                Ready to enroll your child?
              </h2>
              <p className="text-white/55 text-[14px] mt-2">Simple process. Affordable fees. Genuine care.</p>
            </div>
            <Link
              to="/admissions"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-amber text-ink font-semibold text-sm rounded hover:bg-amber-light transition-colors duration-200"
            >
              Start Admissions <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
import { motion } from "framer-motion";
import { Award, Shield, Users, Zap, BookOpen, Heart } from "lucide-react";

const signals = [
  { icon: <Award size={20} />, title: "DIS Development Award", desc: "Awarded for outstanding community impact and contributions to education in Bihar." },
  { icon: <BookOpen size={20} />, title: "Smart Classrooms", desc: "Interactive projectors, digital boards, and modern learning tools across classes." },
  { icon: <Shield size={20} />, title: "Safe Campus", desc: "Secure, clean, and well-maintained premises with a welcoming environment for every child." },
  { icon: <Users size={20} />, title: "Dedicated Faculty", desc: "Experienced, trained teachers who know every student by name — real mentorship." },
  { icon: <Heart size={20} />, title: "Non-Profit Mission", desc: "Every rupee goes back to education. No shareholders, no dividends — just better futures." },
  { icon: <Zap size={20} />, title: "Proven Results", desc: "Strong board exam performance year after year, with students going on to top colleges." },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

export default function TrustSignals() {
  return (
    <section className="py-20 sm:py-28" style={{ backgroundColor: "var(--cobalt-deep)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <motion.div {...fadeUp(0)} className="mb-12">
          <p className="label-stamp mb-3" style={{ color: "rgba(232,168,32,0.75)" }}>Why trust us</p>
          <h2 className="font-fraunces font-bold text-white tracking-tight leading-tight" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>
            A school built on two decades<br />of earned trust
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {signals.map((s, i) => (
            <motion.div key={i} {...fadeUp(i * 0.07)}
              className="rounded-xl p-6 transition-all duration-300 hover:-translate-y-0.5"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(232,168,32,0.12)", color: "var(--amber)" }}>
                {s.icon}
              </div>
              <h3 className="font-semibold text-sm text-white mb-2">{s.title}</h3>
              <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
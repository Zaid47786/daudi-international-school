import { motion } from "framer-motion";
import { Award, BookOpen, Heart, Shield, Users, Zap } from "lucide-react";

const signals = [
  { icon: Award, title: "Community impact", desc: "A school shaped by the needs and hopes of Muzaffarpur families.", tint: "gold" },
  { icon: BookOpen, title: "Modern classrooms", desc: "Interactive tools and strong fundamentals, brought together.", tint: "blue" },
  { icon: Shield, title: "Safe campus", desc: "A clean, welcoming environment where children can be themselves.", tint: "sage" },
  { icon: Users, title: "Real mentorship", desc: "Teachers who know each child, not just each roll number.", tint: "blue" },
  { icon: Heart, title: "Non-profit mission", desc: "Every rupee goes back into the education we provide.", tint: "gold" },
  { icon: Zap, title: "Proven progress", desc: "A culture of effort, confidence, and results that last.", tint: "sage" },
];

const reveal = (delay = 0) => ({ initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-50px" }, transition: { duration: .6, delay, ease: [0.22, 1, 0.36, 1] } });

export default function TrustSignals() {
  return <section className="bg-white py-24 sm:py-32"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12"><motion.div {...reveal()} className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="site-kicker">Why families choose DIS</p><h2 className="mt-4 max-w-lg text-4xl font-semibold leading-[.98] tracking-[-.05em] text-[#173b66] sm:text-6xl">The details make <span className="font-fraunces italic text-[#d68f2d]">the difference.</span></h2></div><p className="max-w-md text-sm leading-7 text-[#718095] lg:justify-self-end">Two decades of listening, learning, and building a school that feels ambitious without ever losing its warmth.</p></motion.div><div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{signals.map((signal, index) => { const Icon = signal.icon; const tint = signal.tint === "gold" ? "bg-[#fff4da] text-[#d68f2d]" : signal.tint === "sage" ? "bg-[#e9f3ee] text-[#2c7864]" : "bg-[#eaf0f4] text-[#1f5a83]"; return <motion.div key={signal.title} {...reveal(index * .06)} className="group rounded-[26px] border border-[#173b66]/10 bg-[#f6f1e8]/35 p-6 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_40px_rgba(23,59,102,.08)]"><div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tint}`}><Icon size={20} /></div><div className="mt-9 flex items-start justify-between gap-3"><h3 className="text-lg font-semibold text-[#173b66]">{signal.title}</h3><span className="font-fraunces text-2xl text-[#173b66]/15">{String(index + 1).padStart(2, "0")}</span></div><p className="mt-3 text-sm leading-6 text-[#718095]">{signal.desc}</p></motion.div>; })}</div></div></section>;
}

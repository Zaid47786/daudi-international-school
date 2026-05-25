import { Award, Shield, Users, Zap, BookOpen, Heart } from "lucide-react";
import { useIsMobile } from "../../hooks/useIsMobile";

const signals = [
  { icon: <Award size={20} />, title: "DIS Development Award", desc: "Awarded for outstanding community impact and contributions to education in Bihar." },
  { icon: <BookOpen size={20} />, title: "Smart Classrooms", desc: "Interactive projectors, digital boards, and modern learning tools across classes." },
  { icon: <Shield size={20} />, title: "Safe Campus", desc: "Secure, clean, and well-maintained premises with a welcoming environment for every child." },
  { icon: <Users size={20} />, title: "Dedicated Faculty", desc: "Experienced, trained teachers who know every student by name — real mentorship." },
  { icon: <Heart size={20} />, title: "Non-Profit Mission", desc: "Every rupee goes back to education. No shareholders, no dividends — just better futures." },
  { icon: <Zap size={20} />, title: "Proven Results", desc: "Strong board exam performance year after year, with students going on to top colleges." },
];

export default function TrustSignals() {
  const isMobile = useIsMobile();

  return (
    <section className="py-16 sm:py-28" style={{ backgroundColor: "var(--cobalt-deep)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="mb-10">
          <p className="label-stamp mb-3" style={{ color: "rgba(232,168,32,0.75)" }}>Why trust us</p>
          <h2 className="font-fraunces font-bold text-white tracking-tight leading-tight"
            style={{ fontSize: isMobile ? "1.5rem" : "clamp(1.5rem, 3vw, 2.2rem)" }}>
            A school built on two decades<br />of earned trust
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {signals.map((s, i) => (
            <div key={i}
              className="rounded-xl p-5 sm:p-6"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: "rgba(232,168,32,0.12)", color: "var(--amber)" }}>
                {s.icon}
              </div>
              <h3 className="font-semibold text-sm text-white mb-1.5">{s.title}</h3>
              <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
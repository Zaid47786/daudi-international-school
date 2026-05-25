import { motion } from "framer-motion";
import { MapPin, Bus, Train, Navigation } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
});

const landmarks = [
  { name: "Motijheel Park", distance: "2 min walk", note: "City's central park — our landmark" },
  { name: "Muzaffarpur Railway Station", distance: "~15 min", note: "Main city rail hub" },
  { name: "Muzaffarpur Bus Stand", distance: "~10 min", note: "Central bus terminal" },
  { name: "Saraiyaganj Market", distance: "~5 min", note: "Main commercial area" },
  { name: "SKMCH Hospital", distance: "~8 min", note: "City's main hospital" },
  { name: "Juran Chapra", distance: "~10 min", note: "North Muzaffarpur residential hub" },
];

const routes = [
  { icon: <Bus size={15} />, from: "Muzaffarpur Bus Stand", how: "Auto/e-rickshaw to Motijheel (~10 min)" },
  { icon: <Train size={15} />, from: "Muzaffarpur Railway Station", how: "Auto to Motijheel via Station Road (~15 min)" },
  { icon: <Navigation size={15} />, from: "Juran Chapra / Brahmpura", how: "Rickshaw or auto to Motijheel (~12 min)" },
  { icon: <Navigation size={15} />, from: "Saraiyaganj / Bela", how: "Direct auto to Daudi Market, Motijheel" },
];

export default function LocalPresence({ dark = false }) {
  const bg = dark ? "var(--cobalt-deep)" : "var(--cream)";
  const headingColor = dark ? "#fff" : "var(--ink)";
  const subColor = dark ? "rgba(255,255,255,0.5)" : "var(--ink-muted)";
  const cardBg = dark ? "rgba(255,255,255,0.04)" : "#fff";
  const cardBorder = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const labelColor = dark ? "rgba(232,168,32,0.8)" : "var(--cobalt)";

  return (
    <section style={{ backgroundColor: bg }} className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        <motion.div {...fadeUp(0)} className="mb-10">
          <p className="label-stamp mb-3" style={{ color: labelColor }}>Location & Access</p>
          <h2 className="font-inter font-bold tracking-tight" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: headingColor }}>
            Easy to reach from anywhere<br />
            <span className="font-fraunces italic" style={{ color: "var(--amber)" }}>in Muzaffarpur</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed max-w-lg" style={{ color: subColor }}>
            We're located at Motijheel — the heart of Muzaffarpur — making DIS one of the most conveniently located schools in the city.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Landmarks */}
          <motion.div {...fadeUp(0.05)}>
            <div className="flex items-center gap-2 mb-5">
              <MapPin size={14} style={{ color: "var(--amber)" }} />
              <h3 className="text-sm font-semibold" style={{ color: dark ? "rgba(255,255,255,0.7)" : "var(--ink-soft)" }}>
                Nearby landmarks
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {landmarks.map((lm, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl"
                  style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: "var(--amber)" }} />
                  <div>
                    <p className="text-sm font-semibold leading-tight" style={{ color: headingColor }}>{lm.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--amber)" }}>{lm.distance}</p>
                    <p className="text-xs mt-0.5" style={{ color: subColor }}>{lm.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Transport */}
          <motion.div {...fadeUp(0.1)}>
            <div className="flex items-center gap-2 mb-5">
              <Bus size={14} style={{ color: "var(--amber)" }} />
              <h3 className="text-sm font-semibold" style={{ color: dark ? "rgba(255,255,255,0.7)" : "var(--ink-soft)" }}>
                How to get here
              </h3>
            </div>
            <div className="space-y-2.5">
              {routes.map((r, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
                  <div className="mt-0.5 shrink-0" style={{ color: "var(--amber)" }}>{r.icon}</div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: headingColor }}>{r.from}</p>
                    <p className="text-xs mt-0.5 leading-relaxed" style={{ color: subColor }}>{r.how}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* NAP block */}
            <div className="mt-5 p-4 rounded-xl" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
              <p className="text-xs font-semibold mb-2" style={{ color: "var(--amber)" }}>📍 Our Address</p>
              <address className="not-italic text-sm leading-relaxed" style={{ color: subColor }}>
                <strong style={{ color: headingColor }}>Daudi International School</strong><br />
                Shafi Manzil, Daudi Market, Motijheel<br />
                Muzaffarpur, Bihar — 842001<br />
                <a href="tel:+916212243314" className="hover:underline" style={{ color: "var(--amber)" }}>
                  +91 621 224 3314
                </a>
              </address>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
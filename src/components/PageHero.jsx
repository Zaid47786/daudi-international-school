import { motion } from "framer-motion";

export default function PageHero({ title, subtitle, bgImage }) {
  return (
    <div
      className="relative pt-16 lg:pt-18 overflow-hidden"
      style={{ minHeight: "clamp(180px, 28vw, 320px)" }}
    >
      {/* Background */}
      {bgImage && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center 35%",
          }}
        />
      )}
      {/* Overlay */}
      <div className={`absolute inset-0 ${bgImage ? "bg-cobalt-deep/80" : "bg-cobalt-deep"}`} />
      <div className="absolute inset-0 bg-gradient-to-r from-cobalt-deep/60 to-transparent" />

      {/* Subtle amber accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-amber/20" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-end" style={{ minHeight: "clamp(180px, 28vw, 320px)" }}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="pb-10 sm:pb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-px bg-amber/60" />
            <span className="label-stamp text-amber/70">DIS Muzaffarpur</span>
          </div>
          <h1
            className="font-inter font-bold text-white tracking-tight leading-tight"
            style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-white/55 text-[15px] mt-3 max-w-xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
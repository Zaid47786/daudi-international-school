import { motion } from "framer-motion";

export default function PageHero({ title, subtitle, bgImage }) {
  return (
    <div
      className="relative pt-16 md:pt-20 h-56 md:h-72 flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: bgImage
          ? `linear-gradient(to right, rgba(13,36,86,0.92) 0%, rgba(26,58,143,0.80) 100%), url(${bgImage})`
          : undefined,
        backgroundColor: bgImage ? undefined : "#0D2456",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-royal-blue/30 blur-3xl" />
      </div>

      <div className="relative text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-10 bg-gold/60" />
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">
              DIS Muzaffarpur
            </span>
            <div className="h-px w-10 bg-gold/60" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">{title}</h1>
          {subtitle && (
            <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">{subtitle}</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
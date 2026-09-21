import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

export default function PageHero({ title, subtitle, bgImage }) {
  return (
    <section className="relative overflow-hidden bg-[#f6f1e8] pb-10 pt-32 sm:pb-16 sm:pt-40">
      <div className="absolute inset-0 site-grid opacity-50" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl items-end gap-10 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:px-12">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: [0.22, 1, 0.36, 1] }} className="relative z-10">
          <div className="mb-6 flex items-center gap-2 text-[10px] font-bold tracking-[.2em] text-[#d68f2d] uppercase"><span className="h-2 w-2 rounded-full bg-[#e4a13d]" /> Daudi International School</div>
          <h1 className="max-w-2xl text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[.9] tracking-[-.07em] text-[#173b66]">{title}</h1>
          {subtitle && <p className="mt-7 max-w-lg text-base leading-7 text-[#647489] sm:text-lg">{subtitle}</p>}
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30, rotate: 2 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ duration: .9, delay: .1, ease: [0.22, 1, 0.36, 1] }} className="relative h-64 overflow-hidden rounded-[32px] sm:h-80 lg:h-[360px]">
          {bgImage ? <img src={bgImage} alt="" className="h-full w-full object-cover" style={{ objectPosition: "center 40%" }} /> : <div className="h-full w-full bg-[#173b66]" />}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#173b66]/65 via-transparent to-[#e4a13d]/15" />
          <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-full bg-white/90 px-3 py-2 text-[10px] font-bold tracking-[.16em] text-[#173b66] uppercase shadow-lg"><ArrowDownRight size={15} className="text-[#d68f2d]" /> Est. 2004 · Muzaffarpur</div>
        </motion.div>
      </div>
      <div className="relative mx-auto mt-10 max-w-7xl border-t border-[#173b66]/10 px-5 pt-4 sm:px-8 lg:px-12"><div className="flex items-center justify-between text-[10px] font-bold tracking-[.15em] text-[#8a96a5] uppercase"><span>Where every child can grow</span><span>01 / 01</span></div></div>
    </section>
  );
}

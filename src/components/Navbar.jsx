import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "About", path: "/about" },
  { label: "Academics", path: "/academics" },
  { label: "Admissions", path: "/admissions" },
  { label: "Life at DIS", path: "/events" },
  { label: "Stories", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <div className={`fixed left-0 right-0 top-0 z-[60] hidden h-7 items-center justify-center bg-[#173b66] text-[10px] font-bold tracking-[.18em] text-white/75 uppercase sm:flex ${isHome ? "" : ""}`}>
        <span><span className="text-[#f2c46e]">Admissions open</span> · 2026–27 academic year · Muzaffarpur</span>
      </div>
      <nav aria-label="Main navigation" className={`fixed left-0 right-0 z-50 px-3 transition-all duration-500 sm:px-5 ${scrolled ? "top-2" : "top-2 sm:top-9"}`}>
        <div className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-3 py-2.5 shadow-[0_10px_30px_rgba(23,59,102,.08)] backdrop-blur-xl transition-all duration-500 sm:px-4 ${isHome && !scrolled ? "border-[#173b66]/10 bg-[#f6f1e8]/80" : "border-white/70 bg-white/90"}`}>
          <Link to="/" className="group flex items-center gap-3 pl-1.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#173b66] shadow-sm transition group-hover:rotate-[-5deg]"><img src="https://media.base44.com/images/public/user_68a720ca6a1156f1068d37b1/9fb988c1a_dis.png" alt="Daudi International School" className="h-8 w-auto" /></span>
            <span className="hidden leading-none sm:block"><span className="block text-[12px] font-bold tracking-[-.02em] text-[#173b66]">Daudi International</span><span className="mt-1 block text-[9px] font-bold tracking-[.18em] text-[#d68f2d] uppercase">School · Muzaffarpur</span></span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = location.pathname === link.path || (link.path === "/blog" && location.pathname.startsWith("/blog/"));
              return <Link key={link.path} to={link.path} className={`rounded-full px-3.5 py-2 text-[12px] font-semibold transition ${active ? "bg-[#eaf0f4] text-[#173b66]" : "text-[#66768a] hover:bg-[#f3eadc] hover:text-[#173b66]"}`}>{link.label}</Link>;
            })}
          </div>

          <div className="hidden items-center gap-2 lg:flex"><Link to="/portal" className="rounded-full px-3.5 py-2 text-[12px] font-semibold text-[#526175] transition hover:bg-[#eaf0f4] hover:text-[#173b66]">Portal</Link><Link to="/admissions" className="group inline-flex items-center gap-2 rounded-full bg-[#e4a13d] px-4 py-2.5 text-[12px] font-bold text-[#173b66] transition hover:-translate-y-0.5 hover:bg-[#f0b85b]">Apply now <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link></div>

          <button onClick={() => setIsOpen(!isOpen)} className="rounded-full p-2.5 text-[#173b66] transition hover:bg-[#eaf0f4] lg:hidden" aria-label={isOpen ? "Close menu" : "Open menu"}>{isOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        <AnimatePresence>
          {isOpen && <motion.div initial={{ opacity: 0, y: -8, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: .98 }} transition={{ duration: .22 }} className="mx-auto mt-2 max-w-7xl rounded-[26px] border border-white/70 bg-white/95 p-3 shadow-[0_20px_45px_rgba(23,59,102,.15)] backdrop-blur-xl lg:hidden"><div className="grid gap-1 sm:grid-cols-2">{navLinks.map((link) => <Link key={link.path} to={link.path} className="rounded-2xl px-4 py-3.5 text-sm font-semibold text-[#526175] transition hover:bg-[#f3eadc] hover:text-[#173b66]">{link.label}</Link>)}</div><div className="mt-2 grid grid-cols-2 gap-2"><Link to="/portal" className="rounded-2xl border border-[#173b66]/10 px-4 py-3 text-center text-sm font-semibold text-[#173b66]">School portal</Link><Link to="/admissions" className="rounded-2xl bg-[#e4a13d] px-4 py-3 text-center text-sm font-bold text-[#173b66]">Apply now</Link></div></motion.div>}
        </AnimatePresence>
      </nav>
    </>
  );
}

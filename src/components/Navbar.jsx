import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "About", path: "/about" },
  { label: "Academics", path: "/academics" },
  { label: "Admissions", path: "/admissions" },
  { label: "Events", path: "/events" },
  { label: "Gallery", path: "/gallery" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const isHome = location.pathname === "/";

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cobalt-deep shadow-[0_1px_0_rgba(255,255,255,0.06)]"
          : isHome
          ? "bg-transparent"
          : "bg-cobalt-deep"
      }`}
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-[60px] md:h-[68px]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <img
              src="https://media.base44.com/images/public/user_68a720ca6a1156f1068d37b1/9fb988c1a_dis.png"
              alt="Daudi International School Muzaffarpur"
              width="36" height="36"
              className="h-8 md:h-9 w-auto"
            />
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-white font-semibold text-[13px] tracking-tight">Daudi International</span>
              <span style={{ color: "var(--amber)", fontSize: "10px", letterSpacing: "0.12em", fontWeight: 600 }}>
                EST. 2004
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3.5 py-2 text-[13px] font-medium transition-colors duration-150 rounded ${
                    active ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span
                      className="absolute bottom-0 left-3.5 right-3.5 h-px rounded-full"
                      style={{ backgroundColor: "var(--amber)" }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:block">
            <Link
              to="/admissions"
              className="px-5 py-2 text-[13px] font-semibold rounded transition-all duration-150 hover:opacity-90 active:scale-95"
              style={{ backgroundColor: "var(--amber)", color: "var(--cobalt-deep)" }}
            >
              Apply now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="lg:hidden overflow-hidden"
            style={{ background: "var(--cobalt-deep)", borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="px-5 py-5 space-y-0.5">
              {navLinks.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                      active ? "text-white bg-white/8" : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                    style={active ? { backgroundColor: "rgba(255,255,255,0.07)" } : {}}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-3">
                <Link
                  to="/admissions"
                  className="block w-full text-center py-3 text-sm font-semibold rounded transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "var(--amber)", color: "var(--cobalt-deep)" }}
                >
                  Apply for admission
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
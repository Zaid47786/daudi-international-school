import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Academics", path: "/academics" },
  { label: "Admissions", path: "/admissions" },
  { label: "Events", path: "/events" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-navy shadow-xl" : "bg-navy/95 backdrop-blur-sm"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
            <img src="https://media.base44.com/images/public/user_68a720ca6a1156f1068d37b1/9fb988c1a_dis.png" alt="DIS Logo" className="h-9 md:h-12 w-auto object-contain flex-shrink-0" />
            <div className="hidden sm:block min-w-0">
              <div className="text-white font-bold text-sm md:text-base leading-tight truncate">Daudi International School</div>
              <div className="text-gold text-xs font-medium tracking-widest">MUZAFFARPUR</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  location.pathname === link.path ? "text-gold border-b-2 border-gold" : "text-white/80 hover:text-gold hover:bg-white/10"
                }`}>
                {link.label}
              </Link>
            ))}
            <Link to="/admissions" className="ml-3 px-4 xl:px-5 py-2 bg-gold text-navy font-bold text-sm rounded-full hover:bg-gold-dark transition-all duration-200 shadow-lg hover:shadow-gold/30 whitespace-nowrap">
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition" aria-label="Toggle menu">
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-navy border-t border-white/10 overflow-hidden">
            <div className="px-4 py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    location.pathname === link.path ? "bg-gold/20 text-gold" : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}>
                  {link.label}
                </Link>
              ))}
              <Link to="/admissions" className="block mt-3 px-4 py-3.5 bg-gold text-navy font-bold text-sm rounded-full text-center hover:bg-gold-dark transition">
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
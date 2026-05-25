import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Youtube } from "lucide-react";
import { useSettings } from "../lib/useSchoolData";

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer style={{ backgroundColor: "var(--cobalt-deep)", fontFamily: "var(--font-inter)" }}>
      {/* Top amber rule */}
      <div style={{ height: "3px", backgroundColor: "var(--amber)" }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-14 sm:py-16">
        <div className="grid grid-cols-12 gap-8 lg:gap-12">

          {/* Brand — wider col */}
          <div className="col-span-12 sm:col-span-5 lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <img
                src="https://media.base44.com/images/public/user_68a720ca6a1156f1068d37b1/9fb988c1a_dis.png"
                alt="Daudi International School Muzaffarpur"
                loading="lazy"
                width="44" height="44"
                className="h-11 w-auto"
                style={{ filter: "brightness(1.2) contrast(1.1)" }}
              />
              <div className="leading-none">
                <div className="text-white font-semibold text-sm leading-snug">Daudi International School</div>
                <div style={{ color: "var(--amber)", fontSize: "10px", letterSpacing: "0.12em", fontWeight: 600 }}>
                  MUZAFFARPUR
                </div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
              A non-profit, English-medium school under the Daudi Welfare Trust.
              Quality education for every child in Muzaffarpur — regardless of background.
            </p>
            <div className="flex gap-2.5">
              {[
                { href: settings.facebook_url, icon: <Facebook size={15} />, label: "Facebook" },
                { href: settings.youtube_url, icon: <Youtube size={15} />, label: "YouTube" },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded transition-all duration-150 hover:scale-105"
                  style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)" }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "var(--amber)";
                    e.currentTarget.style.color = "var(--amber)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Spacer on large */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Links */}
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <h4
              className="mb-4"
              style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}
            >
              Navigate
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", path: "/about" },
                { label: "Academics", path: "/academics" },
                { label: "Admissions", path: "/admissions" },
                { label: "Events", path: "/events" },
                { label: "Gallery", path: "/gallery" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm transition-colors duration-150"
                    style={{ color: "rgba(255,255,255,0.48)" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.48)"}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — NAP consistent */}
          <div className="col-span-6 sm:col-span-4 lg:col-span-3">
            <h4
              className="mb-4"
              style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}
            >
              Contact
            </h4>
            <address className="not-italic space-y-3.5">
              <div className="flex items-start gap-2.5">
                <MapPin size={13} className="mt-0.5 shrink-0" style={{ color: "var(--amber)" }} />
                <span className="text-sm leading-snug" style={{ color: "rgba(255,255,255,0.48)" }}>
                  Shafi Manzil, Daudi Market,<br />Motijheel, Muzaffarpur,<br />Bihar — 842001
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={13} className="shrink-0" style={{ color: "var(--amber)" }} />
                <a
                  href="tel:+916212243314"
                  className="text-sm transition-colors duration-150"
                  style={{ color: "rgba(255,255,255,0.48)" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.48)"}
                >
                  +91 621 224 3314
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={13} className="shrink-0" style={{ color: "var(--amber)" }} />
                <a
                  href="mailto:daudischool.muz@gmail.com"
                  className="text-sm transition-colors duration-150 break-all"
                  style={{ color: "rgba(255,255,255,0.48)" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.48)"}
                >
                  daudischool.muz@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0 text-xs" style={{ color: "var(--amber)" }}>🕐</span>
                <span className="text-sm leading-snug" style={{ color: "rgba(255,255,255,0.38)" }}>
                  Mon – Sat: 8:00 AM – 3:00 PM
                </span>
              </div>
            </address>
          </div>

          {/* Admission nudge */}
          <div className="col-span-12 lg:col-span-2">
            <div
              className="rounded-lg p-5"
              style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-white font-semibold text-sm mb-1 leading-snug">Admissions open</p>
              <p className="text-xs mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.44)" }}>
                2026–27 academic year. English-medium, non-profit.
              </p>
              <Link
                to="/admissions"
                className="block text-center text-xs font-semibold py-2.5 rounded transition-opacity hover:opacity-85"
                style={{ backgroundColor: "var(--amber)", color: "var(--cobalt-deep)" }}
              >
                Apply now →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-3 flex flex-col sm:flex-row justify-between gap-1.5">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
            © 2026 Daudi International School, Motijheel, Muzaffarpur, Bihar 842001
          </p>
          <div className="flex items-center flex-wrap gap-3 sm:gap-5">
            <Link to="/best-school-in-muzaffarpur" className="text-xs hover:text-white/60 transition-colors" style={{ color: "rgba(255,255,255,0.2)" }}>Best School in Muzaffarpur</Link>
            <Link to="/cbse-school-in-muzaffarpur" className="text-xs hover:text-white/60 transition-colors" style={{ color: "rgba(255,255,255,0.2)" }}>CBSE School</Link>
            <Link to="/school-near-me" className="text-xs hover:text-white/60 transition-colors" style={{ color: "rgba(255,255,255,0.2)" }}>School Near Me</Link>
            <p className="text-xs font-semibold tracking-wider" style={{ color: "#00ff41", textShadow: "0 0 8px rgba(0, 255, 65, 0.4)" }}>
              {'> Made by Hacker!'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
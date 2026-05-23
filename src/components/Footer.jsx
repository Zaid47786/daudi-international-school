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
                alt="DIS"
                className="h-11 w-auto"
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

          {/* Contact */}
          <div className="col-span-6 sm:col-span-4 lg:col-span-3">
            <h4
              className="mb-4"
              style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}
            >
              Contact
            </h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-2.5">
                <MapPin size={13} className="mt-0.5 shrink-0" style={{ color: "var(--amber)" }} />
                <span className="text-sm leading-snug" style={{ color: "rgba(255,255,255,0.48)" }}>
                  {settings.address}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={13} className="shrink-0" style={{ color: "var(--amber)" }} />
                <a
                  href={`tel:${settings.phone}`}
                  className="text-sm transition-colors duration-150"
                  style={{ color: "rgba(255,255,255,0.48)" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.48)"}
                >
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={13} className="shrink-0" style={{ color: "var(--amber)" }} />
                <a
                  href={`mailto:${settings.email}`}
                  className="text-sm transition-colors duration-150 break-all"
                  style={{ color: "rgba(255,255,255,0.48)" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.48)"}
                >
                  {settings.email}
                </a>
              </li>
            </ul>
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
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-4 flex flex-col sm:flex-row justify-between gap-1.5">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
            © 2026 Daudi International School, Muzaffarpur
          </p>
          <div className="flex items-center gap-4 sm:gap-6">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
              A Daudi Welfare Trust initiative
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>
              Made by Hacker!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
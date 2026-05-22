import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Youtube } from "lucide-react";
import { useSettings } from "../lib/useSchoolData";

export default function Footer() {
  const { settings } = useSettings();
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://media.base44.com/images/public/user_68a720ca6a1156f1068d37b1/9fb988c1a_dis.png"
                alt="DIS Logo"
                className="h-14 w-auto object-contain"
              />
              <div>
                <div className="font-bold text-lg leading-tight">Daudi International School</div>
                <div className="text-gold text-xs tracking-widest">MUZAFFARPUR</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              A non-profit English medium school under the Daudi Welfare Trust, dedicated to quality education for all.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gold mb-5 text-sm tracking-widest uppercase">Quick Links</h4>
            <ul className="space-y-2">
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
                    className="text-white/60 hover:text-gold text-sm transition-colors duration-200"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-gold mb-5 text-sm tracking-widest uppercase">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">
                  {settings.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gold shrink-0" />
                <a href={`tel:${settings.phone}`} className="text-white/60 hover:text-gold text-sm transition-colors">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gold shrink-0" />
                <a href={`mailto:${settings.email}`} className="text-white/60 hover:text-gold text-sm transition-colors break-all">
                  {settings.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Trust */}
          <div>
            <h4 className="font-bold text-gold mb-5 text-sm tracking-widest uppercase">Follow Us</h4>
            <div className="flex gap-3 mb-6">
              <a
                href={settings.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold hover:text-navy flex items-center justify-center transition-all duration-200 text-white"
              >
                <Facebook size={18} />
              </a>
              <a
                href={settings.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold hover:text-navy flex items-center justify-center transition-all duration-200 text-white"
              >
                <Youtube size={18} />
              </a>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-xs text-white/50 leading-relaxed">
                Operated by <span className="text-gold font-semibold">Daudi Welfare Trust</span>, Muzaffarpur, Bihar.
                <br />Non-Profit Organization
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/40 text-xs">
          © 2026 Daudi International School, Muzaffarpur. All rights reserved.
          </p>
          <p className="text-white/40 text-xs">
            A Daudi Welfare Trust Initiative
          </p>
        </div>
      </div>
    </footer>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, Calendar, Image, BarChart3, Home, LogOut, Menu, X, Inbox, BookOpen } from "lucide-react";
import AdminSettings from "../components/admin/AdminSettings";
import AdminEvents from "../components/admin/AdminEvents";
import AdminGallery from "../components/admin/AdminGallery";
import AdminStats from "../components/admin/AdminStats";
import AdminInquiries from "../components/admin/AdminInquiries";
import AdminBlog from "../components/admin/AdminBlog";
import { base44 } from "@/api/base44Client";

const tabs = [
  { id: "settings", label: "School Info", icon: Settings },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "events", label: "Events", icon: Calendar },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "inquiries", label: "Inquiries", icon: Inbox },
  { id: "blog", label: "Blog", icon: BookOpen },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState("settings");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(() => !!localStorage.getItem("dis_token"));
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setLoggingIn(true);
    try {
      await base44.auth.login(emailInput, passwordInput);
      setAuthenticated(true);
    } catch (err) {
      setPasswordError(err.message || "Invalid credentials. Please try again.");
      setPasswordInput("");
    } finally {
      setLoggingIn(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-cobalt-deep flex items-center justify-center px-4 font-inter">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm">
          <div className="text-center mb-8">
            <img
              src="https://media.base44.com/images/public/user_68a720ca6a1156f1068d37b1/9fb988c1a_dis.png"
              alt="DIS"
              className="h-16 w-auto mx-auto mb-4"
            />
            <h1 className="text-xl font-bold text-navy">Admin Panel</h1>
            <p className="text-gray-400 text-sm mt-1">Enter password to continue</p>
          </div>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => { setEmailInput(e.target.value); setPasswordError(""); }}
              placeholder="Email address"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30"
              autoFocus
            />
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(""); }}
              placeholder="Password"
              required
              className={`w-full border ${passwordError ? "border-red-400" : "border-gray-200"} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30`}
            />
            {passwordError && <p className="text-red-500 text-xs bg-red-50 rounded-lg px-3 py-2">{passwordError}</p>}
            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3 bg-royal-blue text-white font-bold rounded-xl hover:bg-navy transition text-sm disabled:opacity-60"
            >
              {loggingIn ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    base44.auth.logout("/admin");
    setAuthenticated(false);
  };

  const ActiveComponent = {
    settings: AdminSettings,
    stats: AdminStats,
    events: AdminEvents,
    gallery: AdminGallery,
    inquiries: AdminInquiries,
    blog: AdminBlog,
  }[activeTab];

  return (
    <div className="min-h-screen bg-gray-50 flex font-inter">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-navy text-white flex flex-col transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex`}>
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src="https://media.base44.com/images/public/user_68a720ca6a1156f1068d37b1/9fb988c1a_dis.png" alt="DIS" className="h-10 w-auto" />
            <div>
              <div className="font-bold text-sm leading-tight">DIS Admin</div>
              <div className="text-gold text-xs">Muzaffarpur</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-gold text-navy"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <Home size={18} /> View Website
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-gray-600" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <div>
              <h1 className="font-bold text-navy text-lg">{tabs.find((t) => t.id === activeTab)?.label}</h1>
              <p className="text-gray-400 text-xs">Manage your school website content</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
}
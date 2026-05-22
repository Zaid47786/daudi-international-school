import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, Calendar, Image, BarChart3, Home, LogOut, Menu, X, Inbox } from "lucide-react";
import AdminSettings from "../components/admin/AdminSettings";
import AdminEvents from "../components/admin/AdminEvents";
import AdminGallery from "../components/admin/AdminGallery";
import AdminStats from "../components/admin/AdminStats";
import AdminInquiries from "../components/admin/AdminInquiries";
import { base44 } from "@/api/base44Client";

const tabs = [
  { id: "settings", label: "School Info", icon: Settings },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "events", label: "Events", icon: Calendar },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "inquiries", label: "Inquiries", icon: Inbox },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState("settings");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    base44.auth.logout("/");
  };

  const ActiveComponent = {
    settings: AdminSettings,
    stats: AdminStats,
    events: AdminEvents,
    gallery: AdminGallery,
    inquiries: AdminInquiries,
  }[activeTab];

  return (
    <div className="min-h-screen bg-gray-50 flex font-poppins">
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
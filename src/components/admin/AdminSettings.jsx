import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Save, Loader2 } from "lucide-react";

const DEFAULT_SETTINGS = [
  { key: "school_name", label: "School Name", value: "Daudi International School", group: "general" },
  { key: "tagline", label: "Tagline", value: "Muzaffarpur, Bihar — Non-Profit English Medium School", group: "general" },
  { key: "hero_badge", label: "Hero Badge Text", value: "Admissions Open 2026–27", group: "hero" },
  { key: "hero_description", label: "Hero Description", value: "Empowering young minds with quality education, strong values, and a vision for a brighter tomorrow — under the Daudi Welfare Trust.", group: "hero" },
  { key: "founder_quote", label: "Founder Quote", value: "Education is the most powerful weapon which you can use to change the world. At Daudi International School, we believe every child deserves a chance to rise.", group: "general" },
  { key: "address", label: "Address", value: "Shafi Manzil, Daudi Market, Motijheel, Muzaffarpur, Bihar 842001", group: "contact" },
  { key: "phone", label: "Phone", value: "+91 621 224 3314", group: "contact" },
  { key: "email", label: "Email", value: "daudischool.muz@gmail.com", group: "contact" },
  { key: "facebook_url", label: "Facebook URL", value: "https://www.facebook.com/p/Daudi-International-School-Muzaffarpur-100072254675605/", group: "social" },
  { key: "youtube_url", label: "YouTube URL", value: "https://www.youtube.com/@altamashdaudi7099", group: "social" },
];

const GROUP_LABELS = {
  general: "General",
  hero: "Homepage Hero",
  contact: "Contact Info",
  social: "Social Media",
};

export default function AdminSettings() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    const records = await base44.entities.SchoolSettings.list();
    const map = {};
    records.forEach((r) => { map[r.key] = r; });

    // Seed defaults for missing keys
    const toCreate = DEFAULT_SETTINGS.filter((d) => !map[d.key]);
    for (const d of toCreate) {
      const created = await base44.entities.SchoolSettings.create(d);
      map[d.key] = created;
    }

    setSettings(map);
    setLoading(false);
  };

  const handleChange = (key, val) => {
    setSettings((prev) => ({
      ...prev,
      [key]: { ...prev[key], value: val },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    for (const key of Object.keys(settings)) {
      const s = settings[key];
      if (s.id) {
        await base44.entities.SchoolSettings.update(s.id, { value: s.value });
      }
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-royal-blue" size={32} /></div>;

  const grouped = {};
  DEFAULT_SETTINGS.forEach((d) => {
    if (!grouped[d.group]) grouped[d.group] = [];
    grouped[d.group].push(d.key);
  });

  return (
    <div className="max-w-3xl space-y-8">
      {Object.entries(grouped).map(([group, keys]) => (
        <div key={group} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
            <h2 className="font-bold text-navy text-sm tracking-wide uppercase">{GROUP_LABELS[group]}</h2>
          </div>
          <div className="p-6 space-y-5">
            {keys.map((key) => {
              const def = DEFAULT_SETTINGS.find((d) => d.key === key);
              const val = settings[key]?.value ?? "";
              const isLong = key.includes("description") || key.includes("quote") || key.includes("address");
              return (
                <div key={key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{def.label}</label>
                  {isLong ? (
                    <textarea
                      value={val}
                      onChange={(e) => handleChange(key, e.target.value)}
                      rows={3}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-royal-blue/30 resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-royal-blue/30"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 px-8 py-3 bg-royal-blue text-white font-bold rounded-full hover:bg-navy transition-all shadow-lg disabled:opacity-60"
      >
        {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
        {saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
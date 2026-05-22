import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Plus, Trash2, Save, Loader2, GripVertical } from "lucide-react";

const DEFAULT_STATS = [
  { label: "Years of Excellence", value: "10+", icon: "BookOpen", sort_order: 0 },
  { label: "Students Enrolled", value: "500+", icon: "Users", sort_order: 1 },
  { label: "Programs Offered", value: "12+", icon: "Award", sort_order: 2 },
  { label: "Non-Profit Mission", value: "100%", icon: "Heart", sort_order: 3 },
];

const ICON_OPTIONS = ["BookOpen", "Users", "Award", "Heart", "Star", "Globe", "Trophy", "GraduationCap"];

export default function AdminStats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);

  useEffect(() => { loadStats(); }, []);

  const loadStats = async () => {
    setLoading(true);
    let records = await base44.entities.Stat.list("sort_order");
    if (records.length === 0) {
      for (const d of DEFAULT_STATS) {
        const created = await base44.entities.Stat.create(d);
        records.push(created);
      }
    }
    setStats(records);
    setLoading(false);
  };

  const handleChange = (id, field, val) => {
    setStats((prev) => prev.map((s) => s.id === id ? { ...s, [field]: val } : s));
  };

  const handleSave = async (stat) => {
    setSaving(stat.id);
    await base44.entities.Stat.update(stat.id, { label: stat.label, value: stat.value, icon: stat.icon });
    setSaving(null);
  };

  const handleDelete = async (id) => {
    await base44.entities.Stat.delete(id);
    setStats((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAdd = async () => {
    const created = await base44.entities.Stat.create({ label: "New Stat", value: "0", icon: "Star", sort_order: stats.length });
    setStats((prev) => [...prev, created]);
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-royal-blue" size={32} /></div>;

  return (
    <div className="max-w-2xl space-y-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-navy text-sm tracking-wide uppercase">Homepage Stats</h2>
          <button onClick={handleAdd} className="flex items-center gap-2 text-xs font-bold text-royal-blue hover:text-navy transition">
            <Plus size={14} /> Add Stat
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          {stats.map((stat) => (
            <div key={stat.id} className="p-5 flex items-center gap-4">
              <GripVertical size={16} className="text-gray-300 flex-shrink-0" />
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Label</label>
                  <input
                    value={stat.label}
                    onChange={(e) => handleChange(stat.id, "label", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Value</label>
                  <input
                    value={stat.value}
                    onChange={(e) => handleChange(stat.id, "value", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Icon</label>
                  <select
                    value={stat.icon}
                    onChange={(e) => handleChange(stat.id, "icon", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30"
                  >
                    {ICON_OPTIONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleSave(stat)}
                  disabled={saving === stat.id}
                  className="p-2 bg-royal-blue text-white rounded-lg hover:bg-navy transition disabled:opacity-60"
                  title="Save"
                >
                  {saving === stat.id ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                </button>
                <button
                  onClick={() => handleDelete(stat.id)}
                  className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
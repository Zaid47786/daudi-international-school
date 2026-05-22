import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Plus, Trash2, Pencil, X, Loader2, Check } from "lucide-react";

const EMPTY_EVENT = { title: "", date: "", time: "", location: "", description: "", category: "Academic", status: "upcoming", featured: false };
const CATEGORIES = ["National Event", "Academic", "Sports", "Cultural", "Trust Event", "School Event"];
const STATUS_COLORS = { upcoming: "bg-green-100 text-green-700", past: "bg-gray-100 text-gray-600" };

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_EVENT);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => { loadEvents(); }, []);

  const loadEvents = async () => {
    setLoading(true);
    const records = await base44.entities.Event.list("-date");
    setEvents(records);
    setLoading(false);
  };

  const openAdd = () => { setEditing("new"); setForm(EMPTY_EVENT); };
  const openEdit = (ev) => { setEditing(ev.id); setForm({ ...ev }); };
  const closeEdit = () => { setEditing(null); setForm(EMPTY_EVENT); };

  const handleSave = async () => {
    setSaving(true);
    if (editing === "new") {
      const created = await base44.entities.Event.create(form);
      setEvents((prev) => [created, ...prev]);
    } else {
      await base44.entities.Event.update(editing, form);
      setEvents((prev) => prev.map((e) => e.id === editing ? { ...e, ...form } : e));
    }
    setSaving(false);
    closeEdit();
  };

  const handleDelete = async (id) => {
    await base44.entities.Event.delete(id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const filtered = filter === "all" ? events : events.filter((e) => e.status === filter);

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-royal-blue" size={32} /></div>;

  return (
    <div className="space-y-5 max-w-4xl">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2">
          {["all", "upcoming", "past"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${filter === f ? "bg-royal-blue text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2 bg-royal-blue text-white text-sm font-bold rounded-full hover:bg-navy transition shadow">
          <Plus size={15} /> Add Event
        </button>
      </div>

      {/* Add / Edit Form */}
      {editing && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-navy">{editing === "new" ? "Add New Event" : "Edit Event"}</h3>
            <button onClick={closeEdit} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs text-gray-500 mb-1 block">Title *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Date *</label>
              <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                placeholder="e.g. January 26, 2026"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Time</label>
              <input value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
                placeholder="e.g. 9:00 AM"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30">
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30">
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-gray-500 mb-1 block">Location</label>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-gray-500 mb-1 block">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30 resize-none" />
            </div>
            <div className="sm:col-span-2 flex items-center gap-2">
              <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="w-4 h-4 accent-royal-blue" />
              <label htmlFor="featured" className="text-sm text-gray-700">Feature on Events page</label>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={closeEdit} className="px-5 py-2 border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-50 transition">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2 bg-royal-blue text-white font-bold rounded-full hover:bg-navy transition disabled:opacity-60 text-sm">
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
              {saving ? "Saving..." : "Save Event"}
            </button>
          </div>
        </div>
      )}

      {/* Events List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">No events yet. Add your first event!</div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map((ev) => (
              <div key={ev.id} className="flex items-start gap-4 p-5 hover:bg-gray-50 transition">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-navy text-sm">{ev.title}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[ev.status]}`}>{ev.status}</span>
                    {ev.featured && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold/20 text-gold-dark">Featured</span>}
                  </div>
                  <p className="text-gray-400 text-xs">{ev.date} {ev.time && `· ${ev.time}`} {ev.location && `· ${ev.location}`}</p>
                  {ev.description && <p className="text-gray-500 text-xs mt-1 line-clamp-1">{ev.description}</p>}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(ev)} className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-royal-blue/10 hover:text-royal-blue transition"><Pencil size={14} /></button>
                  <button onClick={() => handleDelete(ev.id)} className="p-2 bg-red-50 text-red-400 rounded-lg hover:bg-red-100 transition"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
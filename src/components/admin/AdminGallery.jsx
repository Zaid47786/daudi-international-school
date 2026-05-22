import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Plus, Trash2, Loader2, X, Check, Image } from "lucide-react";

const CATEGORIES = ["Campus", "Events", "Classrooms", "Sports", "Cultural"];
const EMPTY_PHOTO = { title: "", src: "", category: "Events", is_real: false, sort_order: 0 };

export default function AdminGallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(EMPTY_PHOTO);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState("All");

  useEffect(() => { loadPhotos(); }, []);

  const loadPhotos = async () => {
    setLoading(true);
    const records = await base44.entities.GalleryPhoto.list("sort_order");
    setPhotos(records);
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!form.src || !form.title) return;
    setSaving(true);
    const created = await base44.entities.GalleryPhoto.create({ ...form, sort_order: photos.length });
    setPhotos((prev) => [...prev, created]);
    setForm(EMPTY_PHOTO);
    setAdding(false);
    setSaving(false);
  };

  const handleDelete = async (id) => {
    await base44.entities.GalleryPhoto.delete(id);
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const filtered = filter === "All" ? photos : photos.filter((p) => p.category === filter);

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-royal-blue" size={32} /></div>;

  return (
    <div className="space-y-5 max-w-5xl">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {["All", ...CATEGORIES].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${filter === f ? "bg-royal-blue text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
              {f}
            </button>
          ))}
        </div>
        <button onClick={() => setAdding(true)} className="flex items-center gap-2 px-5 py-2 bg-royal-blue text-white text-sm font-bold rounded-full hover:bg-navy transition shadow">
          <Plus size={15} /> Add Photo
        </button>
      </div>

      {/* Add Form */}
      {adding && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-navy">Add New Photo</h3>
            <button onClick={() => setAdding(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs text-gray-500 mb-1 block">Image URL *</label>
              <input value={form.src} onChange={(e) => setForm({ ...form, src: e.target.value })}
                placeholder="https://..."
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30" />
            </div>
            {form.src && (
              <div className="sm:col-span-2">
                <img src={form.src} alt="preview" className="h-32 rounded-xl object-cover border border-gray-100" onError={(e) => { e.target.style.display = "none"; }} />
              </div>
            )}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Title *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/30">
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2 flex items-center gap-2">
              <input type="checkbox" id="is_real" checked={form.is_real} onChange={(e) => setForm({ ...form, is_real: e.target.checked })} className="w-4 h-4 accent-royal-blue" />
              <label htmlFor="is_real" className="text-sm text-gray-700">Mark as real DIS photo (shows DIS badge)</label>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setAdding(false)} className="px-5 py-2 border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-50 transition">Cancel</button>
            <button onClick={handleAdd} disabled={saving || !form.src || !form.title}
              className="flex items-center gap-2 px-6 py-2 bg-royal-blue text-white font-bold rounded-full hover:bg-navy transition disabled:opacity-60 text-sm">
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
              Add Photo
            </button>
          </div>
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 text-center py-20 text-gray-400">
          <Image size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No photos yet. Add your first photo!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((photo) => (
            <div key={photo.id} className="group relative rounded-2xl overflow-hidden aspect-square bg-gray-100 shadow-sm">
              <img src={photo.src} alt={photo.title} className="w-full h-full object-cover" />
              {photo.is_real && (
                <div className="absolute top-2 left-2 bg-gold text-navy text-[10px] font-bold px-2 py-0.5 rounded-full">DIS</div>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 p-3">
                <p className="text-white text-xs font-semibold text-center line-clamp-2">{photo.title}</p>
                <span className="text-gold text-[10px]">{photo.category}</span>
                <button onClick={() => handleDelete(photo.id)}
                  className="mt-2 flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full hover:bg-red-600 transition">
                  <Trash2 size={12} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2, Mail, Phone, User, GraduationCap, MessageSquare, Trash2, ChevronDown } from "lucide-react";

const STATUS_COLORS = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  enrolled: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  useEffect(() => { loadInquiries(); }, []);

  const loadInquiries = async () => {
    setLoading(true);
    const records = await base44.entities.AdmissionInquiry.list("-created_date");
    setInquiries(records);
    setLoading(false);
  };

  const handleStatusChange = async (id, status) => {
    await base44.entities.AdmissionInquiry.update(id, { status });
    setInquiries((prev) => prev.map((i) => i.id === id ? { ...i, status } : i));
  };

  const handleDelete = async (id) => {
    await base44.entities.AdmissionInquiry.delete(id);
    setInquiries((prev) => prev.filter((i) => i.id !== id));
  };

  const filtered = filter === "all" ? inquiries : inquiries.filter((i) => i.status === filter);

  const counts = inquiries.reduce((acc, i) => { acc[i.status] = (acc[i.status] || 0) + 1; return acc; }, {});

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-royal-blue" size={32} /></div>;

  return (
    <div className="space-y-5 max-w-4xl">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { key: "all", label: "Total", count: inquiries.length, color: "bg-navy" },
          { key: "new", label: "New", count: counts.new || 0, color: "bg-blue-600" },
          { key: "contacted", label: "Contacted", count: counts.contacted || 0, color: "bg-yellow-500" },
          { key: "enrolled", label: "Enrolled", count: counts.enrolled || 0, color: "bg-green-600" },
        ].map((s) => (
          <button key={s.key} onClick={() => setFilter(s.key)}
            className={`${s.color} text-white rounded-2xl p-4 text-left transition hover:opacity-90 ${filter === s.key ? "ring-2 ring-gold" : ""}`}>
            <div className="text-2xl font-bold">{s.count}</div>
            <div className="text-white/70 text-xs mt-0.5">{s.label}</div>
          </button>
        ))}
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">No inquiries yet.</div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map((inq) => (
              <div key={inq.id} className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className="font-bold text-navy text-sm">{inq.child_name}</span>
                      <span className="text-gray-400 text-xs">applying for</span>
                      <span className="font-semibold text-royal-blue text-xs">{inq.grade}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[inq.status]}`}>{inq.status}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><User size={11} /> {inq.parent_name}</span>
                      <span className="flex items-center gap-1"><Phone size={11} /> {inq.phone}</span>
                      {inq.email && <span className="flex items-center gap-1"><Mail size={11} /> {inq.email}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <select value={inq.status} onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                      className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-royal-blue/30">
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="enrolled">Enrolled</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <button onClick={() => setExpanded(expanded === inq.id ? null : inq.id)}
                      className="p-1.5 text-gray-400 hover:text-gray-600 transition">
                      <ChevronDown size={14} className={`transition-transform ${expanded === inq.id ? "rotate-180" : ""}`} />
                    </button>
                    <button onClick={() => handleDelete(inq.id)} className="p-1.5 text-red-400 hover:text-red-600 transition">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                {expanded === inq.id && inq.message && (
                  <div className="mt-3 pt-3 border-t border-gray-50">
                    <div className="flex items-start gap-2 text-xs text-gray-500">
                      <MessageSquare size={12} className="mt-0.5 flex-shrink-0" />
                      <p>{inq.message}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
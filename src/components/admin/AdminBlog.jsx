import { useState, useEffect } from "react";
import { Plus, Trash2, Eye, EyeOff, Star, Pencil, X } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import ReactQuill from "react-quill";

const CATEGORIES = ["Events", "Academics", "Achievements", "Admissions", "Science & Tech", "School Life", "Announcements"];

const EMPTY = {
  title: "", slug: "", excerpt: "", content: "", cover_image: "",
  category: "Events", author: "DIS Team", published: false, featured: false,
  meta_description: "", tags: "",
};

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const load = () => {
    base44.entities.BlogPost.list("-created_date").then(data => {
      setPosts(data);
      setLoading(false);
    });
  };

  useEffect(() => { load(); }, []);

  const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const openNew = () => { setEditingPost(null); setForm(EMPTY); setShowForm(true); };
  const openEdit = (post) => { setEditingPost(post); setForm({ ...post }); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditingPost(null); setForm(EMPTY); };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    if (editingPost) {
      await base44.entities.BlogPost.update(editingPost.id, { ...form });
      toast({ title: "Post updated!" });
    } else {
      await base44.entities.BlogPost.create({ ...form, slug: form.slug || slugify(form.title) });
      toast({ title: "Post created!" });
    }
    closeForm();
    load();
    setSaving(false);
  };

  const toggle = async (post, field) => {
    await base44.entities.BlogPost.update(post.id, { [field]: !post[field] });
    load();
  };

  const remove = async (id) => {
    await base44.entities.BlogPost.delete(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-lg" style={{ color: "var(--ink)" }}>Blog Posts</h2>
        <button onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
          style={{ backgroundColor: "var(--cobalt-deep)", color: "#fff" }}>
          <Plus size={14} /> New Post
        </button>
      </div>

      {showForm && (
        <form onSubmit={save} className="mb-8 p-6 rounded-2xl border space-y-4" style={{ backgroundColor: "var(--cream)", borderColor: "var(--cream-dark)" }}>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm" style={{ color: "var(--ink)" }}>{editingPost ? "Edit Post" : "Create New Post"}</h3>
            <button type="button" onClick={closeForm} className="p-1 rounded hover:bg-black/5"><X size={16} style={{ color: "var(--ink-muted)" }} /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: "title", label: "Title", required: true },
              { key: "slug", label: "Slug (URL)", placeholder: "auto-generated from title" },
              { key: "author", label: "Author" },
              { key: "cover_image", label: "Cover Image URL" },
              { key: "meta_description", label: "Meta Description (160 chars)" },
              { key: "tags", label: "Tags (comma-separated)" },
            ].map(f => (
              <div key={f.key} className={f.key === "title" || f.key === "meta_description" ? "sm:col-span-2" : ""}>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--ink-muted)" }}>{f.label}</label>
                <input
                  type="text"
                  required={f.required}
                  placeholder={f.placeholder || ""}
                  value={form[f.key]}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-lg text-sm border outline-none"
                  style={{ borderColor: "var(--cream-dark)", backgroundColor: "#fff" }}
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--ink-muted)" }}>Category</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-lg text-sm border" style={{ borderColor: "var(--cream-dark)", backgroundColor: "#fff" }}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-6 pt-4">
              {[{ key: "published", label: "Published" }, { key: "featured", label: "Featured" }].map(f => (
                <label key={f.key} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.checked }))} className="w-4 h-4" />
                  <span style={{ color: "var(--ink-soft)" }}>{f.label}</span>
                </label>
              ))}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--ink-muted)" }}>Excerpt</label>
              <textarea
                rows={2}
                value={form.excerpt}
                onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-lg text-sm border outline-none resize-none"
                style={{ borderColor: "var(--cream-dark)", backgroundColor: "#fff" }}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--ink-muted)" }}>Content</label>
              <div className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--cream-dark)", backgroundColor: "#fff" }}>
                <ReactQuill
                  theme="snow"
                  value={form.content}
                  onChange={(val) => setForm(p => ({ ...p, content: val }))}
                  style={{ minHeight: "220px" }}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, false] }],
                      ["bold", "italic", "underline"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "blockquote"],
                      ["clean"],
                    ],
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-60"
              style={{ backgroundColor: "var(--cobalt-deep)", color: "#fff" }}>
              {saving ? "Saving..." : editingPost ? "Update Post" : "Publish Post"}
            </button>
            <button type="button" onClick={closeForm}
              className="px-5 py-2.5 rounded-lg text-sm border"
              style={{ borderColor: "var(--cream-dark)", color: "var(--ink-soft)" }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map(i => <div key={i} className="h-14 rounded-xl animate-pulse" style={{ backgroundColor: "var(--cream)" }} />)}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 text-sm" style={{ color: "var(--ink-muted)" }}>No blog posts yet. Create your first post above.</div>
      ) : (
        <div className="space-y-2">
          {posts.map(post => (
            <div key={post.id}
              className="flex items-center gap-4 p-4 rounded-xl border"
              style={{ backgroundColor: post.published ? "#fff" : "var(--cream)", borderColor: "var(--cream-dark)" }}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-sm truncate" style={{ color: "var(--ink)" }}>{post.title}</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                    style={{ backgroundColor: post.published ? "#dcfce7" : "#fef3c7", color: post.published ? "#15803d" : "#d97706" }}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                  {post.featured && <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: "#fef3c7", color: "#d97706" }}>Featured</span>}
                </div>
                <p className="text-xs mt-0.5" style={{ color: "var(--ink-muted)" }}>{post.category} · /blog/{post.slug}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => openEdit(post)} title="Edit"
                  className="p-2 rounded-lg transition-colors hover:bg-gray-100">
                  <Pencil size={14} style={{ color: "var(--cobalt)" }} />
                </button>
                <button onClick={() => toggle(post, "published")} title={post.published ? "Unpublish" : "Publish"}
                  className="p-2 rounded-lg transition-colors hover:bg-gray-100">
                  {post.published ? <EyeOff size={14} style={{ color: "var(--ink-muted)" }} /> : <Eye size={14} style={{ color: "var(--cobalt)" }} />}
                </button>
                <button onClick={() => toggle(post, "featured")} title="Toggle featured"
                  className="p-2 rounded-lg transition-colors hover:bg-gray-100">
                  <Star size={14} style={{ color: post.featured ? "var(--amber)" : "var(--ink-muted)" }} fill={post.featured ? "var(--amber)" : "none"} />
                </button>
                <button onClick={() => remove(post.id)} title="Delete"
                  className="p-2 rounded-lg transition-colors hover:bg-red-50">
                  <Trash2 size={14} style={{ color: "#ef4444" }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
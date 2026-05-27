/**
 * Standalone admin login page — replaces Base44 hosted auth.
 * After migration, this file lives at: src/pages/AdminLogin.jsx
 * Route added to App.jsx:  <Route path="/admin/login" element={<AdminLogin />} />
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/api/AuthContext";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      const next = new URLSearchParams(window.location.search).get("next") || "/admin";
      navigate(next);
    } catch (err) {
      setError(err.message || "Login failed. Check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--cobalt-deep)", fontFamily: "var(--font-inter)" }}
    >
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <img
            src="/dis.png"
            alt="Daudi International School"
            className="h-12 w-auto mb-4"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
          <h1 className="text-xl font-bold" style={{ color: "var(--cobalt-deep)" }}>
            Admin Login
          </h1>
          <p className="text-sm text-gray-400 mt-1">Daudi International School</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              autoComplete="email"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2"
              style={{ "--tw-ring-color": "rgba(26,53,128,0.3)" }}
              placeholder="admin@daudischool.in"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2"
              style={{ "--tw-ring-color": "rgba(26,53,128,0.3)" }}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-sm font-bold rounded-xl transition-all hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: "var(--cobalt-deep)", color: "#fff" }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-300 mt-6">
          DIS Admin Panel · Muzaffarpur
        </p>
      </div>
    </div>
  );
}
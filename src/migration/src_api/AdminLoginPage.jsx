/**
 * Standalone admin login page — replaces Base44 hosted auth.
 * Place at: src/pages/AdminLogin.jsx
 * Route: /admin/login
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
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--cobalt-deep)" }}>
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <img
            src="/dis.png"
            alt="DIS"
            className="h-12 w-auto mb-3"
          />
          <h1 className="text-xl font-bold text-cobalt-deep">Admin Login</h1>
          <p className="text-sm text-gray-400 mt-1">Daudi International School</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cobalt/30"
              placeholder="admin@daudischool.in"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cobalt/30"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-sm font-bold rounded-xl transition-all hover:brightness-110 disabled:opacity-60"
            style={{ backgroundColor: "var(--cobalt-deep)", color: "#fff" }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
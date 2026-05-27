/**
 * Drop-in replacement for src/lib/AuthContext.jsx
 * Uses local JWT (via apiClient) instead of Base44 auth.
 *
 * After migration, copy this file to: src/api/AuthContext.jsx
 * Then update all imports:
 *   from: import { AuthProvider, useAuth } from "@/lib/AuthContext";
 *   to:   import { AuthProvider, useAuth } from "@/api/AuthContext";
 */
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { base44 } from "./apiClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  // Always false — no public-settings loading concept in standalone mode
  const [isLoadingPublicSettings] = useState(false);
  const [authError, setAuthError] = useState(null);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const u = await base44.auth.me();
      setUser(u);
      setAuthError(null);
    } catch {
      setUser(null);
      // Don't treat "not logged in" as an error — just means public visitor
      setAuthError(null);
    } finally {
      setIsLoadingAuth(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const login = async (email, password) => {
    const u = await base44.auth.login(email, password);
    setUser(u);
    setAuthError(null);
    return u;
  };

  const logout = (redirectUrl) => {
    base44.auth.logout(redirectUrl || "/");
    setUser(null);
  };

  const navigateToLogin = (nextUrl) => {
    base44.auth.redirectToLogin(nextUrl);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingAuth,
        isLoadingPublicSettings,
        authError,
        login,
        logout,
        navigateToLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
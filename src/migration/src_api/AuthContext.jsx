/**
 * Drop-in replacement for lib/AuthContext.jsx
 * Uses local JWT instead of Base44 auth.
 */
import { createContext, useContext, useState, useEffect } from "react";
import { base44 } from "./apiClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    base44.auth.me()
      .then((u) => { setUser(u); setIsLoadingAuth(false); })
      .catch(() => { setIsLoadingAuth(false); });
  }, []);

  const login = async (email, password) => {
    const u = await base44.auth.login(email, password);
    setUser(u);
    return u;
  };

  const logout = () => {
    base44.auth.logout();
    setUser(null);
  };

  const navigateToLogin = () => base44.auth.redirectToLogin();

  return (
    <AuthContext.Provider value={{
      user,
      isLoadingAuth,
      isLoadingPublicSettings: false,
      authError,
      login,
      logout,
      navigateToLogin,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings] = useState(false);
  const [authError] = useState(null);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const u = await base44.auth.me();
      setUser(u);
    } catch {
      setUser(null);
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
    <AuthContext.Provider value={{ 
      user, 
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      login,
      logout,
      navigateToLogin,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
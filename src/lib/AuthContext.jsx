import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { schoolApi } from '@/api/schoolApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings] = useState(false);
  const [authError] = useState(null);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const u = await schoolApi.auth.me();
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

  const login = async (password) => {
    const u = await schoolApi.auth.login(password);
    setUser(u);
    return u;
  };

  const logout = (redirectUrl) => {
    schoolApi.auth.logout(redirectUrl || "/");
    setUser(null);
  };

  const navigateToLogin = (nextUrl) => {
    schoolApi.auth.redirectToLogin(nextUrl);
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

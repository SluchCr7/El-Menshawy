'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import API from './api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Load current authenticated user profile
  const checkUserAuth = async () => {
    try {
      setLoading(true);
      const response = await API.get('/users/me');
      if (response.data && response.data.success) {
        setUser(response.data.data);
      }
    } catch (err) {
      setUser(null);
      // Suppress console error on initial guest check
    } finally {
      setLoading(false);
    }
  };

  // Login action
  const login = async (email, password) => {
    setError(null);
    try {
      const response = await API.post('/users/login', { email, password });
      if (response.data && response.data.success) {
        setUser(response.data.data);
        return { success: true, message: response.data.message };
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || 'فشل تسجيل الدخول. يرجى التحقق من البيانات.';
      setError(errMsg);
      return { success: false, message: errMsg };
    }
  };

  // Register action
  const register = async (name, email, password) => {
    setError(null);
    try {
      const response = await API.post('/users/register', { name, email, password });
      if (response.data && response.data.success) {
        setUser(response.data.data);
        return { success: true, message: response.data.message };
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || 'فشل إنشاء الحساب. يرجى المحاولة لاحقاً.';
      setError(errMsg);
      return { success: false, message: errMsg };
    }
  };

  // Logout action
  const logout = async () => {
    try {
      await API.post('/users/logout');
    } catch (err) {
      console.error('Logout error on backend:', err);
    } finally {
      setUser(null);
      router.push('/');
    }
  };

  useEffect(() => {
    // Initial fetch of user profile
    checkUserAuth();

    // Listen to token expiration events from Axios interceptor
    const handleSessionExpired = () => {
      setUser(null);
      router.push('/Auth');
    };

    window.addEventListener('auth_session_expired', handleSessionExpired);
    return () => {
      window.removeEventListener('auth_session_expired', handleSessionExpired);
    };
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        checkUserAuth,
      }}
    >
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

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const API = '/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('pawquest_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('pawquest_token') || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) localStorage.setItem('pawquest_user', JSON.stringify(user));
    else localStorage.removeItem('pawquest_user');
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem('pawquest_token', token);
    else localStorage.removeItem('pawquest_token');
  }, [token]);

  useEffect(() => {
    async function refresh() {
      if (!token) return;
      try {
        const res = await fetch(`${API}/me`, { headers: { 'x-user-id': token } });
        if (!res.ok) throw new Error('session');
        const data = await res.json();
        setUser(data.user);
      } catch {
        setUser(null);
        setToken('');
      }
    }
    refresh();
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      setUser(data.user);
      setToken(data.token);
      return { ok: true };
    } catch (err) {
      return { ok: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      setUser(data.user);
      setToken(data.token);
      return { ok: true };
    } catch (err) {
      return { ok: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken('');
  };

  const value = useMemo(() => ({ user, token, loading, login, register, logout }), [user, token, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

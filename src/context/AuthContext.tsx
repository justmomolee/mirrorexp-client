import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  const [fetching, setFetching] = useState(true);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
  const location = useLocation();

  const authHeaders = (headers: HeadersInit = {}) => {
    return token
      ? { ...headers, Authorization: `Bearer ${token}` }
      : headers;
  };

  const login = (userData: any, authToken?: string) => {
    setUser(userData);
    if (authToken) {
      setToken(authToken);
      localStorage.setItem('token', authToken);
    }
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  const fetchUser = async (overrideToken?: string) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    const activeToken = overrideToken || token;

    if (!activeToken) {
      setFetching(false);
      return;
    }

    try {
      const res = await fetch(`${url}/users/me`, {
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${activeToken}`,
        },
      });
      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        if (res.status === 401) logout();
        throw new Error(data.message);
      }
    } catch (error: any) {
      console.error('Fetch error:', error.message);
    } finally {
      clearTimeout(timeoutId);
      setFetching(false);
    }
  };

  useEffect(() => {
    setFetching(true);
    const storedToken = localStorage.getItem('token');
    const storageData = localStorage.getItem('user');

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedToken) {
      if (storageData) {
        try {
          const parsedUser = JSON.parse(storageData);
          if (parsedUser) setUser(parsedUser);
        } catch (err) {
          console.error("Failed to parse stored user", err);
        }
      }
      fetchUser(storedToken);
    } else {
      setUser(null);
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    if (token && location.pathname.includes('/dashboard')) {
      fetchUser();
    }
  }, [location.pathname, token]);

  return (
    <AuthContext.Provider value={{ user, token, fetching, login, logout, authHeaders }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);
export const contextData = useAuthContext;

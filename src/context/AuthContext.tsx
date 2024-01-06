import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }:any) => {
  const [user, setUser] = useState(null);
  const [fetching, setFetching] = useState(true);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const login = (userData:any) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  useEffect(() => {
    setFetching(true);
    const storageData = localStorage.getItem('user');
  
    if (storageData) {
      const user = JSON.parse(storageData);

      const fetchUser = async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000);

        try {
          const res = await fetch(`${url}/users/${user._id}`, {
            signal: controller.signal,
          });
          const data = await res.json();

          if (res.ok) {
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
          } else {
            throw new Error(data.message);
          }
        } catch (error:any) {
          console.error(error.message);
        } finally {
          clearTimeout(timeoutId);
          setTimeout(() => { 
            setFetching(false);
          }, 5000);
        }
      };
  
      fetchUser();
    } else {
      setTimeout(() => { 
        setUser(null);
        setFetching(false);
      }, 5000);
    }
  }, []);
  



  return (
    <AuthContext.Provider value={{ user, fetching, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);
export const contextData = useAuthContext;

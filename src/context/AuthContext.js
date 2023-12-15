import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [fetching, setFetching] = useState(true);
  const url = process.env.REACT_APP_SERVER_URL;

  const login = (userData) => {
    setUser(userData);
    setFetching(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('User');
    localStorage.removeItem('Admin')
  };

  useEffect(() => {
    setFetching(true);
    const User = JSON.parse(localStorage.getItem('User'));
    const admin = JSON.parse(localStorage.getItem('Admin'));

    if (User) {
      const fetchUserData = async () => {
        try {
          const res = await fetch(`${url}/users/${user.email}`);
          const data = await res.json();
          if (res.ok) {
            setUser(data);
            localStorage.setItem('User', JSON.stringify(data));
            setFetching(false)
          } else { throw new Error(data.message) }
        } catch (error) { 
          setUser(user) 
          setFetching(false)
        }
      };

      fetchUserData();
    } else if (admin) {
        setUser(admin);
        setFetching(false)
      } else {
        setUser(null);
        setFetching(false)
      }
  }, [url]);



  return (
    <AuthContext.Provider value={{ user, fetching, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

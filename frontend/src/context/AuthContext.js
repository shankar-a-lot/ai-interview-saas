import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Try to get the user from localStorage when the app first loads
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // This effect runs whenever the 'user' state changes
  useEffect(() => {
    if (user) {
      // If user logs in, save them to localStorage
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      // If user logs out, remove them from localStorage
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
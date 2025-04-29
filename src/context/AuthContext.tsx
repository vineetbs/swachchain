// src/AuthContext.jsx
import React, { useState, createContext } from "react";

export const AuthContext = createContext({
  auth: { user: null, isSignedIn: false },
  login: (resData) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  // Initialize auth state with token from localStorage (if any)
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    user: localStorage.getItem("userID"),
    isSignedIn: false,
  });

  const login = (resData) => {
    localStorage.setItem("token", resData.token);
    localStorage.setItem("userID", resData.user._id);

    setAuth((pre) => {
      return { ...pre, user: resData.user, isSignedIn: true };
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    setAuth((pre) => {
      return { ...pre, user: null, isSignedIn: false };
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

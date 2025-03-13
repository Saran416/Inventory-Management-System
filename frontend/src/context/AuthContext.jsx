"use client";

import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true); // Track when auth is loaded
  const router = useRouter();

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) setAuth(JSON.parse(storedAuth));
    setLoading(false); // Mark loading complete
  }, []);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  const logout = () => {
    setAuth(false);
    localStorage.removeItem("auth");
    localStorage.removeItem("user"); // Remove stored user info
    router.push("/login"); // Redirect to login page
  };


  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

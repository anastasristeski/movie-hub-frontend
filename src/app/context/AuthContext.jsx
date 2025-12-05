"use client";

import { clearAccessToken, setAccessToken } from "@/lib/api/auth";
import api from "@/lib/api/axios";
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const refreshResponse = await api.post("/auth/refresh");
        const newToken = refreshResponse.data?.token;
        if (newToken) {
          setAccessToken(newToken);
        } else {
          clearAccessToken();
          setUser(null);
          return;
        }

        const meResponse = await api.get("/profile/me");
        setUser(meResponse.data);
      } catch (err) {
        clearAccessToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function logout() {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error", error);
    }
    clearAccessToken();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

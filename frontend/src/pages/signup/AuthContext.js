// src/contexts/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import api from "../../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await api.get("/users/session-info");
      setUser(res.data.user);
      return res.data.user;
    } catch (err) {
      console.error("Failed to fetch session:", err);
      setUser(null);
      return null;
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

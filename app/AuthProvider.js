import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { Platform } from "react-native";

const AuthContext = createContext({
  user: null,
  attemptLogin: async (username, password) => false,
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const base = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";

  const attemptLogin = async (username, password) => {
    try {
      const res = await axios.get(`${base}/users`, {
        params: { username, password },
      });

      if (Array.isArray(res.data) && res.data.length > 0) {
        setUser({ username });
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error("attemptLogin error", e?.response ?? e?.message ?? e);
      return false;
    }
  };

  return <AuthContext.Provider value={{ user, attemptLogin }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);


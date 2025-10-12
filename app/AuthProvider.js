import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { Alert, Platform } from "react-native";

const AuthContext = createContext({
  user: null,
  attemptLogin: async (username, password) => false,
  createAccount: async (username, password) => false,
  getUser: async () => null,
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [desc, setDesc] = useState(null);
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

  const createAccount = async (username, password) => {
    try {
      const getRes = await axios.get(`${base}/users`, {
        params: { username },
      });
      if (Array.isArray(getRes.data) && getRes.data.length < 1) {
        await axios.post(`${base}/users`, {
          username,
          password,
          description,
        });
        setUser(username);
        return true;
      } else {
        console.log("username already exists");
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  const getUser = async () => {
    try {
      const res = await axios.get(`${base}/users`, {
        params: { user },
      });
      const row = res.data[0];
      console.log(res.data[0])
      return {username: row.username, description: row.description}; 
    } catch (err) {
      console.log(err);
      Alert.alert("Failed to get profile");
      return null;
    };
  }

  return <AuthContext.Provider value={{ user, attemptLogin, createAccount, getUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);


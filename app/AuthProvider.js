import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { Alert, Platform } from "react-native";

const AuthContext = createContext({
  user: { username: null, description: null, postDate: null, id: null },
  attemptLogin: async (username, password) => false,
  createAccount: async (username, password) => false,
  createPost: async (uri, title, content) => false,
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
        try {
          const res = await axios.get(`${base}/users`, {
            params: { username },
          });
          const row = res.data[0];
          setUser({
            username: row.username,
            description: row.description,
            postDate: row.postDate,
            id: row.id
          })
          return true;
        } catch (err) {
          console.log(err);
          Alert.alert("Failed to get profile");
          return null;
        };
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
        const postRes = await axios.post(`${base}/users`, {
          username,
          description,
          postDate: null,
        });

        setUser({
          username,
          password,
          description,
          postDate: null,
          id: postRes.data.id
        });
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

  const createPost = async (uri, title, content) => {

    if (!user) {
      Alert.alert("User not logged in");
      return false;
    }

    const today = new Date;
    const res = await axios.get(`${base}/users/${user.id}`)
    const postDate = res.data?.postDate;
    console.log(user.postDate, today.toDateString());
    if (user.postDate === today.toDateString()) {
      Alert.alert("You've already posted once today!", "Come back later to post again.");
      return true;
    }

    try {
      await axios.post(`${base}/posts`, {
        title,
        content,
        username: user.username,
        date: today.toDateString(),
        image: uri,
        likes: 0,
      }, {
        headers: { 'Content-Type': "application/json" }
      })

      await axios.patch(`${base}/users/${user.id}`, {
        postDate: today.toDateString()
      });
      return true;
    } catch (error) {
      console.log("Upload failed: ", error);
      Alert.alert("Upload Failed")
      return false;
    }
  }

  return <AuthContext.Provider value={{ user, attemptLogin, createAccount, createPost }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);


import axios from "axios";
import { useRouter } from "expo-router";
import React, { createContext, useContext, useState } from "react";
import { Alert, Platform } from "react-native";

const AuthContext = createContext({
  user: { username: null, description: null, postDate: null, id: null },
  base: null,
  attemptLogin: async (username, password) => false,
  createAccount: async (username, password) => false,
  createPost: async (uri, title, content) => false,
  updateDesc: async (newDesc) => false,
  checkUser: () => false, 
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [desc, setDesc] = useState(null);
  const router = useRouter();
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
          description: "Add a description!",
          postDate: null,
        });

        setUser({
          username,
          password,
          description: "Add a description!",
          postDate: null,
          id: postRes.data.id
        });
        return true;
      } else {
        // Todo, alert user on this case
        console.log("username already exists");
        return false;
      }
    } catch (err) {
      console.log("Failed to create account: " + err);
      return false;
    }
  }

  const createPost = async (uri, title, content) => {
    checkUser(); 
    if (!user) {
      Alert.alert("User not logged in");
      return false;
    }

    const date = new Date;
    const today = date.toDateString();
    try {
      const res = await axios.get(`${base}/users/${user.id}`);
    } catch (error) {
      console.log("Failed to get user, createPost: ", error);
      return false;
    }
    const postDate = res.data?.postDate;

    if (user.postDate === today) {
      Alert.alert("You've already posted once today!", "Come back later to post again.");
      return true;
    }

    try {
      await axios.post(`${base}/posts`, {
        title,
        content,
        username: user.username,
        date: today,
        image: uri,
        likes: 0,
      }, {
        headers: { 'Content-Type': "application/json" }
      })

      await axios.patch(`${base}/users/${user.id}`, {
        postDate: today
      });

      setUser(prevUser => ({
        ...prevUser,
        postDate: today,
      }))
      return true;
    } catch (error) {
      console.log("Upload failed: ", error);
      Alert.alert("Upload Failed")
      return false;
    }
  }

  const updateDesc = async (newDesc) => {
    checkUser(); 
    try {
      await axios.patch(`${base}/users/${user.id}`, {
        description: newDesc
      });

      setUser(prevUser => ({
        ...prevUser,
        description: newDesc,
      }));
      return true;
    } catch (error) {
      console.log("Failed to update description: " + error);
      return false;
    }
  }

  const checkUser = () => {
    if (!user) {
      router.navigate("/Login");
      return false; 
    }
    return true; 
  }

  return <AuthContext.Provider value={{ user, base, attemptLogin, createAccount, createPost, updateDesc, checkUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);

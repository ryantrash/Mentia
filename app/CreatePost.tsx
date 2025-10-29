import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableHighlight, View, ScrollView } from "react-native";
import { useAuth } from "./AuthProvider";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ImageInput from "./components/ImageInput";
import PostTextInputs from "./components/PostTextInputs";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [uri, setUri] = useState("");
  const router = useRouter();

  const { createPost } = useAuth();

  const updateUri = (uri: string) => {
    setUri(uri);
  };
  const updateTitle = (text: string) => {
    setTitle(text);
  };
  const updateContent = (text: string) => {
    setContent(text);
  };

  const handleSubmit = async () => {
    if (uri && title && content) {
      const ok = await createPost(uri, title, content);
      if (ok) {
        router.navigate("/Home");
      }
    } else {
      Alert.alert("You are missing 1 or more fields");
    }
  };

  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.headerText}>Create a New Post</Text>

          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Upload Image</Text>
            <ImageInput updateUri={updateUri} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Post Details</Text>
            <PostTextInputs updateTitle={updateTitle} updateContent={updateContent} />
          </View>

          <TouchableHighlight
            underlayColor="#1E3A2E"
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#0F1F1A",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  card: {
    width: "92%",
    backgroundColor: "#162820",
    borderRadius: 18,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 30,
  },
  headerText: {
    color: "#98FFCC",
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "FunnelSans-VariableFont_wght",
  },
  section: {
    backgroundColor: "#1E3A2E",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  sectionHeader: {
    color: "#68D8A2",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    fontFamily: "FunnelSans-VariableFont_wght",
  },
  button: {
    backgroundColor: "#68D8A2",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 30,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    color: "#0F1F1A",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "FunnelSans-VariableFont_wght",
  },
});

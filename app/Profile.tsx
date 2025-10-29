import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { useAuth } from "./AuthProvider";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Profile() {
  const router = useRouter(); 
  const { user, updateDesc } = useAuth();
  const _init_desc_ = user.description ? user.description : "";
  const [desc, setDesc] = useState(_init_desc_);
  const [editDesc, setEditDesc] = useState(false);

  const handleDescChange = (text: string) => {
    setEditDesc(true);
    setDesc(text);
  };

  const handleSave = () => {
    if (editDesc) {
      setEditDesc(false);
      updateDesc(desc);
    } else {
      setEditDesc(true);
    }
  };

  const handleLogout = () => {
    router.navigate("./Login"); 
  }

  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.username}>@{user?.username}</Text>

          <View style={[styles.descContainer, editDesc && styles.descContainerActive]}>
            <TextInput
              style={[styles.descInput, editDesc && styles.descInputActive]}
              value={desc}
              editable={editDesc}
              multiline
              onChangeText={handleDescChange}
              placeholder="Write something about yourself..."
              placeholderTextColor="#68D8A2"
            />
          </View>

          <TouchableHighlight
            underlayColor="#1E3A2E"
            style={styles.button}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>
              {editDesc ? "Save Description" : "Edit Description..."}
            </Text>
          </TouchableHighlight>

          {editDesc && (
            <Text style={styles.editingNote}>You’re currently editing your description</Text>
          )}
        </View>
        <TouchableHighlight onPress={handleLogout}>
          <View>
            <Ionicons name="log-out" />
            <Text>Log Out</Text>
          </View>
        </TouchableHighlight>
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
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    alignItems: "center",
  },
  username: {
    color: "#98FFCC",
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "FunnelSans-VariableFont_wght",
  },
  descContainer: {
    width: "100%",
    backgroundColor: "#1E3A2E",
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "transparent",
  },
  descContainerActive: {
    borderColor: "#68D8A2",
    shadowColor: "#68D8A2",
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  descInput: {
    color: "#E0F7EE",
    fontSize: 16,
    fontFamily: "FunnelSans-VariableFont_wght",
    textAlignVertical: "top",
    minHeight: 80,
  },
  descInputActive: {
    color: "#FFFFFF",
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
  editingNote: {
    color: "#68D8A2",
    fontSize: 14,
    marginTop: 12,
    fontStyle: "italic",
    fontFamily: "FunnelSans-VariableFont_wght",
  },
});

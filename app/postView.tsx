import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import { Alert, Image, Modal, ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { useAuth } from "./AuthProvider";
import { deletePost, reportPost } from "./api/postsApi";
import CommentView from "./components/CommentView";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function postView() {
  const params = useSearchParams();
  const title = params.get("title");
  const image = params.get("image");
  const content = params.get("content");
  const username = params.get("username");
  const date = params.get("postDate");
  const id = params.get("id");

  const { user } = useAuth();
  const [showOptions, setShowOptions] = useState(false);

  const toggleShowOptions = () => {
    setShowOptions(!showOptions);
  }
  const handleDelete = async () => {
    const ok = await deletePost(id);
    if (ok) {
      router.navigate("./Home");
    } else {
      Alert.alert("Failed to delete post");
    }
  }

  const handleReport = async () => {
    await reportPost(id, username, content);
    toggleShowOptions();
  }

  return (
    <>
      <Header />
      <ScrollView nestedScrollEnabled contentContainerStyle={styles.container}>
        {image ? (
          <Image source={{ uri: image }} style={styles.postImage} />
        ) : null}

        <View style={styles.postCard}>
          <TouchableHighlight onPress={toggleShowOptions}>
            <Ionicons name="ellipsis-vertical" color="green" />
          </TouchableHighlight>
          <Text style={styles.title}>{title}</Text>
          <Text>{date}</Text>
          <Text style={styles.username}>@{username}</Text>
          <Text style={styles.content}>{content}</Text>
        </View>

        <View style={styles.commentSection}>
          <Text style={styles.commentHeader}>Comments</Text>
          <View style={styles.commentBox}>
            <CommentView id={id} />
          </View>
        </View>
         <Footer />
      </ScrollView>

      <Modal transparent visible={showOptions}>
        <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
            <Text style={styles.modalHeader}>Post Options</Text>
            <TouchableHighlight onPress={toggleShowOptions} style={styles.modalButton}>
              <View style={styles.modalButtonInner}>
                <Ionicons name="close" color="white" />
                <Text style={styles.modalText}>Close Options</Text>
              </View>
            </TouchableHighlight>

            {(user.username === username || user.admin) &&
              <TouchableHighlight onPress={handleDelete} style={styles.modalButton}>
                <View style={styles.modalButtonInner} >
                  <Ionicons name="trash-bin" color="white" />
                  <Text style={styles.modalText}>Delete Post</Text>
                </View>
              </TouchableHighlight>
            }
            <TouchableHighlight onPress={handleReport} style={styles.modalButton}>
              <View style={styles.modalButtonInner}>
                <Ionicons name="flag" color="white" />
                <Text style={styles.modalText}>Report Post</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View >
      </Modal >
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
  postImage: {
    width: "95%",
    height: 250,
    borderRadius: 16,
    resizeMode: "cover",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#68D8A2",
  },
  postCard: {
    width: "92%",
    backgroundColor: "#162820",
    borderRadius: 18,
    padding: 25,
    alignItems: "center",
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  title: {
    color: "#98FFCC",
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "FunnelSans-VariableFont_wght",
  },
  username: {
    color: "#68D8A2",
    fontSize: 16,
    marginBottom: 8,
    fontFamily: "FunnelSans-VariableFont_wght",
  },
  content: {
    color: "#E0F7EE",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    fontFamily: "FunnelSans-VariableFont_wght",
    marginBottom: 10,
  },
  commentSection: {
    width: "94%",
    backgroundColor: "#162820",
    borderRadius: 18,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 50,
  },
  commentHeader: {
    color: "#98FFCC",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 14,
    textAlign: "center",
    fontFamily: "FunnelSans-VariableFont_wght",
  },
  commentBox: {
    maxHeight: 250,
    borderRadius: 12,
    backgroundColor: "#1E3A2E",
    padding: 10,
  },
  commentScroll: {
    backgroundColor: "#1E3A2E",
    borderRadius: 10,
    padding: 10,
  },
  modalCard: {
    width: "88%",
    backgroundColor: "#162820",
    borderRadius: 18,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#162820",
    padding: 25,
    borderRadius: 20,
    width: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  modalHeader: {
    color: "#98FFCC",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    fontFamily: "FunnelSans-VariableFont_wght",
  },
  modalButton: {
    backgroundColor: "#68D8A2",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 30,
    marginVertical: 12, 
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  modalButtonInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  modalText: {
    color: "#E0F7EE",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "FunnelSans-VariableFont_wght",
  },
});


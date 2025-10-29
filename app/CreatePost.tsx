import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { useAuth } from "./AuthProvider";
import { createPost } from './api/postsApi';
import Footer from "./components/Footer";
import Header from "./components/Header";
import ImageInput from "./components/ImageInput";
import PostTextInputs from "./components/PostTextInputs";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [uri, setUri] = useState("");
    const router = useRouter();

    const { user } = useAuth();

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
            const ok = await createPost(uri, title, content, user);
            if (ok) {
                router.navigate("./Home");
            }
        } else {
            Alert.alert("You are missing 1 or more fields");
        }
    }
    return (
        <>
            <Header /> 
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scroll}>
                    <View style={styles.card}>
                        <Text style={styles.headerText}>Create a New Post</Text>
                        <ImageInput updateUri={setUri} />
                    </View>

                    <View style={[styles.card, styles.section]}>
                        <Text style={styles.sectionHeader}>Post Details</Text>
                        <PostTextInputs updateTitle={setTitle} updateContent={setContent} />
                    </View>

                    <TouchableHighlight
                        underlayColor="#1E3A2E"
                        style={styles.button}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.buttonText}>Upload</Text>
                    </TouchableHighlight>
                </ScrollView>
            </View>
            <Footer />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0F1F1A",
    },
    scroll: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 20,
    },
    card: {
        width: "100%",
        backgroundColor: "#162820",
        borderRadius: 18,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        marginBottom: 25,
    },
    headerText: {
        color: "#98FFCC",
        fontSize: 24,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 15,
        fontFamily: "FunnelSans-VariableFont_wght",
    },
    section: {
        backgroundColor: "#1E3A2E",
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
        paddingHorizontal: 40,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        marginBottom: 30,
    },
    buttonText: {
        color: "#0F1F1A",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
        fontFamily: "FunnelSans-VariableFont_wght",
    },
});
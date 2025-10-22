import { useRouter } from 'expo-router';
import React, { useState } from "react";
import { Alert, Text, TouchableHighlight } from "react-native";
import { useAuth } from './AuthProvider';
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

    // setting state variables
    const updateUri = (uri: string) => {
        setUri(uri);
    }
    const updateTitle = (text: string) => {
        setTitle(text);
    }
    const updateContent = (text: string) => {
        setContent(text);
    }


    const handleSubmit = async () => {
        if (uri && title && content) {
            const ok = await createPost(uri, title, content); 
            if(ok){
                router.navigate("./Home"); 
            }
        } else {
            Alert.alert("You are missing 1 or more fields");
        }
    }
    return (
        <>
            <Header />
            <ImageInput updateUri={updateUri} />
            <PostTextInputs updateTitle={updateTitle} updateContent={updateContent} />
            <TouchableHighlight onPress={handleSubmit}><Text>Upload</Text></TouchableHighlight>
            <Footer />
        </>
    )
}
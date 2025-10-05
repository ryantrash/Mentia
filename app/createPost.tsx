import React, { useState } from "react";
import { Alert, Text, TouchableHighlight } from "react-native";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ImageInput from "./components/imageInput";
import PostTextInputs from "./components/PostTextInputs";

export default function CreatePost(){
    const [title, setTitle] = useState(""); 
    const [content, setContent] = useState("");
    const [uri, setUri] = useState("");

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
        if(uri && title && content){
            const postData = new FormData();
            await fetch(uri)
                .then(response => response.blob())
                .then(blob => {
                    postData.append('image', blob, 'image.jpeg');
                    postData.append('title', title);
                    postData.append('content', content); 
                })
                .catch(error => {
                    Alert.alert("Image Error", "Failed to process image.");
                });

            await fetch('http://10.0.2.2:3000', {
                method: "POST", 
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                body: JSON.stringify(postData), 
            })
                .then(data => {
                    console.log("Success: ", data); 
                })
                .catch(error => {
                    console.log("Upload Error: ", error); 
                })

        } else {
            Alert.alert(
                "Missing Field",
                "You are missing 1 or more fields"
            ); 
        }
    }
    return(
        <>
        <Header /> 
        <ImageInput updateUri={updateUri}/>
        <PostTextInputs updateTitle={updateTitle} updateContent={updateContent}/>
        <TouchableHighlight onPress={handleSubmit}><Text>Upload</Text></TouchableHighlight>
        <Footer />
        </>
    )
}
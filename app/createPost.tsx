import axios from 'axios';
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
            try {
                const res = axios.post('http://10.0.2.2:3000/posts', {
                    title, 
                    content,
                    image: uri, 
                }, {
                    headers: {'Content-Type': "application/json"}
                })
                console.log("Submission success: ", res); 
            } catch (error: any){
                console.log("Upload failed: ", error); 
                Alert.alert("Upload Failed")
            }
        } else {
            Alert.alert("You are missing 1 or more fields");
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
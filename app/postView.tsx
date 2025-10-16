import { useSearchParams } from "expo-router/build/hooks";
import React from "react";
import { Image, Text, View } from "react-native";
import CommentView from "./components/CommentView";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { globalStyles } from "./style";
export default function postView(){
    const params = useSearchParams(); 
    const title = params.get("title");
    const image = params.get("image");
    const content = params.get("content"); 
    const username = params.get("username"); 
    const id = params.get("id"); 

    return(
        <>
        <Header />
        <View style={globalStyles.container}>
            <Image source={{uri: image ?? ""}} />
            <Text>
            @{username}
            {title}
            {content}
            </Text>
            <CommentView id={id}/>
        </View>
        <Footer />
        </>
    )
}
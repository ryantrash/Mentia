import { useSearchParams } from "expo-router/build/hooks";
import React from "react";
import { Image, Text, View } from "react-native";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function postView(){
    const params = useSearchParams(); 
    const title = params.get("title");
    const image = params.get("image");
    const content = params.get("content"); 

    return(
        <>
        <Header />
        <View>
            <Image source={{uri: image ?? ""}} />
            <Text>
            {title}
            {content}
            </Text>
        </View>
        <Footer />
        </>
    )
}
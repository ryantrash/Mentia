import React from "react";
import { Text, View } from "react-native";
import { useAuth } from "./AuthProvider";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { globalStyles } from "./style";

export default function Profile() {
    const { user } = useAuth();
    
    return (
        <View style={globalStyles.container}>
            <Header />
            <View style={globalStyles.container}>
                <Text>{user?.username}</Text>
                <Text>{user?.description}</Text>
            </View>
            <Footer />
        </View>
    )
}
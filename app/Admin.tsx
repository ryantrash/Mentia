import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useAuth } from "./AuthProvider";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Admin() {
    const { user } = useAuth();
    const router = useRouter(); 

    const [postReports, setPostReports] = useState({}); 
    const [commentReports, setCommentReports] = useState({}); 

    useEffect(() => {
       if(!user.admin){
        router.navigate("./Login"); 
       }


    }, [])
    return (
        <View>
            <Header />
            <Text>Hello, {user.username} </Text>

            <Text>Reports are listed below: </Text>

            <Text>Post Reports: </Text>
            <ScrollView>

            </ScrollView>

            <Text>Comment Reports: </Text>
            <ScrollView>

            </ScrollView>

            <Footer />
        </View>
    )
}
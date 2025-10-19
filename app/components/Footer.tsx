import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function Footer(){
    const router = useRouter(); 

    return(
        <View style={style.container}>
            <TouchableOpacity onPress={() => router.navigate("/Home")} style={style.icon}>
                <Ionicons name="home" size={32} color="#fff"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.navigate("/CreatePost")} style={style.icon}>
                <MaterialCommunityIcons name="leaf" size={32} color="#fff"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.navigate("/Profile")} style={style.icon} >  
                <Ionicons name="person" size={32} color="#fff"/>
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 24,
        backgroundColor: "#1e1e1e", 
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 10,
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 50,
    }
});

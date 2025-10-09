import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function Footer() {
    return (
        <View style={style.container}>
            <TouchableOpacity style={style.icon}>
                <Ionicons name="home" size={28} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity style={style.icon}>
                <MaterialCommunityIcons name="leaf" size={28} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity style={style.icon}>
                <Ionicons name="person" size={28} color="#ffffff" />
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

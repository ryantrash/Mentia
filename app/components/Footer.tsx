import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function Footer(){

    return(
        <View style={style.container}>
            <TouchableOpacity style={style.icon}>
                <Ionicons name="home" size={32} color="#fff"/>
            </TouchableOpacity>
            <TouchableOpacity style={style.icon}>
                <MaterialCommunityIcons name="leaf" size={32} color="#fff"/>
            </TouchableOpacity>
            <TouchableOpacity style={style.icon} >
                <Ionicons name="person" size={32} color="#fff"/>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flexDirection: "row", 
        justifyContent: "space-around",
        paddingBottom: 20,
        padding:10,
        backgroundColor: "#000"
    }, 
    icon: {
        alignItems: 'center',
        justifyContent: 'center', 
        flex: 1, 
    }
})
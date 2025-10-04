import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header(){
    const today = new Date; 
    return(
        <View style={style.banner}>
            <Text style={style.headerText}>Mentia, {today.toDateString()}</Text>
        </View>
    );
}

const style = StyleSheet.create({
    banner: { 
        backgroundColor: "black",
        width: "100%", 
        justifyContent: "center", 
        alignItems: "center",
        padding: 30,
        
    },
    headerText: {
        color: "white", 
        fontFamily: "FunnelSans-VariableFont_wght",
        fontSize: 32, 
    }
})
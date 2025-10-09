import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header(){
    const today = new Date(); 
    return(
        <View style={style.banner}>
            <Text style={style.headerText}>Mentia, {today.toDateString()}</Text>
        </View>
    );
}

const style = StyleSheet.create({
    banner: { 
        backgroundColor: "#1e1e1e",  
        width: "100%", 
        justifyContent: "center", 
        alignItems: "center",
        paddingVertical: 24,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
    },
    headerText: {
        color: "#ffffff", 
        fontFamily: "FunnelSans-VariableFont_wght", 
        fontSize: 28,
        fontWeight: "600",
        letterSpacing: 0.5,
    }
});

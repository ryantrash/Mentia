import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { useAuth } from '../AuthProvider';
export default function Header() {
    const today = new Date();
    const { user } = useAuth();
    const handlePress = () => {
        if (user.admin) {
            router.navigate("./Admin");
        }
    }
    return (
        <TouchableHighlight disabled={!user.admin} onPress={handlePress}>
            <View style={style.banner}>
                <Text style={style.headerText}>Mentia, {today.toDateString()}</Text>
            </View>
        </TouchableHighlight>
    );
}

const style = StyleSheet.create({
    banner: {
        backgroundColor: "#000",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,

    },
    headerText: {
        color: "#ffffff",
        fontFamily: "FunnelSans-VariableFont_wght",
        fontSize: 28,
        fontWeight: "600",
        letterSpacing: 0.5,
    }
});

import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login(){
    const router = useRouter(); 
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState(""); 

    const base = Platform.OS === "android" ? 'http://10.0.2.2:3000' : 'http://localhost:3000'; 

    const handleLogin = async () => {
        try {
            const res = await axios.get(`${base}/users`, {
                params: {
                    username, 
                    password, 
                }
            });
            if(Array.isArray(res.data) && res.data.length > 0){
                router.navigate("/Home"); 
            }
        } catch (e){
            console.error(e); 
        }
    }

    return(
        <SafeAreaView >
            <Text>Login: </Text>
            <Text>Username: </Text>
            <TextInput value={username} onChangeText={setUsername}/>
            <Text>Password: </Text>
            <TextInput secureTextEntry value={password} onChangeText={setPassword}/>
            <TouchableOpacity onPress={handleLogin}>
                <View>
                    <Text>Login</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
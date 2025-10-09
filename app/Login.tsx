import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "./AuthProvider";

export default function Login() {
    const router = useRouter();
    const { attemptLogin } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert("Missing fields", "Enter username and password");
            return;
        }
        const ok = await attemptLogin(username, password);
        if (ok) {
            router.navigate("/Home");
        } else {
            Alert.alert("Username or Password Incorrect", "Check both fields");
        }
    }

    return (
        <SafeAreaView >
            <Text>Login: </Text>
            <Text>Username: </Text>
            <TextInput value={username} onChangeText={setUsername} />
            <Text>Password: </Text>
            <TextInput secureTextEntry value={password} onChangeText={setPassword} />
            <TouchableOpacity onPress={handleLogin}>
                <View>
                    <Text>Login</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
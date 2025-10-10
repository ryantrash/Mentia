import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "./AuthProvider";

export default function Login() {
    const router = useRouter();
    const { attemptLogin, createAccount} = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [createUser, setCreateUser] = useState(""); 
    const [createPass, setCreatePass] = useState(""); 

    const [modalVisible, setModalVisible] = useState(false); 

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

    const handleCreateAccount = async () => {
        if(!createUser || !createPass){
            Alert.alert("missing fields"); 
            return; 
        } 
        const ok = await createAccount(createUser, createPass); 
        if(ok){
            router.navigate("/Home"); 
        } else {
            Alert.alert("Username already taken", "Please select another username")
        }
    }

    const toggleModal = () => {
        setModalVisible(!modalVisible);
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
            <Text>or:</Text>
            <TouchableOpacity onPress={toggleModal}>
                <View>
                    <Text>Create Account</Text>
                </View>
            </TouchableOpacity>

            <Modal visible={modalVisible}>
                <Text>Username: </Text>
                <TextInput value={createUser} onChangeText={setCreateUser}/>
                <Text>Password: </Text>
                <TextInput value={createPass} onChangeText={setCreatePass}/>
                <TouchableOpacity onPress={handleCreateAccount}>
                    <Text>Create Account</Text>    
                </TouchableOpacity> 
            </Modal>
        </SafeAreaView>
    );
}
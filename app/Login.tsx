import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "./AuthProvider";

export default function Login() {
  const router = useRouter();
  const { attemptLogin, createAccount } = useAuth();
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
            router.navigate("./Home");
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
            router.navigate("./Home"); 
        }
    }

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.headerText}>Login</Text>

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter username"
          placeholderTextColor="#68D8A2"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          placeholderTextColor="#68D8A2"
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>or</Text>

        <TouchableOpacity style={styles.secondaryButton} onPress={toggleModal}>
          <Text style={styles.secondaryButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
            <Text style={styles.modalHeader}>Create Account</Text>

            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={createUser}
              onChangeText={setCreateUser}
              placeholder="Choose username"
              placeholderTextColor="#68D8A2"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={createPass}
              onChangeText={setCreatePass}
              placeholder="Choose password"
              placeholderTextColor="#68D8A2"
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleCreateAccount}
            >
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.closeText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1F1A",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "92%",
    backgroundColor: "#162820",
    borderRadius: 18,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    alignItems: "center",
  },
  headerText: {
    color: "#98FFCC",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    fontFamily: "FunnelSans-VariableFont_wght",
  },
  label: {
    color: "#68D8A2",
    fontSize: 16,
    alignSelf: "flex-start",
    marginBottom: 6,
    fontFamily: "FunnelSans-VariableFont_wght",
  },
  input: {
    width: "100%",
    backgroundColor: "#1E3A2E",
    color: "#E0F7EE",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
    fontFamily: "FunnelSans-VariableFont_wght",
  },
  button: {
    backgroundColor: "#68D8A2",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 30,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    color: "#0F1F1A",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "FunnelSans-VariableFont_wght",
  },
  orText: {
    color: "#98FFCC",
    fontSize: 16,
    marginVertical: 12,
    fontFamily: "FunnelSans-VariableFont_wght",
  },
  secondaryButton: {
    backgroundColor: "#1E3A2E",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 26,
  },
  secondaryButtonText: {
    color: "#68D8A2",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "FunnelSans-VariableFont_wght",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "88%",
    backgroundColor: "#162820",
    borderRadius: 18,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    alignItems: "center",
  },
  modalHeader: {
    color: "#98FFCC",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    fontFamily: "FunnelSans-VariableFont_wght",
  },
  closeText: {
    color: "#68D8A2",
    marginTop: 15,
    fontSize: 16,
    fontFamily: "FunnelSans-VariableFont_wght",
  },
});

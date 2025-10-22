import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { useAuth } from "./AuthProvider";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Profile() {
    const { user, updateDesc } = useAuth();
    const _init_desc_ = user.description ? user.description : "";
    const [desc, setDesc] = useState(_init_desc_);
    const [editDesc, setEditDesc] = useState(false);

    const handleDescChange = (text: string) => {
        setEditDesc(true);
        setDesc(text);
    }
    const handleSave = () => {
        if (editDesc) {
            setEditDesc(false);
            updateDesc(desc);
        } else {
            setEditDesc(true);
        }
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.container}>
                <Text>@{user?.username}</Text>
                <TextInput value={desc} editable={editDesc} onChangeText={handleDescChange} />
                {editDesc ?
                    <View>
                        <TouchableHighlight onPress={handleSave}><Text>Click to save!</Text></TouchableHighlight>
                    </View>
                    :
                    <View>
                        <TouchableHighlight onPress={handleSave}><Text>Edit Description...</Text></TouchableHighlight>
                    </View>
                }
            </View>
            <Footer />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    }
})
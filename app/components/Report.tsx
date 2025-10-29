import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { deleteUser } from "../api/userApi";

export default function Report({id, username, content, post, onDelete, onCancel}: any){

    const handleDelete = () => {
        onDelete(id, post); 
    }

    const handleDeleteBan = async () => {
        await deleteUser(username);
        onDelete(id, post); 
    }   

    const handleCancelReport = async () => {
        onCancel(id, post); 
    }
    return (
        <View>
            <TouchableHighlight>
                <View>
                    <Ionicons name="ban-outline" /> 
                    <Text>Delete and Ban</Text>
                </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={handleDelete}>
                <View>
                    <Ionicons name="trash-bin"/>
                    <Text>Delete</Text>
                </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={handleCancelReport}>
                <View>
                    <Ionicons name="checkmark"/>
                    <Text>Cancel Report</Text>
                </View>
            </TouchableHighlight>

            <View>
                <Text>{id}</Text>
                <Text>{username}</Text>
            </View>
            <Text>{content}</Text>
        </View>
    )
}
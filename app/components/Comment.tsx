import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { useAuth } from "../AuthProvider";

export default function Comment({ username, content, likes, id, key }: any) {
    const { base } = useAuth(); 
    const [liked, setLiked] = useState(false);
    const init_likes = Number(likes) || 0; 
    const [likeCount, setLikeCount] = useState(init_likes); 

    const handleLike = async () => {
        const delta = liked ? -1 : 1; 
        
        setLiked(!liked); 
        setLikeCount(likeCount + delta); 
        const newLikes = likeCount + delta; 

        try {
            await axios.patch(`${base}/comments/${id}`, {
                likes: newLikes, 
            }); 
        } catch(error){
            Alert.alert("Comment Like Failed"); 
            console.log(error); 
        }
    }

    return (
        <View style={styles.comment}>
            <View>
                <Text style={styles.username}>
                    @{username}
                </Text>
                <Text style={styles.content}>
                    {content}
                </Text>
            </View>
            <View>
                <TouchableHighlight onPress={handleLike}>
                    <Ionicons name={"heart-outline"} color={liked ? "green" : "white"} size={30} />
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    comment: {
        backgroundColor: "black",
        marginVertical: 12,
        marginHorizontal: 4,
    },
    username: {
        color: "white",
        fontSize: 20,
    },
    content: {
        color: "white",
    }
})
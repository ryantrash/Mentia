import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { useAuth } from '../AuthProvider';

export default function Post({ title, username, content, image, likes, id }: any) {
    const router = useRouter();
    const { base } = useAuth();
    const preview = content.length > 80 ? content.substring(0, 80) : null;
    const init_likes = Number(likes) || 0;
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(init_likes);

    const handlePress = async () => {
        router.push({
            pathname: "/PostView",
            params: { title, content, image, liked: liked.toString(), username, id }
        } as any);

    }

    const handleLike = async (event?: any) => {
        event?.stopPropagation?.();
        const delta = liked ? -1 : 1;

        setLiked(!liked);
        setLikeCount(likeCount + delta);
        const newLikes = likeCount + delta;
        try {
            const res = axios.patch(`${base}posts/${id}`, { likes: newLikes });
        } catch (error: any) {
            console.log("Post like failed: " + error);
        }
    }

    return (

        <TouchableHighlight onPress={handlePress} style={styles.post}>
            <View>
                <Image source={{ uri: image }} />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.username}>@{username}</Text>
                    <TouchableHighlight onPress={handleLike}>
                        <View style={styles.likes}>
                            <Ionicons name={"heart-outline"} color={liked ? "green" : "white"} size={30} />
                            <Text style={styles.content}>{likeCount}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <Text style={styles.content}>{preview ? preview : content}... Click to view more</Text>

            </View>
        </TouchableHighlight>

    )
}

const styles = StyleSheet.create({
    post: {
        backgroundColor: "black",
        width: "90%",
        margin: 10,
        padding: 12,
    },
    title: {
        color: "white",
        fontSize: 26,
    },
    username: {
        fontSize: 12,
        color: "white",
    },
    content: {
        color: "white",
        fontSize: 12
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    likes: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }
})
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default function Post({ title, content, image, likes, liked = false, id }: any) {
    const router = useRouter();
    const preview = content.length > 80 ? content.substring(0, 80) : null;
    const [like_ct, setLikes] = useState(likes); 
    const handlePress = async () => {
        await router.push({
            pathname: "/postView",
            params: { title, content, image, liked }
        });
        
    }

    const handleLike = () => {
        liked = !liked;
        try {
        axios.patch(`http://10.0.2.2:3000/posts/${id}`, {
            likes: likes + 1,
        });
        setLikes(like_ct+1); 
        } catch(e : any){
            console.log(e); 
        }
    }

    return (

        <TouchableHighlight onPress={handlePress} style={styles.post}>
            <View>
                <Image source={{ uri: image }} />
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.content}>{preview ? preview : content}... Click to view more</Text>
                <TouchableHighlight onPress={handleLike}>
                    <View>
                        <Ionicons name={"heart-outline"} color={"white"} size={30} />
                        <Text style={styles.content}>{like_ct}</Text>
                    </View>
                </TouchableHighlight>
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
        fontSize: 22,
    },
    content: {
        color: "white",
        fontSize: 12
    }
})
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default function Post({ title, content, image, key }: any) {
    const router = useRouter(); 
    const preview = content.length > 80 ? content.substring(0, 80) : null;

    const handlePress = () => {
        console.log(title,content,image); 
        router.push({
            pathname: "/postView",
            params: { title, content, image }
        });
    }

    return (

        <TouchableHighlight onPress={handlePress} style={styles.post}>
            <View>
                <Image source={{ uri: image }} />
                <Text style={styles.title}>{preview ? preview : content}</Text>
                <Text style={styles.content}>{content}</Text>
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
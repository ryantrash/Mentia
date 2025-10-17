import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from '../AuthProvider';
import Comment from './Comment';

export default function CommentView({ id }: any) {
    const { base, user } = useAuth();

    const [comments, setComments] = useState<any[]>([]);
    const [comment, setComment] = useState("");

    const username = user.username ? user.username : "";

    useEffect(() => {
        fetchComments();
    }, [])

    const fetchComments = async () => {
        try {
            const res = await axios.get(`${base}/comments`, {
                params: { postId: id }
            });
            setComments(res.data);
            console.log(res.data);
        } catch (error) {
            console.log("fetch comments failed: ", error);
        }
    }
    /*
    const renderedComments = comments.map((c) => {
        console.log(c.id);
        return (
            <Comment username={c.username} content={c.content} key={c.id} />
        )
    })
    */

    const handleSubmitComment = () => {
        try {
            axios.post(`${base}/comments`, {
                postId: id,
                username,
                content: comment,
                id: Date.now().toString()
            });
            setComments(prev => [{ username, content: comment }, ...prev]);
        } catch (error) {
            console.log("Submit content failed: ", error);
        }
    }

    return (
        <View>
            <TextInput defaultValue={'Add comment...'} value={comment} onChangeText={setComment} />
            <TouchableOpacity onPress={handleSubmitComment}><Text>Submit Comment</Text></TouchableOpacity>
            <ScrollView>
                {comments.map((c, index) => {
                    return (
                        <Comment username={c.username} content={c.content} key={c.id || `${user}-${index}`} />
                    )
                })}
            </ScrollView>
        </View>
    )
}

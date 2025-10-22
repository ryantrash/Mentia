import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from '../AuthProvider';
import { fetchComments, uploadComment } from '../api/commentsApi';
import Comment from './Comment';

export default function CommentView({ id }: any) {
    const { base, user } = useAuth();

    const [comments, setComments] = useState<any[]>([]);
    const [comment, setComment] = useState("");

    const username = user.username ? user.username : "";

    useEffect(() => {
        getComments(id);
    }, [])

    const getComments = async (id: any) => {
        const res = await fetchComments(); 
        setComments(res); 
    }

    const handleSubmitComment = async () => {
        const ok = await uploadComment(username, comment, id); 
        if(ok){
            setComments(prev => [{ username, content: comment }, ...prev]);
            setComment(""); 
        } else {
            Alert.alert("Comment upload failed"); 
        }
    }
    /*
    const handleDeleteComment = async () => {
        const ok = await deleteComment(id); 
    }
    */
    return (
        <View>
            <TextInput defaultValue={'Add comment...'} value={comment} onChangeText={setComment} />
            <TouchableOpacity onPress={handleSubmitComment}><Text>Submit Comment</Text></TouchableOpacity>
            <ScrollView>
                {comments.map((c, index) => {
                    return (
                        <Comment 
                        username={c.username} 
                        content={c.content} 
                        likes={c.likes} 
                        id={c.id || `${user}-${index}`} 
                        key={c.id || `${user}-${index}`} 
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}

import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from '../AuthProvider';
import { deleteComment, fetchComments, uploadComment } from '../api/commentsApi';
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
        if (ok) {
            setComments(prev => [{ username, content: comment }, ...prev]);
            setComment("");
        } else {
            Alert.alert("Comment upload failed");
        }
    }

    const handleDeleteComment = async (cid: string) => {
        const ok = await deleteComment(cid);
        if (ok) {
            setComments(prev => prev.filter(c => c.id !== cid));
        }
    }

    return (
        <View>
            <TextInput defaultValue={'Add comment...'} value={comment} onChangeText={setComment} />
            <TouchableOpacity onPress={handleSubmitComment}><Text>Submit Comment</Text></TouchableOpacity>
            <ScrollView nestedScrollEnabled style={{maxHeight: 300}}>
                {comments.map((c, index) => {
                    return (
                        <Comment
                            username={c.username}
                            content={c.content}
                            likes={c.likes}
                            cid={c.id || `${user}-${index}`}
                            deleteComment={handleDeleteComment}
                            key={c.id || `${user}-${index}`}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}

import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
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
        <View style={styles.container}>
            <Text style={styles.commentHeader}>Comments</Text>
            <TextInput
                style={[styles.commentInput]}
                placeholder="Add comment..."
                placeholderTextColor="#E0F7EE99"
                value={comment}
                onChangeText={setComment}
                multiline
            />
            <TouchableOpacity style={styles.commentButton} onPress={handleSubmitComment}>
                <Text style={styles.commentButtonText}>Submit Comment</Text>
            </TouchableOpacity>
            <ScrollView nestedScrollEnabled style={styles.commentScroll}>
                {comments.map((c, index) => (
                    <Comment
                        username={c.username}
                        content={c.content}
                        likes={c.likes}
                        cid={c.id || `${user}-${index}`}
                        deleteComment={handleDeleteComment}
                        key={c.id || `${user}-${index}`}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#0F1F1A",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 20,
    },
    commentHeader: {
        color: "#98FFCC",
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 14,
        textAlign: "center",
        fontFamily: "FunnelSans-VariableFont_wght",
    },
    commentInput: {
        width: "100%",
        backgroundColor: "#1E3A2E",
        color: "#E0F7EE",
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
        fontFamily: "FunnelSans-VariableFont_wght",
        minHeight: 80,
        textAlignVertical: "top",
        marginBottom: 20,
    },
    commentButton: {
        backgroundColor: "#1E3A2",
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 30,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        marginBottom: 20,
    },
    commentButtonText: {
        color: "#0F1F1A",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
        fontFamily: "FunnelSans-VariableFont_wght",
    },
    commentScroll: {
        width: "100%",
        maxHeight: 300,
        backgroundColor: "#1E3A2",
        borderRadius: 18,
        padding: 15,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
    },
});

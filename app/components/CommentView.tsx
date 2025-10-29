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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#0F1F1A",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  card: {
    width: "92%",
    backgroundColor: "#162820",
    borderRadius: 18,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    alignItems: "center",
  },
  username: {
    color: "#98FFCC",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    fontFamily: "FunnelSans-VariableFont_wght",
  },
decoInput: {
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
    descInputActive: {
    borderColor: "#68D8A2",
    borderWidth: 2,
  },
  button: {
    backgroundColor: "#68D8A2",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 30,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    color: "#0F1F1A",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "FunnelSans-VariableFont_wght",
  },
});

    
    

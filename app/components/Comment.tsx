import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { useAuth } from "../AuthProvider";
import { handleLike } from "../api/commentsApi";

export default function Comment({ username, content, likes, cid, key, deleteComment }: any) {
    const { user } = useAuth();
    const [liked, setLiked] = useState(false);
    const init_likes = Number(likes) || 0;
    const [likeCount, setLikeCount] = useState(init_likes);
    const [showOptions, setShowOptions] = useState(false);
    // test comment
    const handleCommentLike = async () => {
        const res = await handleLike(cid, likeCount, liked);
        setLikeCount(res);
        setLiked(!liked);
    }

    const handleShowOptions = () => {
        setShowOptions(!showOptions);
    }

    const handleDelete = () => {
        deleteComment(cid);
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
                <TouchableHighlight onPress={handleCommentLike}>
                    <Ionicons name={"heart-outline"} color={liked ? "green" : "white"} size={30} />
                </TouchableHighlight>
                <Text style={{ color: "white" }}>
                    {likeCount}
                </Text>
                <TouchableHighlight onPress={handleShowOptions}>
                    <Ionicons name={"ellipsis-vertical"} color={"white"} />
                </TouchableHighlight>
            </View>

            <Modal visible={showOptions} transparent>
                <View style={styles.modal}>
                    <View style={styles.modalView}>
                        <View style={{ justifyContent: "space-between", flexDirection: "row", gap: 30 }}>
                            <Text style={styles.modalContent}>Options</Text>
                            <TouchableHighlight onPress={handleShowOptions}>
                                <Ionicons name="close-outline" color={"white"} />
                            </TouchableHighlight>
                        </View>
                        <View>
                            {user.username === username &&
                                <TouchableHighlight>
                                    <View>
                                        <Ionicons name="trash-bin" color="white" />
                                        <Text>Delete Comment</Text>
                                    </View>
                                </TouchableHighlight>
                            }
                        </View>
                    </View>
                </View>
            </Modal>
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
    },
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modalView: {
        backgroundColor: "rgba(0,0,0,0.8)",
        alignItems: "center",
        padding: 50,

    },
    modalContent: {
        color: "#fff"
    }
})
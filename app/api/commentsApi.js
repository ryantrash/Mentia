import axios from "axios";
import { Platform } from "react-native";

const base = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000"

export const uploadComment = async (username, comment, id) => {
    try {
        axios.post(`${base}/comments`, {
            postId: id,
            username,
            content: comment,
            id: Date.now().toString()
        });
        return true;
    } catch (error) {
        console.log("Submit content failed: ", error);
        return false;
    }
}

export const fetchComments = async (id) => {
    try {
        const res = await axios.get(`${base}/comments`, {
            params: { postId: id }
        });
        return res.data;
    } catch (error) {
        console.log("fetch comments failed: ", error);
    }
}

export const handleLike = async (id, likeCount, liked) => {
    const delta = liked ? -1 : 1;
    const newLikes = likeCount + delta;

    try {
        await axios.patch(`${base}/comments/${id}`, {
            likes: newLikes,
        });
        return newLikes; 
    } catch (error) {
        Alert.alert("Comment Like Failed");
        console.log("Like failed: " + error);
        return -1; 
    }
}

export const deleteComment = async (id) => {
    try {
        await axios.delete(`${base}/comments/${id}`)
        return true;
    } catch (error) {
        Alert.alert("Delete failed: ", error);
        return false;
    }
}

export const getCommentReports = async () => {
    try {
        const res = await axios.get(`${base}/commentReports`); 
        return res?.data; 
    } catch (error) {
        console.log("Failed to get reported comments: ", error); 
        return null; 
    }
}
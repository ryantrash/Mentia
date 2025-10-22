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
/*
export const delteComment = async (id) => {
    try {
        const res = await axios.delete(`${base}/comments`)
    }
}
*/
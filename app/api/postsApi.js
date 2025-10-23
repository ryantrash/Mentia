import axios from "axios";
import { Platform } from "react-native";

const base = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000"

export const deletePost = async (id) => {
    try {
        console.log(base, id);
        await axios.delete(`${base}/posts/${id}`);

        const res = await axios.get(`${base}/comments`, {
            params: {
                postId: id
            }
        })
        const comments = res?.data;

        await Promise.all(
            comments.map(c => axios.delete(`${base}/comments/${c.id}`))
        );

        return true;
    } catch (error) {
        console.log("failed to delete post: ", error);
        return false;
    }
}

export const fetchPosts = async () => {
    try {
        const res = await axios.get("http://10.0.2.2:3000/posts");
        return res?.data; 
    } catch (error) {
        console.log("Failed to get posts, home: ", error);
        return null; 
    }
}
// todo report post
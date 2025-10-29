import axios from "axios";
import { Alert, Platform } from "react-native";
import isProfane from "../filter";

const base = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000"

export const createPost = async (uri, title, content, user) => {
    if(isProfane(content) || isProfane(title)){
        Alert.alert("Profanity Detected", "Your comment contains content we deem as innapropriate. Please change the content and try again.")
        return false; 
    }
    const date = new Date;
    const today = date.toDateString();
    let res;
    try {
        res = await axios.get(`${base}/users/${user.id}`);
    } catch (error) {
        console.log("Failed to get user, createPost: ", error);
        return false;
    }
    const postDate = res ? res?.data?.postDate : null;

    if (postDate === today) {
        Alert.alert("You've already posted once today!", "Come back later to post again.");
        return true;
    }

    try {
        await axios.post(`${base}/posts`, {
            title,
            content,
            username: user.username,
            date: today,
            image: uri,
            likes: 0,
        }, {
            headers: { 'Content-Type': "application/json" }
        })

        await axios.patch(`${base}/users/${user.id}`, {
            postDate: today
        });

        return true;
    } catch (error) {
        console.log("Upload failed: ", error);
        Alert.alert("Upload Failed")
        return false;
    }
}

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
        const res = await axios.get(`${base}/posts`);
        return res?.data;
    } catch (error) {
        console.log("Failed to get posts, home: ", error);
        return null;
    }
}

export const reportPost = async (id, username, content) => {
    try {
        await axios.post(`${base}/postReports`, {
            id,
            username,
            content
        })
    } catch (error) {
        console.log("Failed to report post: ", error);
    }
}

export const getPostReports = async () => {
    try {
        const res = await axios.get(`${base}/postReports`);
        return res?.data;
    } catch (error) {
        console.log("Failed to get reported posts: ", error);
        return null;
    }
}

export const cancelPostReport = async (id) => {
    try {
        await axios.delete(`${base}/postReports/${id}`);
    } catch (error) {
        console.log("Failed to cancel post report: ", error);
    }
}

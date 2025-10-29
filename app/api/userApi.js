import axios from "axios";
import { Platform } from "react-native";

const base = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000" 

export const deleteUser = async (username) => {
    try {
        await axios.delete(`${base}/users`, {
            
        }); 
    } catch (error) {
        console.log("Failed to delete user: ", error); 
    }
}
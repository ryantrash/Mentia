import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from "react-native";
import { useAuth } from '../AuthProvider';

export default function CommentView({id} : any) {
    const { base } = useAuth(); 

    const [comments, setComments] = useState<any[]>([]);

    useEffect(() => {
        const fetchComments = async () => {
            try{
            const res = await axios.get(`${base}/comments/${id}`);
            setComments(res.data.comments); 
            console.log(res.data.comments);
            } catch(error){
                console.log("fetch comments failed: ", error); 
            }
        }
        fetchComments(); 
    }, [])

    const renderedComments = comments.map( (comment) => {
        return(
            <View>
                <Text>
                @{comment.username} 
                {comment.content}
                </Text>
            </View>
        )
    })

    return (
        <ScrollView>
            {renderedComments}
        </ScrollView>
    )
}

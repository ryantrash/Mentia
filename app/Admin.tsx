import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { deleteComment, getCommentReports } from "./api/commentsApi";
import { deletePost, getPostReports } from "./api/postsApi";
import { useAuth } from "./AuthProvider";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Report from "./components/Report";

type Report = {
    id: string,
    username: string,
    content: string,
}

export default function Admin() {
    const { user } = useAuth();
    const router = useRouter();

    const [postReports, setPostReports] = useState<Report[]>([]);
    const [commentReports, setCommentReports] = useState<Report[]>([]);

    useEffect(() => {
        if (!user.admin) {
            router.navigate("./Login");
        }
        const fetchReports = async () => {
            const postRes = await getPostReports();
            const comRes = await getCommentReports();
            setPostReports(postRes);
            setCommentReports(comRes);
        }
        fetchReports();
    }, [])

    const followReport = async (id: string, post: boolean) => {
        if (post) {
            deletePost(id);
            setPostReports(prev => prev.filter(report => report.id !== id));
        } else {
            deleteComment(id);
            setCommentReports(prev => prev.filter(report => report.id !== id));
        }
    }

    return (
        <View style={styles.container}>
            <Header />
            <Text>Hello, {user.username} </Text>

            <Text>Reports are listed below: </Text>

            <Text>Post Reports: </Text>
            <ScrollView>
                {postReports.map((report,) => {
                    return(
                        <Report 
                            id={report.id}
                            key={report.id}
                            username={report.username}
                            content={report.content}
                            post={true} 
                            onDelete={followReport}
                        />
                    );
                })}
            </ScrollView>

            <Text>Comment Reports: </Text>
            <ScrollView>
                {commentReports.map((report) => {
                    return(
                        <Report 
                            id={report.id}
                            key={report.id}
                            username={report.username}
                            content={report.content}
                            post={true}
                            onDelete={followReport}
                        />
                    );
                })}
            </ScrollView>

            <Footer />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    }
})
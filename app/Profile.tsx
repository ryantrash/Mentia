import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useAuth } from "./AuthProvider";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { globalStyles } from "./style";

export default function Profile() {
    const { getUser } = useAuth();
    const [user, setUser] = useState<{ username?: string; description?: string } | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            setUser(await getUser());
        }
        fetchUser();
    }, [])

    return (
        <View style={globalStyles.container}>
            <Header />
            <View style={globalStyles.container}>
                <Text>{user?.username}</Text>
                <Text>{user?.description}</Text>
            </View>
            <Footer />
        </View>
    )
}
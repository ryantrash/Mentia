import React from "react";
import { Text, View } from "react-native";

export default function Comment({ username, content, key }: any) {
    return (
        <View>
            <Text>
                @{username}
                {content}
            </Text>
        </View>
    )
}
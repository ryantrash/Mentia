import React from 'react';
import { Image, Text, View } from 'react-native';

export default function Post({title, content, image}: any){
    
    return(
        <View>
            <Image source={{uri: image}}/>
            <Text>{title}</Text>
            <Text>{content}</Text>
        </View>
    )
}
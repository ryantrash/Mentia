import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { globalStyles } from '../style'

interface PostTextInputsProps {
    updateTitle: (text: string) => void 
    updateContent: (text: string) => void
}

export default function PostTextInputs({updateTitle, updateContent}: PostTextInputsProps){
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("") 

    // set both the local state and parent state, pass up the input
    const handleTitleChange = (text: string) => {
        setTitle(text); 
        updateTitle(text); 
    }
    const handleContentChange = (text: string) => {
        setContent(text); 
        updateContent(text); 
    }

    return(
        <View style={globalStyles.container}>
            <View style={globalStyles.container}>
                <Text>Title: </Text>
                <TextInput value={title} onChangeText={handleTitleChange}/>
            </View>
            <View style={globalStyles.container}>
                <Text>Content:</Text>
                <TextInput value={content} onChangeText={handleContentChange}/>
            </View>
        </View>
    );
}
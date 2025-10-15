import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { globalStyles } from '../style'

interface PostTextInputsProps {
    updateTitle: (text: string) => void 
    updateContent: (text: string) => void
}

export default function PostTextInputs({updateTitle, updateContent}: PostTextInputsProps){
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("") 
    const maxTitleLength = 30;
    const maxContentLength = 300; 

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
                <Text>Title: (Max Length 30)</Text>
                <TextInput  maxLength={30} value={title} onChangeText={handleTitleChange}/>
                { title.length === maxTitleLength && (<View><Text>Title must be less than 30 characters</Text></View>) }
                <Text>{title.length} / {maxTitleLength}</Text>
            </View>
            <View style={globalStyles.container}>
                <Text>Content:</Text>
                <TextInput multiline={true} value={content} maxLength={300} onChangeText={handleContentChange}/>
                { content.length === maxContentLength && (<View><Text>Content must be less than 300 characters</Text></View>) }
                <Text>{content.length} / {maxContentLength}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contentInput: {
        height: 30,
    }
})
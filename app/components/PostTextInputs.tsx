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
    let titleLengthError = false;
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
                {titleLengthError ? <View><Text>Title must be less than 30 characters</Text></View> : null}
            </View>
            <View style={globalStyles.container}>
                <Text>Content:</Text>
                <TextInput multiline={true} value={content} onChangeText={handleContentChange}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contentInput: {
        height: 30,
    }
})
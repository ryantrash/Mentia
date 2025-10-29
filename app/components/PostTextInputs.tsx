import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface PostTextInputsProps {
    updateTitle: (text: string) => void;
    updateContent: (text: string) => void;
}

export default function PostTextInputs({ updateTitle, updateContent }: PostTextInputsProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const maxTitleLength = 30;
    const maxContentLength = 300;

    const handleTitleChange = (text: string) => {
        setTitle(text);
        updateTitle(text);
    };

    const handleContentChange = (text: string) => {
        setContent(text);
        updateContent(text);
    };

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Title:</Text>
                <TextInput
                    style={styles.input}
                    maxLength={maxTitleLength}
                    value={title}
                    onChangeText={handleTitleChange}
                    placeholder="Enter title..."
                    placeholderTextColor="#ccc"
                />
                {title.length === maxTitleLength && (
                    <Text>Title must be less than 30 characters</Text>
                )}
                <Text>{title.length} / {maxTitleLength}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Content:</Text>
                <TextInput
                    style={[styles.input, styles.contentInput]}
                    multiline
                    maxLength={maxContentLength}
                    value={content}
                    onChangeText={handleContentChange}
                    placeholder="Write your post..."
                    placeholderTextColor="#ccc"
                />
                {content.length === maxContentLength && (
                    <Text>Content must be less than 300 characters</Text>
                )}
                <Text>{content.length} / {maxContentLength}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section: {
        marginBottom: 20,
    },
    input: {
        color: 'white',
        paddingVertical: 5,
    },
    sectionHeader: {
        color: "#68D8A2",
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
        fontFamily: "FunnelSans-VariableFont_wght",
    },
    contentInput: {
        height: 80,
        textAlignVertical: 'top',
    },
});

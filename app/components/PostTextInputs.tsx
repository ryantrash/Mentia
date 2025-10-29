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
        <Text style={styles.label}>Title (Max Length 30)</Text>
        <TextInput
          style={styles.input}
          maxLength={maxTitleLength}
          value={title}
          onChangeText={handleTitleChange}
          placeholder="Enter title..."
          placeholderTextColor="#68D8A2"
        />
        {title.length === maxTitleLength && (
          <Text style={styles.warning}>Title must be less than 30 characters</Text>
        )}
        <Text style={styles.counter}>{title.length} / {maxTitleLength}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Content</Text>
        <TextInput
          style={[styles.input, styles.contentInput]}
          multiline
          maxLength={maxContentLength}
          value={content}
          onChangeText={handleContentChange}
          placeholder="Write your post..."
          placeholderTextColor="#68D8A2"
        />
        {content.length === maxContentLength && (
          <Text style={styles.warning}>Content must be less than 300 characters</Text>
        )}
        <Text style={styles.counter}>{content.length} / {maxContentLength}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F1F1A',
    padding: 20,
    flex: 1,
  },
  section: {
    backgroundColor: '#162820',
    borderRadius: 16,
    padding: 15,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  label: {
    color: '#98FFCC',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    fontFamily: 'FunnelSans-VariableFont_wght',
  },
  input: {
    backgroundColor: '#1E3A2E',
    color: '#E0F7EE',
    borderRadius: 12,
    padding: 10,
    fontSize: 16,
    fontFamily: 'FunnelSans-VariableFont_wght',
    minHeight: 40,
  },
  warning: {
    color: '#FFBABA',
    fontSize: 14,
    marginTop: 5,
    fontFamily: 'FunnelSans-VariableFont_wght',
  },
  contentInput: {
    height: 100,
    textAlignVertical: 'top',
    marginTop: 8,
  },
  counter: {
    color: '#68D8A2',
    fontSize: 14,
    marginTop: 6,
    textAlign: 'right',
    fontFamily: 'FunnelSans-VariableFont_wght',
  },
});

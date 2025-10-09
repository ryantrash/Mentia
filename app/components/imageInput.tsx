import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from 'react-native-modal';
import { colors } from '../style';

interface ImageInputProps{
    updateUri: (uri: string) => void 
}

export default function ImageInput({updateUri}: ImageInputProps) {
    const [image, setImage] = useState("");
    const [showModal, setModal] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled && result.assets?.length) {
            const uri = result.assets[0].uri;
            handleImageSelect(uri); 
            console.log(uri);
        } else {
            console.log("CANCELLED - Image Select");
        }
        toggleModal();
    }
    const takeImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled && result.assets?.length) {
            const uri = result.assets[0].uri;
            handleImageSelect(uri)
            console.log(uri);
        } else {
            console.log("CANCELLED - Image Take");
        }
        toggleModal();
    }
    const handleImageSelect = (uri: string) =>{
        setImage(uri);
        updateUri(uri); 
    }

    const toggleModal = () => {
        setModal(!showModal);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleModal}>
                <Modal
                    isVisible={showModal}
                >
                    <View>
                        <View style={styles.modalView}>
                            <TouchableOpacity onPress={takeImage}><Text>Take Image</Text></TouchableOpacity>
                            <TouchableOpacity onPress={pickImage}><Text>Upload Image</Text></TouchableOpacity>
                            <TouchableOpacity onPress={toggleModal}><Text style={{color: colors.primary}}>Cancel</Text></TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {image === "" ?
                    <Image source={require("../../assets/images/addImage.png")} /> :
                    <View>
                        <Image source={{ uri: image }} style={styles.imagePreview} />
                        <TouchableOpacity onPress={toggleModal}><Text>Change Image</Text></TouchableOpacity>
                    </View>
                }
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageButton: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#000",
    },
    buttonText: {
        color: "#fff",
    },
    imagePreview: {
        width: 200,
        height: 150,
        resizeMode: "cover",
        marginTop: 12,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
    },
})
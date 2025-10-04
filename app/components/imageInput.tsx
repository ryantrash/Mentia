import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ImageInput() {
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
            setImage(uri);
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
            setImage(uri);
            console.log(uri);
        } else {
            console.log("CANCELLED - Image Take");
        }
        toggleModal(); 
    }
    const toggleModal = () => {
        setModal(!showModal); 
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleModal}>
                <Modal
                 visible={showModal}
                 onRequestClose={toggleModal}
                 >
                    <TouchableOpacity onPress={takeImage}><Text>Take Image</Text></TouchableOpacity>
                    <TouchableOpacity onPress={pickImage}><Text>Upload Image</Text></TouchableOpacity>
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
    }
})
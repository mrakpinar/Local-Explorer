import axios from "axios";
import React, { useContext, useState } from "react";
import { Modal, Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { AuthContext } from "../context/authContext";

const CustomModal = ({ visible, onCancel, onConfirm }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Bu gönderiyi silmek istediğinize emin misiniz?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={onCancel}>
                            <Text style={styles.buttonText}>İptal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={onConfirm}>
                            <Text style={styles.buttonText}>Evet</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const MyModalComponents = ({ postId }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [state, setState] = useContext(AuthContext);


    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://192.168.1.191:8080/api/v1/post/delete/${postId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${state.token}`,
                },
            });

            if (response.status === 200) {
                Alert.alert("Başarıyla silindi!")
                // Silinen gönderiyi güncelle
                const updatedPosts = posts.filter(post => post._id !== postId);
                setPosts(updatedPosts);
            }
        } catch (error) {
            console.log("Bir hata oluştu!", error)
        }
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Icon name="trash-alt" style={{ color: "#E78895", fontSize: 26, marginHorizontal: 20, position: "absolute", top: -35, right: 0 }} />
            </TouchableOpacity>
            <CustomModal
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                onConfirm={handleDelete}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.8)",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "600",
        fontSize: 17
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        marginHorizontal: 10,
        paddingHorizontal: 30
    },
    buttonText: {
        fontSize: 16,
        color: "white",
        fontWeight: "500",
        textAlign: "center"
    }
});

export default MyModalComponents;

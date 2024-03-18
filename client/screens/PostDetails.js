import { View, Text, StyleSheet, ScrollView, Dimensions, SafeAreaView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import axios from 'axios';
import { AuthContext } from '../context/authContext';

let deviceWitdh = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

const PostDetails = ({ route }) => {
    const { post } = route.params
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [location, setLocation] = useState();
    const [isLoading, setIsLoading] = useState(true)
    const [state, setState] = useContext(AuthContext);
    const { user, token } = state;

    let city = post?.location?.address.split(",")[0].trim();

    useEffect(() => {
        const geocode = async () => {
            const geocodedLocation = await Location.geocodeAsync(city);
            if (geocodedLocation.length > 0) {
                const { latitude, longitude } = geocodedLocation[0];
                setLatitude(latitude);
                setLongitude(longitude);
                setLocation({
                    latitude: latitude,
                    longitude: longitude
                });
                setIsLoading(false);
                // console.log("Latitude:", latitude);
                // console.log("Longitude:", longitude);
                // console.log(location);
            }
        };
        geocode();
    }, []);

    useEffect(() => {
        if (location === undefined) {
            setIsLoading(true);
        }
    }, [location]);


    // const handleDelete = async () => {
    //     try {
    //         const response = await axios.delete(`http://192.168.1.191:8080/api/v1/post/delete/${post?._id}`, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${token && token}`,
    //             },
    //         });

    //         if (response === 200) {
    //             Alert.alert("Başarıyla silindi!")
    //         }
    //     } catch (error) {
    //         console.log("Bir hata oluştu!", error)
    //     }
    // }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{post?.title}</Text>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{ flex: 1, width: '100%', height: 400 }}
                    initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.00001,
                        longitudeDelta: 0.00121,
                    }}>
                    {location && <Marker coordinate={{ latitude: latitude, longitude: longitude }} />}
                </MapView>
            )}
            <View>
                <Text>{latitude}</Text>
                <Text>{longitude}</Text>
            </View>
            <View style={styles.rightAlign}>
                <FontAwesomeIcon
                    icon={faUser}
                    color="#776B5D"
                    style={styles.iconStyle}
                />
                <Text style={styles.postedBy}>@{post?.postedBy.name}</Text>
            </View>
            <ScrollView>
                <View style={styles.scrollContainer}>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>   {post?.description}</Text>
                    </View>
                </View>
                {/* Diğer post detayları */}
                {/* <TouchableOpacity onPress={handleDelete}>
                    <Text>Sil</Text>
                </TouchableOpacity> */}
                {/* <Text>user:{JSON.stringify(post.postedBy._id)}</Text>
                <Text>user:{JSON.stringify(post._id)}</Text> */}

            </ScrollView>
        </SafeAreaView>
    )
}

export default PostDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: "center",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 50
    },
    title: {
        fontSize: 25,
        fontWeight: "900",
        marginBottom: 10,
        color: "#332f2a",
        textTransform: "uppercase"
    },
    scrollContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    descriptionContainer: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f2ece1",
        width: deviceWitdh - 20,
        minHeight: deviceHeight * 0.15,
        borderRadius: 5,
        padding: 15,
    },
    description: {
        fontSize: 19,
        fontWeight: "300",
        textTransform: "none",
        color: "#4d453c"
    },
    postedBy: {
        fontSize: 16,
        fontWeight: "200",
        marginTop: 10,
        color: "#332f2a",
    },
    rightAlign: {
        flexDirection: "row",
        alignSelf: "flex-end",
        marginRight: 20,
    },
    iconStyle: {
        color: "#776B5D",
        fontSize: 12,
        paddingTop: 40,
        marginRight: 10
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

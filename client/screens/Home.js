import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Pressable, RefreshControl } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import FooterMenu from "../components/Menus/FooterMenu";
import { SafeAreaView } from "react-native-safe-area-context";
import { PostContext } from "../context/postContext";
import PostCard from "../components/PostCard";
import Categories from "../components/Categories";
import globalStyles from "../assets/style";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-native-modal";
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [posts, setPosts] = useContext(PostContext);
  const [location, setLocation] = useState();
  const [cityInfo, setCityInfo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [postCountInfo, setPostCountInfo] = useState("");


  const setLoading = (value) => {
    setIsLoading(value);
  };

  const fetchPosts = async (category) => {
    setLoading(true);
    try {
      const apiUrl = category
        ? `http://192.168.137.240:8080/api/v1/post/get-all-post?category=${category}`
        : "http://192.168.137.240:8080/api/v1/post/get-all-post";

      const { data } = await axios.get(apiUrl);
      setLoading(false);
      if (data?.posts.length === 0) {
        setPostCountInfo("Post yok");
      } else {
        setPostCountInfo("");
      }
      setPosts(data?.posts);
    } catch (error) {
      console.log("Error Fetching Posts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Location permission not granted");
          setModalVisible(true);
          return;
        }

        const userLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        });
        setModalVisible(false);
      } catch (error) {
        console.error("Error getting location:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, []);

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const { address } = response.data;
      const city = address.city || address.town || address.village || address.county;
      const country = address.country;
      const cityInfoText = `${city}, ${country}`;
      setCityInfo(cityInfoText);
    } catch (error) {
      console.error("Reverse geocoding error:", error);
    }
  };

  useEffect(() => {
    if (location) {
      reverseGeocode(location.latitude, location.longitude);
    }
  }, [location]);

  const handleMapPress = () => {
    setIsMapFullscreen(true);
  };

  const handleMapBack = () => {
    setIsMapFullscreen(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const navigation = useNavigation();

  const closeModalAndRestartApp = () => {
    setModalVisible(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  const handleCategoryPress = (category) => {
    console.log("Selected Category:", category);
    if (category === "Coffee") {
      fetchPosts("Coffee");
    }
    if (category === "Sport") {
      fetchPosts("Sport");
    }
    if (category === "Music") {
      fetchPosts("Music");
    }
    if (category === "Food") {
      fetchPosts("Food");
    }
    if (category === "Travel") {
      fetchPosts("Travel");
    }
  };


  // const onScroll = (event) => {
  //   const offsetY = event.nativeEvent.contentOffset.y;
  //   if (offsetY <= 0) {
  //     setRefreshing(true);
  //     fetchPosts(); // Yenileme fonksiyonunu çağırın

  //     /*  Yenileme fonksiyonuna sonra tekrardan bir bak
  //         LOG  Error Fetching Posts: [ReferenceError: Property 'setPosts' doesn't exist]
  //      */
  //   }
  // };

  const homeNavigation = () => {
    fetchPosts();
    console.log("home")
  };

  useEffect(() => {
    if (cityInfo === "undefined, undefined") {
      setModalVisible(true);
    }
    setRefreshing(false);
  }, [cityInfo, modalVisible]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={handleMapPress} style={{ flex: isMapFullscreen ? 0 : 0 }}>
              <View style={{ borderWidth: 1, marginBottom: 10, height: isMapFullscreen ? "100%" : 202 }}>
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={{ flex: 1 }}
                  initialRegion={{
                    latitude: location?.latitude || 38.5515,
                    longitude: location?.longitude || 35.872,
                    latitudeDelta: 0.0522,
                    longitudeDelta: 0.0421,
                  }}
                  showsUserLocation={true}
                >
                  {location && <Marker coordinate={location} />}
                </MapView>
                {isMapFullscreen && (
                  <TouchableOpacity onPress={handleMapBack} style={styles.backButton}>
                    <FontAwesomeIcon
                      icon={faDeleteLeft}
                      style={styles.iconStyle3}
                      size={35}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
            <Text style={styles.cityAndCountry}>{cityInfo}</Text>
            <View style={globalStyles.headerContainer}>
              <TouchableOpacity onPress={homeNavigation}>
                <Text style={globalStyles.header}>Home</Text>
              </TouchableOpacity>
              <Categories onCategoryPress={handleCategoryPress} />
            </View>
            {postCountInfo && (
              <View style={styles.postCountContainer}>
                <Text style={styles.postCountText}>{postCountInfo}</Text>
              </View>
            )}
            <ScrollView
              // onScroll={onScroll}
              scrollEventThrottle={16}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={fetchPosts}
                />
              }
            >
              <ScrollView style={{ paddingLeft: 10 }}>
                <PostCard posts={posts} onPress={(post) => { navigation.navigate("PostDetails", { post }) }} />
              </ScrollView>
            </ScrollView>
            <View style={styles.footerStyle}>
              <FooterMenu />
            </View>
          </View>
        )}
      </View>
      <Modal
        isVisible={modalVisible}
        backdropOpacity={0.9}
        onBackdropPress={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Lütfen telefonun konumunu açınız!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={closeModalAndRestartApp}>
              <Text style={styles.textStyle}>Tamam</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerStyle: {
    justifyContent: "flex-end",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 15,
    borderRadius: 5
  },
  iconStyle3: {
    color: "red",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  cityAndCountry: {
    textAlign: "center",
    margin: 10,
    fontWeight: "900",
    fontSize: 16,
    color: "#776B5D",
  },
  postCountContainer: {
    backgroundColor: "grey",
    padding: 20,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 20
  },
  postCountText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 24
  },
});

export default Home;

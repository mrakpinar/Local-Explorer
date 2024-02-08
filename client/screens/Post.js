import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faImages,
  faSmile,
  faLocationDot,
  faCheck,
  faDeleteLeft,
} from "@fortawesome/free-solid-svg-icons";
import PostButton from "../components/Forms/PostButton";
import axios from "axios";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { AuthContext } from "../context/authContext";
import { PostContext } from "../context/postContext";
import FooterMenu from "../components/Menus/FooterMenu";
import globalStyles from "../assets/style";
import { SelectList } from 'react-native-dropdown-select-list';

const Post = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [state] = useContext(AuthContext);
  const [posts, setPosts] = useContext(PostContext);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 38.720,
    longitude: 35.55,
    latitudeDelta: 0.035,
    longitudeDelta: 0.001,
  });
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [city,setCity] = useState("");


  const data = [
    { key: '1', value: "Coffee" },
    { key: '2', value: "Music" },
    { key: '3', value: "Food" },
    { key: '4', value: "Travel" },
  ];

  // useEffect(() => {
  //   const fetchLocation = async () => {
  //     try {
  //       const { status } = await Location.requestForegroundPermissionsAsync();
  //       if (status !== "granted") {
  //         console.error("Location permission not granted");
  //         return;
  //       }

  //       const userLocation = await Location.getCurrentPositionAsync({});
  //       setLocation({
  //         latitude: userLocation.coords.latitude,
  //         longitude: userLocation.coords.longitude,
  //       });
  //     } catch (error) {
  //       console.error("Error getting location:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchLocation();
  // }, []);

  const handlePost = async () => {
    try {
      setLoading(true);
      if (!title) {
        alert("Please add post title!");
        return;
      }
      if (!description) {
        alert("Please add post description!");
        return;
      }
      if (!category || category == 0) {
        alert("Please add post category!");
        return;
      }
      const postData = {
        title,
        description,
        location: selectedLocation || location,
        category
      };

      const { data } = await axios.post(
        "http://192.168.137.240:8080/api/v1/post/create-post",
        postData
      );
      setLoading(false);
      setPosts([data?.post, ...posts]);
      navigation.navigate("Home");
      console.log(data)
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
      setLoading(false);
      console.log(error);
    }
  };

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const { address } = response.data;
      const city = address.city || address.town || address.village || address.county;
      const country = address.country;
      const cityInfoText = `${city}, ${country}`;
      setCity(cityInfoText);
      console.log(city)
    } catch (error) {
      console.error("Reverse geocoding error:", error);
    }
  };

  const handleMapPress = (e) => {
    setSelectedLocation(e.nativeEvent.coordinate);
  };

  const handleMapBack = () => {
    setIsMapFullscreen(false);
  };

  const handleMapMarkerPress = (e) => {
    setSelectedLocation(e.nativeEvent.coordinate);
  };

  const handleConfirmLocation = () => {
    console.log("Confirm Location Pressed");
    if (selectedLocation) {
      reverseGeocode(selectedLocation?.latitude, selectedLocation?.longitude);
    }

    setIsMapFullscreen(false);

    if (selectedLocation) {
      console.log("Selected Location:", selectedLocation);
      setLocation(selectedLocation);
    }
  };

  const handleMapFullscreen = () => {
    setIsMapFullscreen(true);
  };

  useEffect(() => {
    if (location) {
      setInitialRegion({
        latitude: location?.latitude,
        longitude: location?.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [location]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView style={{ flex: 1 }}>
        
          <View style={{ flex: 1, position: "relative", zIndex: -1 }}>
            <TouchableOpacity
              onPress={handleMapFullscreen}
              style={{ flex: isMapFullscreen ? 0 : 0 }}
            >
              <View
                style={{
                  borderWidth: 1,
                  marginBottom: 10,
                  height: isMapFullscreen ? "100%" : 202,
                }}
              >
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={{ flex: 1 }}
                  initialRegion={initialRegion}
                  showsUserLocation={true}
                  onPress={isMapFullscreen ? handleMapPress : undefined}
                >
                  {selectedLocation && (
                    <Marker coordinate={selectedLocation} />
                  )}
                </MapView>

                {isMapFullscreen && (
                  <View style={{ position: "absolute" }}>
                    <TouchableOpacity
                      onPress={handleMapBack}
                      style={styles.backButton}
                    >
                      <FontAwesomeIcon
                        icon={faDeleteLeft}
                        style={styles.iconStyleBack}
                        size={35}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleConfirmLocation}
                      style={styles.checkButton}
                    >
                      <FontAwesomeIcon
                        icon={faCheck}
                        style={styles.iconStyleBack}
                        size={35}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </TouchableOpacity>
            <SelectList
              setSelected={(val) => setCategory(val)}
              data={data}
              save="value"
              defaultOption={{ key: "0", value: "Kategori" }}
              boxStyles={{ width: 300, alignSelf: "center", backgroundColor: "#ffffff", marginBottom: 10, borderWidth: 1 }}
            />
            <Text>{category}</Text>
            <TextInput
              style={styles.postTitleBox}
              placeholder="title (max. 32 character)"
              placeholderTextColor={"#EBE3D5"}
              value={title}
              maxLength={32}
              onChangeText={(text) => setTitle(text)}
            />
            <View style={styles.descStyle}>
              <TextInput
                style={styles.postDescriptionBox}
                placeholder="Post Description"
                placeholderTextColor={"#EBE3D5"}
                value={description}
                onChangeText={(text) => setDescription(text)}
                multiline
                textAlignVertical="top"
              />
              <View style={styles.iconContainer}>
                <TouchableOpacity>
                  <FontAwesomeIcon
                    icon={faImages}
                    style={styles.iconStyle2}
                    size={26}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <FontAwesomeIcon
                    icon={faSmile}
                    style={styles.iconStyle3}
                    size={26}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleMapPress}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    style={styles.iconStyle}
                    size={26}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.postButton}>
              <PostButton buttonText={"Post"} handleSubmit={handlePost} loading={loading} />
            </View>
          </View>
      </ScrollView>
      <View style={styles.footerStyle}>
        <FooterMenu />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  postTitleBox: {
    backgroundColor: "#ffffff",
    width: 300,
    height: 50,
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 12,
    borderColor: "#776B5D",
    borderWidth: 1,
    alignSelf: "center",
  },
  postDescriptionBox: {
    backgroundColor: "#ffffff",
    width: 300,
    height: 300,
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 12,
    borderColor: "#776B5D",
    borderWidth: 1,
    marginTop: 20,
    textAlignVertical: "top",
    padding: 20,
    position: "relative",
    alignSelf: "center",
  },
  iconStyle: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  iconStyle2: {
    position: "absolute",
    bottom: 10,
    right: 10,
    marginRight: 35,
  },
  iconStyle3: {
    position: "absolute",
    bottom: 10,
    right: 10,
    marginRight: 70,
  },
  iconStyle4: {
    position: "absolute",
    bottom: 10,
    right: 10,
    marginRight: 105,
    backgroundColor:"red",
    zIndex:1000,
  },
  descStyle: {
    flexDirection: "column",
    position: "relative",
    alignSelf: "center",
  },
  footerStyle: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: "100%"
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 15,
    borderRadius: 5
  },
  confirmButton: {
    position: "relative",
    bottom: 10,
    right: 10,
    zIndex: 1000,
    backgroundColor:"blue"
  },
  postButton: {
    alignSelf: "center"
  },
  iconStyleBack: {
    color: "red",
  },
  checkButton:{
    position: "absolute",
    top: 20,  // Deneme yanılma ile uygun bir değer seçin
    left: 280,   // Deneme yanılma ile uygun bir değer seçin
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 15,
    borderRadius: 5
  }
});

export default Post;

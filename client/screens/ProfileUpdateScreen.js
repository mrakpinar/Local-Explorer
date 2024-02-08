import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FooterMenu from "../components/Menus/FooterMenu";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker"
import globalStyles from "../assets/style";

const ProfileUpdateScreen = () => {
   // global state
   const [state, setState] = useContext(AuthContext);
   const { user, token } = state;
   // local state
   const [name, setName] = useState(user?.name);
   const [password, setPassword] = useState(user?.password);
   const [email] = useState(user?.email);
   const [loading, setLoading] = useState(false);
   const [avatarSource, setAvatarSource] = useState(null);
   const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
   const [image, setImage] = useState(null)
 
   useEffect(() => {
     (async () => {
       const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
       setHasGalleryPermission(galleryStatus.status === "granted");
 
     })
   }, [])
 
   const pickImage = async () => {
     try {
       const result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
       });
 
       if (!result.cancelled) {
         // Access the selected asset through the "assets" array
         const selectedAsset = result.assets && result.assets.length > 0 && result.assets[0];
 
         if (selectedAsset) {
           setImage(selectedAsset.uri);
         }
       }
       console.log(result.uri)
     } catch (error) {
       console.error('Error picking an image:', error);
     }
   };
 
   // Logout
   const handleLogout = async () => {
     setState({ token: "", user: null });
     await AsyncStorage.removeItem("@auth");
     alert("Success!");
   };
 
 
   // handle user update data
   const handleUpdate = async () => {
     try {
       setLoading(true);
       const response = await axios.put(
         "http://192.168.137.240:8080/api/v1/auth/update-user",
         {
           name,
           password,
           email,
         },
         {
           headers: {
             Authorization: `Bearer ${token && token}`,
           },
         }
       );
 
       if (response && response.data) {
         setLoading(false);
         let UD = JSON.stringify(response.data);
         setState({ ...state, user: UD?.updatedUser });
         await AsyncStorage.removeItem("@auth");
 
         alert(response.data.message);
       } else {
         // Handle the case where 'response.data' is not available
         alert("Unexpected response format");
       }
     } catch (error) {
       // Handle the error case
       alert(error.response?.data?.message || "An error occurred");
       setLoading(false);
       console.log(error);
     }
   };
  return (
    <View style={globalStyles.container}>
    <ScrollView style={{ flex: 1 }}>
      <View style={{ alignItems: "center", marginTop: 50 }}>
        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={style.profileImage}
            />
          ) : (
            <Image
              source={{ uri: "https://cdn.pixabay.com/photo/2023/12/14/18/38/sheep-8449481_1280.jpg" }}
              style={style.profileImage}
            />
          )}
          <View style={style.iconWrapper}>
            <Icon name="plus-square" style={style.iconStyle2} />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          margin: 10,
          alignItems: "center",
        }}
      >
        <Text style={style.warningText}>
          *Currently You Can Only Update Your Name and Password!*
        </Text>
        <View style={{ marginTop: 35 }} />
        {/* inputs */}
        <View style={style.inputContainer}>
          <Text style={style.inputTitle}>Name</Text>
          <TextInput
            style={style.inputBox}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={style.inputContainer}>
          <Text style={style.inputTitle}>Email</Text>
          <TextInput style={style.inputBox} value={email} editable={false} />
        </View>
        <View style={style.inputContainer}>
          <Text style={style.inputTitle}>Password</Text>

          <TextInput
            style={style.inputBox}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <View>
          <TouchableOpacity style={globalStyles.button} onPress={handleUpdate}>
            <Text style={globalStyles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
        <Text style={style.userInfo}>{state?.user.name}</Text>
        <Text style={style.userInfo}>{state?.user.email}</Text>
        <TouchableOpacity onPress={handleLogout} style={{ width: 100, borderWidth: 0.5, borderColor: "grey", marginTop: 20 }}>
          <Icon name="sign-out-alt" style={style.iconStyle} />
          <Text style={{ color: "red", textAlign: "center" }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    {/* <View style={style.footerStyle}>
      <FooterMenu />
    </View> */}
  </View>
  )
}

export default ProfileUpdateScreen

const style = StyleSheet.create({

  userInfo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#776B5D",
    textAlign: "center",
  },
  warningText: {
    color: "#B31312",
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
  },
  inputContainer: {
    marginTop: -10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    margin: 5,
  },
  inputBox: {
    height: 40,
    marginBottom: 20,
    backgroundColor: "#f0f0f0f0",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 12,
    color: "#776B5D",
    fontWeight: "bold",
    width: 300,
  },
  inputTitle: {
    width: 70,
    fontWeight: "bold",
    color: "#B0A695",
    textAlign: "justify",
  },
  updateButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "800",
    fontSize: 19,
  },
  footerStyle: {
    alignSelf: "stretch",
  },
  iconStyle: {
    alignSelf: "center",
    fontSize: 35,
    color: "red",
    padding: 10
  },
  iconStyle2: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    fontSize: 35,
    color: "lightblue",
    padding: 10,
  },
  iconWrapper: {
    position: 'absolute',
    bottom: -15,
    right: -10,
  },
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: 5,
    overflow: "hidden",
  },
});
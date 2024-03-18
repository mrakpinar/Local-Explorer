import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  Image
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";
import globalStyles from "../assets/style";
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker"
import Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  // global state
  const [state, setState] = useContext(AuthContext);
  const [image, setImage] = useState(null)
  const navigation = useNavigation();

  const menuItems = [
    { title: "Postlarım", screen: "MyPostsScreen" },
    { title: "Profili Güncelle", screen: "ProfileUpdateScreen" },
    { title: "Ayarlar", screen: "SettingsScreen" },
  ];

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        const formData = new FormData();
        formData.append('profileImage', {
          uri: result.uri,
          type: 'image/jpeg',
          name: "profileImage.jpg"
        });

        const response = await axios.post("http://192.168.1.191:8080/api/v1/auth/update-user", formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (response.data.success) {
          setImage(result.uri);
          console.log("Fotoğraf başarıyla yüklendi:", result.uri);
        } else {
          console.log("Fotoğraf yükleme hatası:", response.data.message);
        }
      }
    } catch (error) {
      console.error('Error picking an image:', error);
    }
  };

  const homeNavigation = () => {
    navigation.navigate('Home')
  }

  const postsNavigation = () => {
    navigation.navigate('MyPosts')
  }
  const profileNavigation = () => {
    navigation.navigate('ProfileUpdateScreen')
  }
  const handleLogout = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
    alert("Success!");
  };

  return (
    <View style={style.container}>
      <ScrollView style={{ flex: 1 }}>
        {/* <View style={style.userNameStyle}>
          <Text style={style.userInfo}>{state?.user.name}</Text>
        </View> */}

        <View style={{ alignItems: "center", padding: 45, backgroundColor: "#fff", borderRadius: 10 }}>
          <TouchableOpacity onPress={pickImage} >
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
            {/* <View style={style.iconWrapper}>
              <Icon name="plus-square" style={style.iconStyle} />
            </View> */}
          </TouchableOpacity>
          <View style={style.nameContainer}>
            <Text style={style.nameStyle}>{state?.user.name}</Text>
            <Text style={{ color: "#000" }}>{state?.user.email}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', flexDirection: "column", marginTop: 50 }}>
          <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }} onPress={homeNavigation}>
            <Icon name="home" style={{ color: "#6420AA", fontSize: 35 }} />
            <Text style={{ padding: 20, fontSize: 16, fontWeight: "700" }}>Ana sayfa  </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }} onPress={postsNavigation}>
            <Icon name="clipboard" style={{ color: "#6420AA", fontSize: 35 }} />
            <Text style={{ padding: 20, fontSize: 16, fontWeight: "700" }}>Paylaşımlar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={profileNavigation}>
            <Icon name="user" style={{ color: "#6420AA", fontSize: 35 }} />
            <Text style={{ padding: 20, fontSize: 16, fontWeight: "700" }}>Profil         </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={handleLogout}>
            <Icon name="sign-out-alt" style={{ color: "#6420AA", fontSize: 35 }} />
            <Text style={{ padding: 20, fontSize: 16, fontWeight: "700" }}>Çıkış         </Text>
          </TouchableOpacity>
        </View>


      </ScrollView>
      <View style={style.footerStyle}>
        <FooterMenu />
      </View>
      <Image source={require('../assets/images/localexplorer_rmbg.png')} style={style.backgroundImage} />

    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFB5DA"
  },
  userNameStyle: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  userInfo: {
    fontSize: 16,
    fontWeight: "700"
  },
  updateButtonContainer: {
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#294B29",
    padding: 15,
    margin: 60,
    borderRadius: 10
  },
  updateButtonText: {
    color: "#ffffff",
    fontWeight: "300"
  },
  postHistoryButton: {
    alignItems: "center",
    marginTop: 25,
    backgroundColor: "#294B29",
    padding: 15,
    marginHorizontal: 60,
    borderRadius: 10
  },
  postHistoryButtonText: {
    color: "#fff",
    fontWeight: "300"
  },
  nameContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10
  },
  nameStyle: {
    color: "#000",
    fontWeight: "900",
    fontSize: 17
  },
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: 100,
    overflow: "hidden",
  },
  iconWrapper: {
    position: 'absolute',
    bottom: -13,
    right: -10,
  },
  iconStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    fontSize: 35,
    color: "#6420AA",
    padding: 10,
  },
  backgroundImage: {
    position: 'absolute',
    height: "100%",
    width: "100%",
    resizeMode: 'repeat',
    opacity: 0.1,
    zIndex: -1,
    marginTop: 15
  }
});

export default Profile;

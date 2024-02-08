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
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  // global state
  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;
  const navigation = useNavigation();


  // Logout
  const handleLogout = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
    alert("Success!");
  };

  const updateScreenNavigation = () =>{
    navigation.navigate("ProfileUpdateScreen")
  }

  return (
    <View style={globalStyles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={style.userNameStyle}>
          <Text style={style.userInfo}>{state?.user.name}</Text>
        </View>
        <View style={style.updateButtonContainer}>
          <TouchableOpacity onPress={updateScreenNavigation}>
            <Text style={style.updateButtonText}>Profili Güncelle</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={style.footerStyle}>
        <FooterMenu />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  userNameStyle:{
    textAlign:"center",
    alignItems:"center",
    justifyContent:"center",
    marginTop:10
  },
  userInfo:{
    fontSize:16,
    fontWeight:"700"
  },
  updateButtonContainer:{
    alignItems:"center",
    marginTop:20,
    backgroundColor:"#294B29",
    padding:15,
    margin:60,
    borderRadius:10
  },
  updateButtonText:{
    color:"#ffffff",
    fontWeight:"300"
  }
});

export default Profile;


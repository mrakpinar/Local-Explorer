import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity } from "react-native";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";
import axios from "axios";
import DropdownComponent from "../../components/DropdownComponent";
import * as ImagePicker from "expo-image-picker"
import globalStyles from "../../assets/style";


const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null)


  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!email || !name || !password) {
        Alert.alert("Please Fill All Blank Fields!");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "http://192.168.1.191:8080/api/v1/auth/register",
        { name, email, password }
      );

      if (response && response.data) {
        navigation.navigate("Login");
        console.log("Data => ", { name, email, password });
      } else {
        alert("Unexpected response format");
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const selectedAssets = result.assets;

        if (selectedAssets && selectedAssets.length > 0) {
          const selectedAsset = selectedAssets[0];
          setImage(selectedAsset.uri);
          console.log(selectedAsset.uri);
        }
      }
    } catch (error) {
      console.error('Error picking an image:', error);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Image source={require("../../assets/images/register.png")} style={{ width: "100%", height: 200 }} />
      <View style={{ marginHorizontal: 20 }}>
        <View style={{ alignItems: "center", }}>
          <TouchableOpacity onPress={pickImage}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={style.profileImage}
              />
            ) : (
              <Image
                source={{ uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }}
                style={style.profileImage}
              />
            )}
            <View style={style.iconWrapper}>
              <Text style={style.plusStyle}>+</Text>
            </View>
          </TouchableOpacity>
          <View style={{ height: 50 }} />
        </View>
        <InputBox
          inputPlaceHolder={"Name"}
          secureTextEntry={false}
          value={name}
          setValue={setName}
        />
        <InputBox
          inputPlaceHolder={"Email"}
          secureTextEntry={false}
          keyboardType="email-address"
          autoComplete="email"
          value={email}
          setValue={setEmail}
        />
        <InputBox
          inputPlaceHolder={"Password"}
          secureTextEntry={true}
          autoComplete="password"
          value={password}
          setValue={setPassword}
        />
        {/* <DropdownComponent onSelectCity={handleCitySelect} /> */}
        <SubmitButton
          buttonText={"Register"}
          loading={loading}
          handleSubmit={handleSubmit}
        />
      </View>
      <Text
        style={{
          marginTop: 25,
          textAlign: "center",
        }}
      >
        You have an account?{" "}
        <Text
          style={{ fontWeight: "bold", fontSize: 15 }}
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Text>{" "}
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    color: "#776B5D",
    marginBottom: 10,
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
    bottom: 0,
    right: 0,
  },
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: 100,
    borderWidth: 1.8,
    borderColor: "#776B5D",
    overflow: "hidden",
  },
  plusStyle: {
    fontSize: 45,
    fontWeight: "700",
    color: "blue",
  },

});

export default Register;

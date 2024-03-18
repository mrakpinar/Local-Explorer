import { View, Text, StyleSheet, TextInput, Alert, Image } from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import globalStyles from "../../assets/style";

const Login = ({ navigation }) => {
  //global states
  const [state, setState] = useContext(AuthContext);

  //states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!email || !password) {
        Alert.alert("Please Fill All Blank Fields!");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "http://192.168.1.191:8080/api/v1/auth/login",
        { email, password }
      );

      if (response && response.data) {
        setState(response.data);

        await AsyncStorage.setItem("@auth", JSON.stringify(response.data));

        navigation.navigate("Home");
        console.log("Data => ", response.data);
      } else {
        alert("Unexpected response format");
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");

      setLoading(false);
      console.log(error);
    }
  };

  const getLocalStorageData = async () => {
    let data = await AsyncStorage.getItem("@auth");
  };
  getLocalStorageData();

  return (
    <View style={globalStyles.container}>
      <Image source={require("../../assets/images/localexplorer.png")} style={{ width: "100%", height: 200 }} />
      {/* <Image source={require("../../assets/images/login.png")} style={{ width: "100%", height: 200 }} /> */}
      <View style={{ marginHorizontal: 35, marginTop: 100 }}>
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
        <View style={{ height: 35 }} />
        <SubmitButton
          buttonText={"Login"}
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
        You dont't have an acount?{" "}
        <Text
          style={{ fontWeight: "bold", fontSize: 15 }}
          onPress={() => navigation.navigate("Register")}
        >
          Register
        </Text>{" "}
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#EBE3D5",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    color: "#776B5D",
    marginBottom: 45,
  },
  inputBox: {
    height: 40,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 20,
    paddingLeft: 12,
    color: "#B0A695",
    fontWeight: "bold",
  },
});

export default Login;

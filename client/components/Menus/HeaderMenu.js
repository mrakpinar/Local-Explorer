import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderMenu = () => {
  const [state, setState] = useContext(AuthContext);
  //logot
  const handleLogout = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
    alert("Success!");
  };
  return (
    <View>
      <TouchableOpacity onPress={handleLogout}>
        <Icon name="sign-out-alt" style={style.iconStyle} />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  iconStyle: {
    alignSelf: "center",
    fontSize: 25,
    color: "#776B5D",
  },
});

export default HeaderMenu;

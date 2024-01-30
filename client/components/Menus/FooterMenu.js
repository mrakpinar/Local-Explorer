import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useRoute } from "@react-navigation/native";
import globalStyles from "../../assets/style";

const FooterMenu = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={{ backgroundColor: "#294B29", borderRadius: 60, margin: 7 }}>
      <View style={globalStyles.footerContainer}>
        {/* <TouchableOpacity onPress={() => navigation.navigate("Explorer")}>
          <Icon
            style={style.iconStyle}
            name="search-location"
            color={route.name === "Explorer" ? "orange" : "#ffffff"}
          />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => navigation.navigate("Post")}>
          <Icon
            style={globalStyles.footerIconStyle}
            name="plus-square"
            color={route.name === "Post" ? "#ffffff" : "#DBE7C9"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon
            style={globalStyles.footerIconStyle}
            name="home"
            color={route.name === "Home" ? "#ffffff" : "#DBE7C9"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Icon
            style={globalStyles.footerIconStyle}
            name="user-circle"
            color={route.name === "Profile" ? "#ffffff" : "#DBE7C9"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default FooterMenu;

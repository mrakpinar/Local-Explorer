import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";
import { SafeAreaView } from "react-native-safe-area-context";

const Explorer = () => {
  const [state] = useContext(AuthContext);

  return (
    <SafeAreaView style={style.container}>
      <View>
        <Text style={style.header}>Explorer</Text>
      </View>
      <FooterMenu />
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#EBE3D5",
  },
  header: {
    color: "#776B5D",
    fontSize: 24,
    textAlign: "justify",
    margin: 30,
    fontWeight: "300",
  },
});
export default Explorer;

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

const PostButton = ({ buttonText, handleSubmit, loading }) => {
  return (
    <TouchableOpacity style={style.submitButtonStyle} onPress={handleSubmit}>
      <Text style={{ color: "#EBE3D5", fontWeight: "800", fontSize: 18 }}>
        {/* <Icon style={style.iconStyle} name="plus-square" /> {"  "} */}
        {loading ? "Processing.." : buttonText}
      </Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  submitButtonStyle: {
    backgroundColor: "#776B5D",
    height: 50,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 40,
    marginVertical: 50,
  },
  iconStyle: {
    fontSize: 15,
  },
});

export default PostButton;

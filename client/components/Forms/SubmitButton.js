import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const SubmitButton = ({ buttonText, handleSubmit, loading }) => {
  return (
    <TouchableOpacity style={style.submitButtonStyle} onPress={handleSubmit}>
      <Text style={{ color: "#EBE3D5", fontWeight: "800", fontSize: 18 }}>
        {loading ? "Processing.." : buttonText}
      </Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  submitButtonStyle: {
    backgroundColor: "#776B5D",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginHorizontal: 10,
    marginTop: 10
  },
});

export default SubmitButton;

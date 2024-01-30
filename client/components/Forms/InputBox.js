import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";

const InputBox = ({
  inputPlaceHolder,
  autoComplete,
  keyboardType,
  secureTextEntry,
  value,
  setValue,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View>
      <Text style={[style.label, isFocus || value ? style.labelFocus : null]}>
        {inputPlaceHolder}
      </Text>
      <TextInput
        style={isFocus ? style.focusedInputBox : style.inputBox}
        placeholder=""
        onChangeText={(inputText) => setValue(inputText)}
        value={value}
        autoCorrect={false}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    position: "absolute",
    left: 12,
    top: 20,
    zIndex: 1,
    fontSize: 14,
    color: "#B0A695",
    backgroundColor: "#F3EEEA",
  },
  labelFocus: {
    top: 0,
    fontSize: 12,
    color: "#776B5D",
  },
  inputBox: {
    height: 40,
    marginBottom: 20,
    backgroundColor: "#F3EEEA",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 12,
    color: "#B0A695",
    fontWeight: "bold",
    borderWidth: 1,
  },
  focusedInputBox: {
    height: 40,
    marginBottom: 20,
    backgroundColor: "#F3EEEA",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 12,
    color: "#B0A695",
    fontWeight: "bold",
    borderWidth: 1.5,
  },
});

export default InputBox;

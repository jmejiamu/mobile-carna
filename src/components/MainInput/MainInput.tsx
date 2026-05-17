import React from "react";
import { StyleSheet, TextInput } from "react-native";

interface MainInputProps extends React.ComponentProps<typeof TextInput> {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  style?: object;
}

const MainInput = (props: MainInputProps) => {
  return (
    <TextInput {...props} style={{ ...styles.inputStyle, ...props.style }} />
  );
};

export default MainInput;

const styles = StyleSheet.create({
  inputStyle: {
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 1,
    padding: 10,
    color: "white",
    width: "100%",
    marginLeft: 5,
  },
});

import React from "react";
import { StyleSheet, View } from "react-native";
import Driver from "./components/Navigation/Driver";

export default function App() {
  return (
    <View style={styles.container}>
      <Driver />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

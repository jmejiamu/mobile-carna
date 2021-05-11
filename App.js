import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Driver from './components/Navigation/Driver';
import Signin from './components/Singin'


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

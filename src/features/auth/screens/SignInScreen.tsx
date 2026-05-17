import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import restapi from "../../../../components/url/url";
import { useRouter } from "expo-router";
import MainInput from "@/src/components/MainInput/MainInput";

const SignInScreen = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const body = {
        email: email,
        password: password,
      };
      const response = await fetch(restapi.carna + "/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.token) {
        await AsyncStorage.setItem("token", data.token);
        router.replace("/home");
      } else {
        Alert.alert("Please", data.response);
        console.log(data.response);
      }
    } catch (error) {
      console.error(error);
    }

    setEmail("");
    setPassword("");
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <View style={styles.inputStyle}>
          <View style={styles.logoStyle}>
            <FontAwesome5 name="user-circle" size={40} color="white" />
          </View>
          <View style={styles.iconStyles}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="white"
            />

            <MainInput
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor="gray"
              value={email}
              onChangeText={(e) => setEmail(e)}
            />
          </View>
          <View style={styles.iconStyles}>
            <AntDesign name="lock" size={24} color="white" />

            <MainInput
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="gray"
              value={password}
              onChangeText={(e) => setPassword(e)}
            />
          </View>
        </View>
        <View style={{ marginLeft: 20, marginRight: 20 }}>
          <TouchableOpacity
            style={styles.siginButtonStyle}
            onPress={handleSubmit}
          >
            <Text style={styles.textSingStyle}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={styles.textSingStyle}>Register Here!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#262432",
    justifyContent: "center",
  },
  inputStyle: {
    marginLeft: 20,
    marginRight: 50,
  },
  siginButtonStyle: {
    padding: 10,
    backgroundColor: "#1D1B28",
    marginBottom: 15,
  },
  textSingStyle: {
    color: "white",
    textAlign: "center",
  },
  iconStyles: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 60,
  },
  logoStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
    alignItems: "center",
    marginBottom: 60,
  },
});

export default SignInScreen;

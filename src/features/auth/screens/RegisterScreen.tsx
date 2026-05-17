import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
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
import restapi from "../../../../components/url/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import MainInput from "@/src/components/MainInput/MainInput";

const RegisterScreen = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      // Object to be sent to the back end
      let defaultPicture =
        "https://irokonews.com/wp-content/uploads/2020/06/Capture-3-400x289.png";
      const body = {
        name: userName,
        email: email,
        password: password,
        picture: defaultPicture,
      };

      const response = await fetch(restapi.carna + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      // Getting the response  recieved from the server
      const data = await response.json();

      // if the token exist save it the local storage
      if (data.token) {
        await AsyncStorage.setItem("token", data.token);

        router.replace("/home");
      } else {
        Alert.alert("Check", data.response);
      }
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
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
            <FontAwesome5 name="user" size={24} color="white" />
            <MainInput
              placeholder="User name"
              placeholderTextColor="gray"
              value={userName}
              onChangeText={(e) => setUserName(e)}
            />
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
            <Text style={styles.textSingStyle}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              router.push("/");
            }}
          >
            <Text style={styles.textSingStyle}>Sign in Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#262432",
    justifyContent: "center",
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
  inputStyle: {
    marginLeft: 20,
    marginRight: 50,
  },
  logoStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
    alignItems: "center",
    marginBottom: 60,
  },
});

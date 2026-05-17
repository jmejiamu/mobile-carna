import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import restapi from "../../../../components/url/url";
import { useRouter } from "expo-router";

const ProfileScreen = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [picture, setPicture] = useState("");
  const [userName, setUserName] = useState("");

  const getUserInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(restapi.carna + "/data", {
        method: "GET",
        headers: { token: token || "" },
      });
      const data = await response.json();

      console.log(data);
      setUserName(data.name);
      setPicture(data.picture);
      setUserId(data.id);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  const logout = () => {
    AsyncStorage.removeItem("token").then(() => {
      //   props.setLogged(false);
      router.replace("/");
    });
  };
  return (
    <ScrollView>
      <View style={{}}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{ uri: `${picture}` }} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{userName}</Text>
            <Text style={styles.info}>Cybersecurity / Mobile developer</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum
              electram expetendis, omittam deseruisse consequuntur ius an,
            </Text>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => router.push("english")}
            >
              <Text>English Course</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Spanish</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => logout()}
            >
              <Text>LOGOUT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default ProfileScreen;
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
});

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import restapi from "../../../config/url";
import { useRouter } from "expo-router";

interface ContentData {
  id: number;
  title: string;
}

const EmptyListComponent = () => (
  <View>
    <Text style={styles.emptyText}>No content available</Text>
  </View>
);

const HomeScreen = () => {
  const router = useRouter();
  const [contentData, setContentData] = useState<ContentData[]>([]);
  const getData = async () => {
    try {
      const response = await fetch(restapi.carna + "/allenglish");

      const dataResponse = await response.json();

      setContentData(dataResponse);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={contentData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                router.push(`/lecture/${item.id}`);
              }}
            >
              <Image
                style={styles.image}
                source={{
                  uri: "https://img.icons8.com/clouds/100/000000/groups.png",
                }}
              />
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.title}</Text>
                <Text style={styles.count}>Basic Lecture</Text>
                <TouchableOpacity style={styles.followButton}>
                  <Text style={styles.followButtonText}>Explore now</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={<EmptyListComponent />}
        contentContainerStyle={
          contentData.length === 0 ? styles.emptyList : undefined
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  emptyList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#ebf0f7",
  },

  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    borderRadius: 30,
  },

  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: "center",
    color: "#3399ff",
    fontWeight: "bold",
  },
  count: {
    fontSize: 14,
    flex: 1,
    alignSelf: "center",
    color: "#6666ff",
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#dcdcdc",
  },
  followButtonText: {
    color: "#dcdcdc",
    fontSize: 12,
  },
  emptyText: {
    fontSize: 18,
    color: "#999999",
  },
});

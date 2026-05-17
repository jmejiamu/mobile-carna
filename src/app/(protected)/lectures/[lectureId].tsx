import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import restapi from "../../../config/url";
import { useLocalSearchParams } from "expo-router";

interface LectureData {
  title: string;
  content: string;
}

const Lectures = () => {
  const { id } = useLocalSearchParams();
  const lecture_id = JSON.stringify(id);

  const [lectureData, setLectureData] = useState<LectureData | null>(null);

  const getLecture = async () => {
    try {
      const response = await fetch(restapi.carna + `/onelecture/${lecture_id}`);

      const dataResponse = await response.json();

      setLectureData(dataResponse[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLecture();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            {lectureData && (
              <>
                <Text style={styles.title}>{lectureData.title}</Text>
                <Text>{lectureData.content}</Text>
              </>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Lectures;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#ebf0f7",
    marginBottom: 20,
  },

  cardContent: {
    marginLeft: 20,
    marginTop: 10,
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

  title: {
    fontSize: 18,
    alignSelf: "center",
    color: "#3399ff",
    fontWeight: "bold",
  },
});

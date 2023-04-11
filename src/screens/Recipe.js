import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React from "react";
import jsonServer from "../services/jsonServer";
import { recipe } from "../services/API";
import { useState, useEffect } from "react";

export default function Recipe({ navigation }) {
  const [bookmark, setBookmark] = useState([]);
  //console.log(navigation);
  const date = new Date();
  console.log(date);
  useEffect(() => {
    const getBookarked = async () => {
      const response = await jsonServer.get("/recipe");
      setBookmark(response.data);
    };
    getBookarked();

    // navigation.addListener("didFocus", () => {
    // getBookarked(); //so that wen we navigate to the index screen from other screens, we still fetch posts from server
    //});

    // return () => {
    //  listener.remove();
    //};
  }, []);
  return (
    <View>
      <FlatList
        data={bookmark}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Image source={{ uri: item.image_url }} style={{ flex: 1 }}></Image>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
      ></FlatList>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { height: 180, borderBottomWidth: 2 },
  title: {
    marginTop: -50,
    color: "#f38e82",
    fontWeight: "bold",
    alignSelf: "center",
    justifyContent: "center",
    textTransform: "uppercase",
  },
});

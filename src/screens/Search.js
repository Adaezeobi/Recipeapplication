import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import RecipeContext from "../context/useContext";

export default function Search({ navigation }) {
  const { width } = Dimensions.get("window");
  const [keyword, setKeyword] = useState("");

  const { data } = useContext(RecipeContext);

  console.log(width);
  //console.log(data.recipes);
  //console.log(data.addSearchKeyword("beef"));
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Discover Recipes</Text>
        <TextInput
          style={styles.searchBox}
          placeholder="Search"
          placeholderTextColor={"grey"}
          onChangeText={(text) => setKeyword(text)}
          value={keyword}
          onSubmitEditing={() => data.addSearchKeyword(`?search=${keyword}`)}
        ></TextInput>
      </View>
      <View style={{ width: width }}>
        <FlatList
          data={data.recipes}
          keyExtractor={(item) => item.id}
          horizontal={false}
          numColumns={2}
          renderItem={({ item }) => {
            return (
              <View>
                <View
                  style={{
                    height: 210,
                    width: 180,
                    marginLeft: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("RecipeDetail", { id: item.id })
                    }
                  >
                    <Image
                      source={{ uri: `${item.image_url}` }}
                      style={{
                        height: 150,
                        width: 180,

                        marginVertical: 10,
                      }}
                    ></Image>
                  </TouchableOpacity>
                  <Text
                    style={{
                      alignSelf: "center",
                      flexWrap: "wrap",
                      fontWeight: "bold",
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              </View>
            );
          }}
        ></FlatList>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#f38e82",
    height: 195,
    justifyContent: "flex-end",
  },
  searchBox: {
    marginHorizontal: 20,
    borderWidth: 3,
    marginBottom: 20,
    borderRadius: 15,
    borderColor: "white",
    height: 35,
    backgroundColor: "white",
  },

  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 12,
    marginLeft: 20,
  },
});

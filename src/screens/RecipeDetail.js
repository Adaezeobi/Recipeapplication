import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import RecipeContext from "../context/useContext";
import { recipe } from "../services/API";
import { useContext } from "react";
import shoppingContext from "../context/shoppingListContext";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";

export default function RecipeDetail(navigation) {
  const { data } = useContext(RecipeContext);
  const { myData } = useContext(shoppingContext);
  //const s = {};
  const [modalVisible, setModalVisible] = useState(false);
  navigation.navigation.setOptions({
    headerRight: () => (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible),
              myData.addShoppingList(recipeInfo.ingredients, recipeInfo.title);
          }}
          style={{ marginRight: 10 }}
        >
          <MaterialIcons name="add-shopping-cart" size={24} color="#f38e82" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="calendar-plus-o" size={24} color="#f38e82" />
        </TouchableOpacity>
      </View>
    ),
  });
  const ids = navigation.route.params.id;
  const [bookmarkPressed, setBookmarkPressed] = useState(false);

  //console.log(data);
  console.log(ids);
  const [recipeInfo, setRecipe] = useState({});
  console.log(recipeInfo);
  //s["ingredients"] = {
  //recipeInfo,
  //ingredients,
  //};
  //console.log(s);
  //console.log(s.ingredients);
  useEffect(() => {
    const Recipe = async () => {
      let response = await recipe(`/${ids}`);

      setRecipe(response.data.recipe);

      // return response.data;
      console.log(response.data.recipe);
    };
    Recipe();
  }, []);
  //console.log(r);
  return (
    <View>
      <Image
        source={{ uri: `${recipeInfo.image_url}` }}
        style={{
          height: 250,
          //  backgroundColor: ("#fbdb89", "#f48982"),
          overlayColor: "red",
        }}
      ></Image>

      <View style={styles.infoContainer}>
        <AntDesign name="clockcircleo" size={24} color="#f38e82" />
        <Text>{recipeInfo.cooking_time} MINUTES</Text>
        <Feather name="users" size={24} color="#f38e82" />
        <Text>{recipeInfo.servings} SERVINGS</Text>
        <TouchableOpacity>
          <Feather name="plus-circle" size={24} color="#f38e82" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="minus-circle" size={24} color="#f38e82" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigation.navigate("Recipe");
            setBookmarkPressed(!bookmarkPressed);
            data.addSavedRecipe(ids);
          }}
        >
          <FontAwesome
            name={bookmarkPressed ? "bookmark" : "bookmark-o"}
            size={24}
            color="#f38e82"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.titleBox}>
        <Text style={styles.title}>{recipeInfo.title}</Text>
      </View>

      <View style={styles.recipeIngredients}>
        <FlatList
          data={recipeInfo.ingredients}
          keyExtractor={(item) => item.description}
          numColumns={2}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  flex: 0.5,
                  margin: 4,
                  //  alignContent: "center",
                  //  justifyContent: "center",
                }}
              >
                <Entypo name="plus" size={24} color="#f38e82" />
                <Text
                  style={{
                    maxWidth: 160,

                    marginBottom: 10,
                  }}
                >
                  {item.quantity} {item.unit} {item.description}
                </Text>
              </View>
            );
          }}
        ></FlatList>
      </View>
      <View>
        <Text style={styles.directionText}>HOW TO COOK IT</Text>
      </View>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(!modalVisible)}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View
          style={{
            backgroundColor: "white",
            height: 500,

            borderWidth: 1,
            borderColor: "grey",
          }}
        ></View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    //  marginTop: -30,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    padding: 10,
    textTransform: "uppercase",
  },

  titleBox: {
    marginTop: -160,
    transform: [{ skewX: "-15deg" }, { skewY: "-15deg" }],

    width: 200,

    borderColor: "red",
    backgroundColor: "#f38e82",
    alignSelf: "center",
  },

  infoContainer: {
    //marginTop: 50,
    height: 100,
    backgroundColor: "#f2efee",
    flexDirection: "row",
    justifyContent: "space-around",
    //marginTop: 120,
    //borderWidth: 3,
    paddingVertical: 30,
    // marginTop: 30,
  },
  recipeIngredients: {
    marginTop: 90,
  },

  directionText: {
    textAlign: "center",
  },
});

import { View, Text } from "react-native";
import React from "react";
import { useEffect, useState, useReducer } from "react";
import { recipe } from "../services/API";
import jsonServer from "../services/jsonServer";

const RecipeContext = React.createContext();

const initialRecipes = [];

const Reducer = (state, action) => {
  switch (action.type) {
    case "searchtext":
      return action.payload;

    case "savedrecipe":
      const savedItemIndex = state.findIndex(
        (st) => st.id === action.payload.id
      );
      console.log(state[savedItemIndex]);
      state[savedItemIndex] = {
        ...state[savedItemIndex],
        saved: !action.payload.saved,
      };
      //c  console.log(state);
      return state;

    default:
      return state;
  }
};

export const RecipeProvider = ({ children }) => {
  const [recipes, dispatch] = useReducer(Reducer, initialRecipes);
  //const [recipes, setRecipe] = useState([]);

  const addSearchKeyword = async (keyword) => {
    let response = await recipe(keyword);
    const searchResult = response.data.recipes.map((rec) => {
      return { ...rec, saved: false };
    });
    console.log(searchResult);
    dispatch({ type: "searchtext", payload: searchResult });
  };

  const addSavedRecipe = async (id) => {
    let savedItem = recipes.findIndex((st) => st.id === id);

    recipes[savedItem] = {
      ...recipes[savedItem],
      saved: !recipes[savedItem].saved,
    };
    console.log(recipes);

    recipes[savedItem].saved
      ? await jsonServer.post("/recipe", recipes[savedItem])
      : await jsonServer.delete(`/recipe/${id}`);

    //dispatch({ type: "savedrecipe", payload: { id: id, saved: false } });
  };
  return (
    <RecipeContext.Provider
      value={{ data: { recipes, addSearchKeyword, addSavedRecipe } }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeContext;

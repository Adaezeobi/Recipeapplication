import React from "react";
import { useReducer, useEffect } from "react";

const shoppingContext = React.createContext();

const initialShoppingList = [];

const Reducer = (state, action) => {
  switch (action.type) {
    case "list":
      return [...state, [action.payload.ingredients]];
  }
};
export const ShoppingProvider = ({ children }) => {
  const [shoppingList, dispatch] = useReducer(Reducer, initialShoppingList);

  const addShoppingList = (recipeingredients, description) => {
    dispatch({
      type: "list",
      payload: {
        ingredients: recipeingredients,
        title: description,
      },
    });

    console.log(shoppingList);
  };

  return (
    <shoppingContext.Provider
      value={{ myData: { shoppingList, addShoppingList } }}
    >
      {children}
    </shoppingContext.Provider>
  );
};

export default shoppingContext;

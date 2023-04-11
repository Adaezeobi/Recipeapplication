// In App.js in a new project

import * as React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Shopping from "./src/screens/Shopping";
import Search from "./src/screens/Search";
import Recipe from "./src/screens/Recipe";
import MealPlan from "./src/screens/MealPlan";
import RecipeMoreInfo from "./src/screens/RecipeMoreInfo";
import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecipeContext from "./src/context/useContext";
import { RecipeProvider } from "./src/context/useContext";
import { ShoppingProvider } from "./src/context/shoppingListContext";
import RecipeDetail from "./src/screens/RecipeDetail";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
const RecipeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const ShoppingStack = createNativeStackNavigator();
const MealPlanStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ShoppingStackScreen() {
  return (
    <ShoppingStack.Navigator>
      <ShoppingStack.Screen
        name="Shopping List"
        component={Shopping}
      ></ShoppingStack.Screen>
    </ShoppingStack.Navigator>
  );
}

function SearchStackScreen({ navigation }) {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Searchs"
        component={Search}
        options={{ headerShown: false }}
      ></SearchStack.Screen>
      <SearchStack.Screen
        name="RecipeDetail"
        component={RecipeDetail}
      ></SearchStack.Screen>

      <SearchStack.Screen
        name="recipeInfo"
        component={RecipeMoreInfo}
      ></SearchStack.Screen>
    </SearchStack.Navigator>
  );
}
function RecipeStackScreen({ navigation }) {
  return (
    <RecipeStack.Navigator>
      <RecipeStack.Screen
        name="Recipe"
        component={Recipe}
        options={{ headerShown: false }}
      ></RecipeStack.Screen>
    </RecipeStack.Navigator>
  );
}
function MealPlanStackScreen({ navigation }) {
  return (
    <MealPlanStack.Navigator>
      <MealPlanStack.Screen
        name="Meal Plan"
        component={MealPlan}
      ></MealPlanStack.Screen>
    </MealPlanStack.Navigator>
  );
}

function App() {
  return (
    <RecipeProvider>
      <ShoppingProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Recipes"
              component={RecipeStackScreen}
              // options={{ headerShown: false }}
              options={{}}
            ></Tab.Screen>
            <Tab.Screen
              name="Dicsover"
              component={SearchStackScreen}
              options={{
                headerShown: false,
                tabBarIcon: () => (
                  <Feather name="search" size={24} color="black" />
                ),
              }}
            ></Tab.Screen>
            <Tab.Screen
              name="Shopping Lists"
              component={ShoppingStackScreen}
              options={{
                headerShown: false,
                tabBarIcon: () => (
                  <AntDesign name="shoppingcart" size={24} color="black" />
                ),
              }}
            ></Tab.Screen>
            <Tab.Screen
              name="Meal Plans"
              component={MealPlanStackScreen}
              options={{
                headerShown: false,
                tabBarIcon: () => (
                  <AntDesign name="calendar" size={24} color="black" />
                ),
              }}
            ></Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </ShoppingProvider>
    </RecipeProvider>
  );
}

export default App;

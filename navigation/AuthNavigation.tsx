import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Auth/Home";
import Login from "../screens/Auth/Login";
import Signup from "../screens/Auth/Signup";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function AuthNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

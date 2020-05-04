import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthHome from "../screens/Auth/AuthHome";
import Login from "../screens/Auth/Login";
import Signup from "../screens/Auth/Signup";
import Confirm from "../screens/Auth/Confirm";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function AuthNavigation(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Confirm" component={Confirm} />
        <Stack.Screen name="AuthHome" component={AuthHome} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Messages from "../screens/Messages/Messages";
import Message from "../screens/Messages/Message";
import { stackStyles } from "./config";

const Stack = createStackNavigator();

export default function MessageNavigation(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          ...stackStyles,
        },
      }}
    >
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="Message" component={Message} />
    </Stack.Navigator>
  );
}

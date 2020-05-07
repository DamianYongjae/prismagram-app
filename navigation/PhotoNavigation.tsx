import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SelectPhotos from "../screens/Photo/SelectPhotos";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { createStackNavigator } from "@react-navigation/stack";
import { stackStyles } from "./config";
import styles from "../styles";

const Tab = createMaterialTopTabNavigator();

function PhotoTabNavigation(): JSX.Element {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
        indicatorStyle: {
          backgroundColor: styles.blackColor,
          marginBottom: 20,
        },
        style: {
          paddingBottom: 20,
          ...stackStyles,
        },
        labelStyle: {
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="SelectPhotos"
        component={SelectPhotos}
        options={{ tabBarLabel: "Select" }}
      />
      <Tab.Screen
        name="TakePhoto"
        component={TakePhoto}
        options={{ tabBarLabel: "Take" }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function PhotoNavigation(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          ...stackStyles,
        },
        headerTintColor: styles.blackColor,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="Choose Photo" component={PhotoTabNavigation} />
      <Stack.Screen name="UploadPhoto" component={UploadPhoto} />
    </Stack.Navigator>
  );
}

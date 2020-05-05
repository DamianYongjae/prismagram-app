import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SelectPhotos from "../screens/Photo/SelectPhotos";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { createStackNavigator } from "@react-navigation/stack";
import { stackStyles } from "./config";

const Tab = createMaterialTopTabNavigator();

function PhotoTabNavigation(): JSX.Element {
  return (
    <Tab.Navigator tabBarPosition="bottom">
      <Tab.Screen name="SelectPhotos" component={SelectPhotos} />
      <Tab.Screen name="TakePhoto" component={TakePhoto} />
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
      }}
    >
      <Stack.Screen name="PhotoTabs" component={PhotoTabNavigation} />
      <Stack.Screen name="UploadPhoto" component={UploadPhoto} />
    </Stack.Navigator>
  );
}

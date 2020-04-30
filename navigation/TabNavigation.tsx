import React from "react";
import Home from "../screens/Auth/Home";
import Search from "../screens/Auth/Search";
import Notifications from "../screens/Auth/Notifications";
import Profile from "../screens/Auth/Profile";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PhotoNavigation from "./PhotoNavigation";

const Tab = createBottomTabNavigator();

export default function TabNavigation({ navigation }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen
        name="Add"
        component={View}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("PhotoNavigation");
          },
        }}
      />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

import React, { Component } from "react";
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import MessagesLink from "../components/MessagesLink";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import PhotoNavigation from "./PhotoNavigation";
import { TouchableOpacity } from "react-native-gesture-handler";

const stackFactory = (initialRoute): JSX.Element => {
  const Stack = createStackNavigator();
  const { name, params } = initialRoute.route;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={name}
        component={params.routeName}
        options={params.customConfig}
      />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export default function TabNavigation({ navigation }): JSX.Element {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={stackFactory}
        initialParams={{
          routeName: Home,
          customConfig: {
            title: "Home",
            headerRight: () => <MessagesLink navigation={navigation} />,
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={stackFactory}
        initialParams={{
          routeName: Search,
          customConfig: {
            title: "Search",
          },
        }}
      />
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
      <Tab.Screen
        name="Notifications"
        component={stackFactory}
        initialParams={{
          routeName: Notifications,
          customConfig: {
            title: "Notifications",
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={stackFactory}
        initialParams={{
          routeName: Profile,
          customConfig: {
            title: "Profile",
          },
        }}
      />
    </Tab.Navigator>
  );
}

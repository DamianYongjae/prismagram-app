import React from "react";
import { Image } from "react-native";
import { Platform } from "react-native";
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import MessagesLink from "../components/MessagesLink";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import NavIcon from "../components/NavIcon";
import styles from "../styles";
import { stackStyles } from "./config";
import Detail from "../screens/Detail";
import Comment from "../screens/Comments/Comment";
import UserDetail from "../screens/Tabs/UserDetail";

const stackFactory = (initialRoute): JSX.Element => {
  const Stack = createStackNavigator();
  const { name, params } = initialRoute.route;

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          ...stackStyles,
        },
        headerTintColor: styles.blackColor,
      }}
    >
      <Stack.Screen
        name={name}
        component={params.routeName}
        options={params.customConfig}
      />
      <Stack.Screen name="Comment" component={Comment} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="UserDetail" component={UserDetail} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export default function TabNavigation({ navigation }): JSX.Element {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: "#fafafa",
          borderTopColor: styles.darkGreyColor,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={stackFactory}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={Platform.OS === "ios" ? "ios-home" : "md-home"}
            />
          ),
        }}
        initialParams={{
          routeName: Home,
          customConfig: {
            title: "Home",
            headerRight: () => <MessagesLink navigation={navigation} />,
            headerTitle: <NavIcon name="logo-instagram" size={36} />,
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={stackFactory}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={Platform.OS === "ios" ? "ios-search" : "md-search"}
            />
          ),
        }}
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
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={Platform.OS === "ios" ? "ios-add" : "md-add"}
              size={28}
            />
          ),
        }}
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
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={
                Platform.OS === "ios"
                  ? focused
                    ? "ios-heart"
                    : "ios-heart-empty"
                  : focused
                  ? "md-heart"
                  : "md-heart-empty"
              }
            />
          ),
        }}
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
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              name={Platform.OS === "ios" ? "ios-person" : "md-person"}
              focused={focused}
            />
          ),
        }}
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

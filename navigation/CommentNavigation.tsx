import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Comment from "../screens/Comments/Comment";
import { stackStyles } from "./config";
import UserDetail from "../screens/Tabs/UserDetail";

const Stack = createStackNavigator();

export default function CommentNavigation({ route }): JSX.Element {
  const comments: string = route.params.comments;
  const user: string = route.params.user;
  const caption: string = route.params.caption;
  const id: string = route.params.id;
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          ...stackStyles,
        },
      }}
    >
      <Stack.Screen
        name="Comments"
        component={Comment}
        initialParams={{
          comments,
          user,
          caption,
          id,
        }}
      />
      <Stack.Screen name="UserDetail" component={UserDetail} />
    </Stack.Navigator>
  );
}

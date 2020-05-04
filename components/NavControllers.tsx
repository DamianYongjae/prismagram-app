import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useIsLoggedIn, useLogin, useLogOut } from "../AuthContext";
import AuthNavigation from "../navigation/AuthNavigation";
import TabNavigation from "../navigation/TabNavigation";
import MainNavigation from "../navigation/MainNavigation";

export default (): JSX.Element => {
  const isLoggedIn: boolean = useIsLoggedIn();
  const logIn: object = useLogin();
  const logOut: object = useLogOut();
  // const isLoggedIn: boolean = true;
  return (
    <View style={{ flex: 1 }}>
      {isLoggedIn ? (
        <MainNavigation />
      ) : (
        // <TouchableOpacity onPress={logOut}>
        //   <Text>Log Out</Text>
        // </TouchableOpacity>
        <AuthNavigation />
      )}
    </View>
  );
};

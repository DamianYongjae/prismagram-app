import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Text, View, AsyncStorage, TouchableOpacity } from "react-native";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";
import options from "./apollo";
import styles from "./styles";
import { ThemeProvider } from "styled-components";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const preLoad = async (): Promise<void> => {
    try {
      await Font.loadAsync({
        //try to preload font
        ...Ionicons.font,
      });
      await Asset.loadAsync([
        //try to preload assets
        require("./assets/logo.svg"),
        require("./assets/logo_text.png"),
      ]);
      const cache: InMemoryCache = new InMemoryCache(); //create cache to persist cache.
      await persistCache({
        cache,
        storage: AsyncStorage, //like local storage
      });
      const client: ApolloClient<void> = new ApolloClient({
        cache,
        ...options,
      });
      const isLoggedIn: boolean | null = JSON.parse(
        await AsyncStorage.getItem("isLoggedIn")
      );
      if (isLoggedIn === null || isLoggedIn === false) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    preLoad();
  }, []);

  const logUserIn = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    } catch (e) {
      console.log(e);
    }
  };

  const logUserOut = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      setIsLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
  };

  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {isLoggedIn === true ? (
            <TouchableOpacity onPress={logUserOut}>
              <Text>Log Out</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={logUserIn}>
              <Text>Log In</Text>
            </TouchableOpacity>
          )}
        </View>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}

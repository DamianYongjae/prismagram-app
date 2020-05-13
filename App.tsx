import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { AsyncStorage } from "react-native";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";
import options from "./apollo";
import styles from "./styles";
import { ThemeProvider } from "styled-components";
import NavControllers from "./components/NavControllers";
import { AuthProvider } from "./AuthContext";
import { WebSocketLink } from "apollo-link-ws";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
// import { ApolloClient } from "apollo-client";
import { onError } from "apollo-link-error";

export default function App(): JSX.Element {
  const [loaded, setLoaded]: [boolean, Function] = useState(false);
  const [client, setClient]: [ApolloClient<void>, Function] = useState(null);
  const [isLoggedIn, setIsLoggedIn]: [boolean, Function] = useState(null);

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
      // const cache: InMemoryCache = new InMemoryCache(); //create cache to persist cache.
      // await persistCache({
      //   cache,
      //   storage: AsyncStorage, //like local storage. if you refresh data still there.
      // });
      // const httpLink = new HttpLink({
      //   uri: `https://prismagram-backend-damian.herokuapp.com/`,
      // });

      // const wsLink = new WebSocketLink({
      //   uri: `ws://prismagram-backend-damian.herokuapp.com/`,
      //   options: {
      //     reconnect: true,
      //   },
      // });

      // const request = async (operation) => {
      //   // requrest is a function that is going to give us an operation argument will be called every request!!
      //   const token = await AsyncStorage.getItem("jwt");
      //   return operation.setContext({
      //     headers: { Authorization: `Bearer ${token}` },
      //   });
      // };

      // const requestLink = new ApolloLink(
      //   (operation, forward) =>
      //     new Observable((observer) => {
      //       let handle;
      //       Promise.resolve(operation)
      //         .then((oper) => request(oper))
      //         .then(() => {
      //           handle = forward(operation).subscribe({
      //             next: observer.next.bind(observer),
      //             error: observer.error.bind(observer),
      //             complete: observer.complete.bind(observer),
      //           });
      //         })
      //         .catch(observer.error.bind(observer));
      //       return () => {
      //         if (handle) handle.unsubscribe();
      //       };
      //     })
      // );

      // const client = new ApolloClient({
      //   link: ApolloLink.from([
      //     onError(({ graphQLErrors, networkError }) => {
      //       if (graphQLErrors)
      //         graphQLErrors.forEach(({ message, locations, path }) =>
      //           console.log(
      //             `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      //           )
      //         );
      //       if (networkError) console.log(`[Network error]: ${networkError}`);
      //     }),
      //     requestLink,
      //     split(
      //       // split based on operation type
      //       ({ query }) => {
      //         const definition = getMainDefinition(query);
      //         return (
      //           definition.kind === "OperationDefinition" &&
      //           definition.operation === "subscription"
      //         );
      //       },

      //       wsLink,
      //       httpLink
      //     ),
      //   ]),
      //   cache: new InMemoryCache(),
      // });
      const client = new ApolloClient({
        // cache,
        request: async (operation) => {
          // requrest is a function that is going to give us an operation argument will be called every request!!
          const token = await AsyncStorage.getItem("jwt");
          return operation.setContext({
            headers: { Authorization: `Bearer ${token}` },
          });
        },
        ...options,
      });
      const isLoggedIn: boolean = JSON.parse(
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

  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <NavControllers />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}

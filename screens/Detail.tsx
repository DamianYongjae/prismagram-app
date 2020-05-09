import React from "react";
import { View } from "react-native";
import styles from "../styles";
import { POST_FRAGMENT } from "../fragment";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Post from "../components/Post";
import Loader from "../components/Loader";
import { ScrollView } from "react-native";

export const POST_DETAIL = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

export default ({ navigation, route }) => {
  navigation.setOptions({
    headerBackTitleVisible: false,
    headerTintColor: styles.blackColor,
    title: "Photo",
  });

  const { loading, data } = useQuery(POST_DETAIL, {
    variables: { id: route.params.id },
  });

  return (
    <ScrollView style={{ flex: 1 }}>
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.seeFullPost && (
          <Post navigation={navigation} {...data.seeFullPost} />
        )
      )}
    </ScrollView>
  );
};

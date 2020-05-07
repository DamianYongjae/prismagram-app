import React from "react";
import { View } from "react-native";
import styles from "../../styles";
import { USER_FRAGMENT } from "../../fragment";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import UserProfile from "../../components/UserProfile";
import Loader from "../../components/Loader";
import { ScrollView } from "react-native";

const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default ({ navigation, route }) => {
  navigation.setOptions({
    headerBackTitleVisible: false,
    headerTintColor: styles.blackColor,
    title: `${route.params.username}'s profile`,
  });

  const { loading, data } = useQuery(GET_USER, {
    variables: { username: route.params.username },
  });

  return (
    <ScrollView style={{ flex: 1 }}>
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.seeUser && (
          <UserProfile
            key={data.seeUser.id}
            navigation={navigation}
            {...data.seeUser}
          />
        )
      )}
    </ScrollView>
  );
};

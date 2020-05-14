import React, { useEffect } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../../fragment";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import UserProfile from "../../components/UserProfile";

const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default ({ navigation }) => {
  const { loading, data } = useQuery(ME);

  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.me && (
          <UserProfile key={data.me.id} navigation={navigation} {...data.me} />
        )
      )}
    </ScrollView>
  );
};

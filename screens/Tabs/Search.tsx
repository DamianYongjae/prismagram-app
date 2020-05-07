import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar";
import useInput, { useInputProps } from "../../hooks/useInput";
import { useQuery } from "react-apollo-hooks";
import { ScrollView, RefreshControl } from "react-native";
import Loader from "../../components/Loader";
import { gql } from "apollo-boost";
import SquarePhoto from "../../components/SquarePhoto";

export const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      files {
        id
        url
      }
      likeCount
      commentCount
    }
    searchUser(term: $term) {
      id
      avatar
      username
      isFollowing
      isSelf
    }
  }
`;

export default ({ navigation }) => {
  const input = useInput("");
  const [term, setTerm]: [string, Function] = useState("");
  const [refreshing, setRefreshing]: [boolean, Function] = useState(false);

  const { data, loading, refetch } = useQuery(SEARCH, {
    variables: {
      term,
    },
    skip: term === "",
    fetchPolicy: "network-only",
  });

  const onRefresh = async (): Promise<void> => {
    try {
      setRefreshing(true);
      refetch({ variables: { term } });
    } catch (e) {
    } finally {
      setRefreshing(false);
    }
  };

  const onSubmit = (): void => {
    setTerm(input.value);
    input.setValue("");
  };

  navigation.setOptions({
    headerTitle: () => (
      <SearchBar
        value={input.value}
        onChange={input.onChange}
        onSubmit={onSubmit}
      />
    ),
  });
  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "row",
        flexWrap: "wrap",
      }}
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    >
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.searchPost &&
        data.searchPost.map((post) => (
          <SquarePhoto navigation={navigation} key={post.id} {...post} />
        ))
      )}
    </ScrollView>
  );
};

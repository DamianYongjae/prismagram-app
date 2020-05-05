import React, { useState } from "react";
import styled from "styled-components";
import { ScrollView, RefreshControl } from "react-native";
import Loader from "../../components/Loader";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Post from "../../components/Post";

export const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      commentCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;

export default ({ navigation }): JSX.Element => {
  const [refreshing, setRefreshing]: [boolean, Function] = useState(false);
  const { loading, data, refetch } = useQuery(FEED_QUERY);
  const refresh = async (): Promise<void> => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  console.log(data);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.seeFeed &&
        data.seeFeed.map((post) => (
          <Post navigation={navigation} key={post.id} {...post} />
        ))
      )}
    </ScrollView>
  );
};

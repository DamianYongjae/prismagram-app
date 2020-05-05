import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { Image, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";
import Swiper from "react-native-swiper";
import constants from "../screens/constants";
import styles from "../styles";
import { gql } from "apollo-boost";
import CommentNavigation from "../navigation/CommentNavigation";

const LIKE_POST = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

type userProp = {
  id: string;
  avatar?: string;
  username: string;
};

type filesProp = {
  id: string;
  url: string;
  map: Function;
};

type commentsProp = {
  id: string;
  text: string;
  user: userProp;
};

type PostProp = {
  id: string;
  user: userProp;
  files: filesProp;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  location: string;
  caption: string;
  comments: commentsProp;
};

const Container = styled.View``;

const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;

const Touchable = styled.TouchableOpacity``;
const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;

const Bold = styled.Text`
  font-weight: 500;
`;

const Location = styled.Text`
  font-size: 12px;
`;

const IconsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;

const IconContainer = styled.View`
  margin-right: 10px;
`;

const InfoContainer = styled.View`
  padding: 10px;
`;

const Caption = styled.Text`
  margin-top: 3px;
`;

const CommentCount = styled.Text`
  margin-top: 5px;
  opacity: 0.5;
  font-size: 13px;
`;

const Post = ({
  id,
  user,
  location,
  files,
  likeCount: likeCountProp,
  caption,
  comments,
  commentCount,
  isLiked: isLikedProp,
  navigation,
}: PostProp): JSX.Element => {
  const [isLiked, setIsLiked]: [boolean, Function] = useState(isLikedProp);
  const [likeCount, setLikeCount]: [number, Function] = useState(likeCountProp);
  const [toggleLikeMutation] = useMutation(LIKE_POST, {
    variables: {
      postId: id,
    },
  });
  const handleLike = async (): Promise<void> => {
    if (isLiked === true) {
      setLikeCount((l) => l - 1);
    } else {
      setLikeCount((l) => l + 1);
    }
    setIsLiked((p) => !p);
    try {
      await toggleLikeMutation();
    } catch (e) {}
  };
  return (
    <Container>
      <Header>
        <Touchable>
          <Image
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={{ uri: user.avatar }}
          />
        </Touchable>
        <Touchable>
          <HeaderUserContainer>
            <Bold>{user.username}</Bold>
            <Location>{location}</Location>
          </HeaderUserContainer>
        </Touchable>
      </Header>
      <Swiper
        showsPagination={false}
        autoplay
        style={{ height: constants.height / 2.5 }}
      >
        {files &&
          files.map((file) => (
            <Image
              style={{ width: constants.width, height: constants.height / 2.5 }}
              key={file.id}
              source={{ uri: file.url }}
            />
          ))}
      </Swiper>
      <InfoContainer>
        <IconsContainer>
          <Touchable onPress={handleLike}>
            <IconContainer>
              <Ionicons
                size={28}
                color={isLiked ? styles.redColor : styles.blackColor}
                name={
                  Platform.OS === "ios"
                    ? isLiked
                      ? "ios-heart"
                      : "ios-heart-empty"
                    : isLiked
                    ? "md-heart"
                    : "md-heart-empty"
                }
              />
            </IconContainer>
          </Touchable>
          <Touchable>
            <IconContainer>
              <Ionicons
                size={28}
                color={styles.blackColor}
                name={Platform.OS === "ios" ? "ios-text" : "md-text"}
              />
            </IconContainer>
          </Touchable>
        </IconsContainer>
        <Touchable>
          <Bold>{likeCount === 1 ? "1 like" : `${likeCount} likes`}</Bold>
        </Touchable>
        <Caption>
          <Bold>{user.username}</Bold> {caption}
        </Caption>
        <Touchable
          onPress={() =>
            navigation.navigate("CommentNavigation", {
              comments,
              user,
              caption,
            })
          }
        >
          <CommentCount>See all {commentCount} comments</CommentCount>
        </Touchable>
      </InfoContainer>
    </Container>
  );
};

export default Post;

import React, { useState } from "react";
import { Image, View, TouchableOpacity, Platform } from "react-native";
import styled from "styled-components";
import styles from "../styles";
import { Ionicons } from "@expo/vector-icons";
import constants from "../screens/constants";
import Post from "../components/Post";
import SquarePhoto from "../components/SquarePhoto";

const ProfileHeader = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const HeaderColumn = styled.View``;

const ProfileStats = styled.View`
  flex-direction: row;
`;

const Stat = styled.View`
  align-items: center;
  margin-left: 40px;
`;

const Bold = styled.Text`
  font-weight: 600;
`;

const StatName = styled.Text`
  margin-top: 5px;
  font-size: 12px;
  color: ${styles.darkGreyColor};
`;

const ProfileMeta = styled.View`
  margin-top: 20px;
  padding-horizontal: 20px;
`;

const Bio = styled.Text``;

const ButtonContainer = styled.View`
  padding-vertical: 5px;
  flex-direction: row;
  margin-top: 30px;
  border: 1px solid ${styles.lightGreyColor};
`;

const Button = styled.View`
  width: ${constants.width / 2}px;
  align-items: center;
`;

type UserProfileProps = {
  avatar: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  bio: string;
  fullName: string;
  posts?;
  navigation?;
};

const UserProfile = ({
  avatar,
  postsCount,
  followersCount,
  followingCount,
  bio,
  fullName,
  posts,
  navigation,
}: UserProfileProps) => {
  const [isGrid, setIsGrid]: [boolean, Function] = useState(true);
  const toggleGrid = () => {
    setIsGrid(!isGrid);
  };
  return (
    <View>
      <ProfileHeader>
        <Image
          style={{ height: 80, width: 80, borderRadius: 40 }}
          source={{ uri: avatar }}
        />
        <HeaderColumn>
          <ProfileStats>
            <Stat>
              <Bold>{postsCount}</Bold>
              <StatName>Posts</StatName>
            </Stat>
            <Stat>
              <Bold>{followersCount}</Bold>
              <StatName>Followers</StatName>
            </Stat>
            <Stat>
              <Bold>{followingCount}</Bold>
              <StatName>Followings</StatName>
            </Stat>
          </ProfileStats>
        </HeaderColumn>
      </ProfileHeader>
      <ProfileMeta>
        <Bold>{fullName}</Bold>
        <Bio>{bio}</Bio>
      </ProfileMeta>
      <ButtonContainer>
        <TouchableOpacity onPress={toggleGrid}>
          <Button>
            <Ionicons
              color={isGrid ? styles.blackColor : styles.darkGreyColor}
              size={32}
              name={Platform.OS === "ios" ? "ios-grid" : "md-grid"}
            />
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleGrid}>
          <Button>
            <Ionicons
              color={!isGrid ? styles.blackColor : styles.darkGreyColor}
              size={32}
              name={Platform.OS === "ios" ? "ios-list" : "md-list"}
            />
          </Button>
        </TouchableOpacity>
      </ButtonContainer>
      <View
        style={{
          flexDirection: `${isGrid ? "row" : "column"}`,
          width: constants.width,
          flexWrap: "wrap",
        }}
      >
        {posts &&
          posts.map((post) =>
            isGrid ? (
              <SquarePhoto navigation={navigation} key={post.id} {...post} />
            ) : (
              <Post navigation={navigation} key={post.id} {...post} />
            )
          )}
      </View>
    </View>
  );
};

export default UserProfile;

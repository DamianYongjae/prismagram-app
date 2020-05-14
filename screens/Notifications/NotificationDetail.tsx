import React from "react";
import styled from "styled-components";

const Container = styled.ScrollView`
  flex: 1;
  width: 100%;
  height: 100%;
`;

const NotiContainer = styled.View`
  padding: 10px 10px;
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InfoContainer = styled.View`
  flex-direction: row;
  width: 90%;
  height: 50px;
  align-items: center;
`;

const Avatar = styled.Image`
  width: 25px;
  height: 25px;
  border-radius: 5px;
`;

const Username = styled.Text`
  margin-left: 10px;
  font-weight: 600;
  color: ${(props) => props.theme.blueColor};
`;

const Content = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 14px;
`;

const Time = styled.Text`
  font-size: 10px;
  margin-left: 5px;
  color: ${(props) => props.theme.darkGreyColor};
`;

const PostImage = styled.View`
  width: 30px;
  height: 30px;
`;

const Image = styled.Image`
  width: 30px;
  height: 30px;
`;

const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const NotificationDetail = ({
  posts,
  username,
  compare,
  getTimeDiff,
  navigation,
}) => {
  const commentList = [];
  const likeList = [];

  posts.map((post) => {
    post.comments.map((comment) => {
      return commentList.push(comment);
    });
    post.likes.map((like) => {
      return likeList.push(like);
    });
    return true;
  });

  let notiList = commentList.concat(likeList).sort(compare);
  const now = new Date();
  const notiLimitDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 30,
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
    now.getMilliseconds()
  );

  notiList = notiList.filter(
    (list) =>
      list.user.username !== username &&
      list.createdAt > notiLimitDate.toISOString()
  );

  return (
    <Container
      contentContainterStyle={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {notiList.map((list) => (
        <NotiContainer key={list.post.id + list.createdAt}>
          <InfoContainer>
            <Touchable
              onPress={() =>
                navigation.navigate("UserDetail", {
                  username: list.user.username,
                })
              }
            >
              <Avatar
                key={list.user.avatar}
                source={{ uri: list.user.avatar }}
              ></Avatar>
              <Username key={list.user.username}>{list.user.username}</Username>
            </Touchable>
            <Content>
              <Text key={list.post.id + list.createdAt + list.username}>
                {list.__typename === "Comment"
                  ? " left comment on your post"
                  : " liked your post"}
              </Text>
              <Time key={list.createdAt}>
                {getTimeDiff(new Date(list.createdAt), new Date())}
              </Time>
            </Content>
          </InfoContainer>
          <PostImage>
            <Touchable
              onPress={() =>
                navigation.navigate("Detail", { id: list.post.id })
              }
            >
              <Image source={{ uri: list.post.files[0].url }} />
            </Touchable>
          </PostImage>
        </NotiContainer>
      ))}
    </Container>
  );
};

export default NotificationDetail;

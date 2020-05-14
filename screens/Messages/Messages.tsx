import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../components/Loader";

export const SEE_ROOMS = gql`
  {
    seeRooms {
      id
      participants {
        id
        username
        avatar
      }
      updatedAt
      message {
        text
        from {
          username
          avatar
        }
        createdAt
      }
    }
    me {
      username
    }
  }
`;

const Container = styled.ScrollView`
  flex: 1;
  margin-top: 10px;
`;

const Room = styled.TouchableOpacity`
  height: 60px;
  width: 100%;
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 10px;
`;

const InfoContainer = styled.View``;

const User = styled.Text`
  font-weight: 600;
`;
const Message = styled.Text``;

export default ({ navigation }) => {
  const { data, loading } = useQuery(SEE_ROOMS, { fetchPolicy: "no-cache" });

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.seeRooms &&
        data.me &&
        data.seeRooms.map((list) => (
          <Room
            key={list.id}
            onPress={() =>
              navigation.navigate("Message", {
                id: list.id,
                myUsername: data.me.username,
                participants: list.participants,
                message: list.message,
              })
            }
          >
            <Avatar
              key={
                list.participants.filter(
                  (user) => user.username !== data.me.username
                )[0].avatar
              }
              source={{
                uri: list.participants.filter(
                  (user) => user.username !== data.me.username
                )[0].avatar,
              }}
            />
            <InfoContainer
              key={
                list.participants.filter(
                  (user) => user.username !== data.me.username
                )[0].username
              }
            >
              <User>
                {
                  list.participants.filter(
                    (user) => user.username !== data.me.username
                  )[0].username
                }
              </User>
              <Message>{list.message[list.message.length - 1].text}</Message>
            </InfoContainer>
          </Room>
        ))
      )}
    </Container>
  );
};

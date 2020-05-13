import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../components/Loader";
import Message from "./Message";

const SEE_ROOMS = gql`
  {
    seeRooms {
      id
      participants {
        username
        avatar
      }
      updatedAt
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

export default ({ navigation }) => {
  const { data, loading } = useQuery(SEE_ROOMS);

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
            onPress={() =>
              navigation.navigate("Message", {
                id: list.id,
                myUsername: data.me.username,
              })
            }
          >
            <Avatar
              source={{
                uri: list.participants.filter(
                  (user) => user.username !== data.me.username
                )[0].avatar,
              }}
            ></Avatar>
            <InfoContainer>
              <User>
                {
                  list.participants.filter(
                    (user) => user.username !== data.me.username
                  )[0].username
                }
              </User>
            </InfoContainer>
          </Room>
        ))
      )}
    </Container>
  );
};

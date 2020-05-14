import React, { useState, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery, useSubscription, useMutation } from "react-apollo-hooks";
import { KeyboardAvoidingView } from "react-native";
import Loader from "../../components/Loader";
import withSuspense from "../../WithSuspense";
import { SEE_ROOMS } from "./Messages";

const SEE_ROOM = gql`
  query seeRoom($id: String!) {
    seeRoom(id: $id) {
      id
      participants {
        username
        avatar
      }
      createdAt
      updatedAt
      message {
        id
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

const NEW_MESSAGE = gql`
  subscription newMessage($roomId: String!) {
    newMessage(roomId: $roomId) {
      id
      text
      from {
        username
        avatar
      }
      createdAt
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage($roomId: String, $message: String, $toId: String) {
    sendMessage(roomId: $roomId, message: $message, toId: $toId) {
      id
    }
  }
`;

const Container = styled.ScrollView``;

const ChatContainer = styled.View`
  width: 100%;
  flex: 1;
  padding: 10px;
  flex-direction: column;
  margin-top: 10px;
  justify-content: flex-start;
`;

const ChatLine = styled.View`
  flex-direction: row;
  height: 40px;
  align-items: center;
  margin-bottom: 30px;
`;

const Avatar = styled.Image`
  width: 30px;
  height: 30px;
`;

const User = styled.Text`
  padding-left: 15px;
`;

const Text = styled.Text`
  margin-left: 5px;
  color: white;
`;

const Time = styled.Text``;

const Bubble = styled.View`
  max-width: 280px;
`;

const Arrow = styled.View`
  height: 0;
  width: 0;
  border-left-width: 8px;
  border-left-color: transparent;
  border-right-width: 8px;
  border-right-color: ${(props) => props.theme.blueColor};
  border-bottom-width: 8px;
  border-bottom-color: transparent;
  border-top-width: 8px;
  border-top-color: transparent;
`;

const TextBox = styled.View`
  border-radius: 10px;
  background-color: ${(props) => props.theme.blueColor};
  padding: 10px;
`;

const TextInput = styled.TextInput`
  width: 90%;
  border-radius: 10px;
  margin-bottom: 30px;
  padding-left: 20px;
  background-color: #f2f2f2;
  border-width: 1px;
  padding: 10px;
  align-self: center;
  border-color: ${(props) => props.theme.darkGreyColor};
`;

export default function Message({ route, navigation }) {
  const roomId = route.params.id;
  const myUsername = route.params.myUsername;
  const toId = route.params.participants.filter(
    (user) => user.username !== myUsername
  )[0].id;
  let oldMessage = route.params.message;

  const [message, setMessage] = useState("");
  const { data: roomData, loading } = useQuery(SEE_ROOM, {
    variables: {
      id: roomId,
    },
    fetchPolicy: "no-cache",
    // suspend: true,
  });

  if (roomData !== undefined) {
    oldMessage = roomData.message;
  }

  const { data } = useSubscription(NEW_MESSAGE, { variables: { roomId } });
  const [messages, setMessages] = useState(oldMessage || []);

  const handleNewMessage = () => {
    if (data !== undefined) {
      console.log(data);
      const { newMessage } = data;
      setMessages((previous) => [...previous, newMessage]);
    }
  };
  useEffect(() => {
    handleNewMessage();
  }, [data]);

  const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
    variables: {
      roomId: roomId,
      message: message,
      toId: toId,
    },
    refetchQueries: () => [{ query: SEE_ROOM }],
  });
  const onChangeText = (text) => setMessage(text);

  const onSubmit = async () => {
    if (message === "") {
      return;
    }
    try {
      await sendMessageMutation();

      setMessage("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      enabled
      behavior="padding"
      keyboardVerticalOffset={90}
    >
      <Container
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <ChatContainer>
          {loading ? (
            <Loader />
          ) : (
            // data &&
            // data.seeRoom &&
            // message &&
            messages.map((m) =>
              m.from.username === myUsername ? (
                <ChatLine key={m.id + m.text} style={{ alignSelf: "flex-end" }}>
                  <Bubble
                    style={{
                      paddingRight: 5,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextBox>
                      <Text>{m.text}</Text>
                    </TextBox>
                    <Arrow
                      style={{
                        marginLeft: -1,
                        borderLeftColor: "#3897f0",
                        borderRightColor: "transparent",
                      }}
                    ></Arrow>
                  </Bubble>
                  {/* <Time>{m.createdAt}</Time> */}
                </ChatLine>
              ) : (
                <ChatLine key={m.id + m.text}>
                  <Avatar source={{ uri: m.from.avatar }} />
                  <Bubble style={{ paddingLeft: 5 }}>
                    <User>{m.from.username}</User>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Arrow style={{ marginLeft: -3 }}></Arrow>
                      <TextBox style={{ flexDirection: "row" }}>
                        <Text>{m.text}</Text>
                      </TextBox>
                    </View>
                  </Bubble>
                  {/* <Time>{m.createdAt}</Time> */}
                </ChatLine>
              )
            )
          )}
        </ChatContainer>
      </Container>
      <TextInput
        placeholder={"Type a message"}
        returnKeyType="send"
        value={message}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
    </KeyboardAvoidingView>
  );
}

// export default withSuspense(Message);

import React from "react";
import styled from "styled-components";
import {
  Image,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  View,
} from "react-native";
import styles from "../../styles";
import constants from "../constants";
import useInput, { useInputProps } from "../../hooks/useInput";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.SafeAreaView`
  flex: 1;
  width: ${constants.width}px;
  flex-direction: column;
  justify-content: flex-end;
`;

const CaptionContainer = styled.View`
  flex-direction: row;
  height: 70px;
  align-items: center;
  padding-left: 10px;
  border-bottom-color: ${styles.lightGreyColor};
  border-bottom-width: 1px;
`;

const CommentsContainer = styled.View`
  flex-direction: column;
`;

const CommentInputContainer = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.greyColor};
  align-items: center;
  padding-left: 10px;
  z-index: 1;
`;

const CommentContainer = styled.View`
  flex-direction: row;
  height: 70px;
  align-items: center;
  padding-left: 10px;
`;

const Touchable = styled.TouchableOpacity``;

const Id = styled.Text`
  font-weight: 500;
  padding-left: 5px;
`;

const Text = styled.Text`
  padding-left: 5px;
`;

const PostButton = styled.Text`
  color: ${(props) => props.theme.blueColor};
  opacity: 0.5;
  margin-right: 10px;
`;

const CommentInput = styled.TextInput`
  width: ${constants.width - 70}px;
  height: 50px;
  background-color: ${(props) => props.theme.greyColor};
  padding: 10px;
  border: none;
`;

export default ({ route }) => {
  const commentInput: useInputProps = useInput("");
  const datas = route.params;
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <CaptionContainer>
          <Image
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={{ uri: datas.user.avatar }}
          />
          <Touchable>
            <Id>{datas.user.username}</Id>
          </Touchable>
          <Text> {datas.caption}</Text>
        </CaptionContainer>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={90}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <ScrollView>
              <CommentsContainer>
                {datas &&
                  datas.comments &&
                  datas.comments.map((data) => {
                    return (
                      <CommentContainer key={data.id}>
                        <Touchable>
                          <Id>{data.user.username}</Id>
                        </Touchable>
                        <Text> {data.text.trim()}</Text>
                      </CommentContainer>
                    );
                  })}
              </CommentsContainer>
            </ScrollView>

            <CommentInputContainer>
              <Ionicons
                name={
                  Platform.OS === "ios" ? "ios-paper-plane" : "md-paper-plane"
                }
                style={{ color: styles.lightGreyColor }}
                size={24}
              />

              <CommentInput
                keyboardType="default"
                placeholder="Add a Comment"
                autoCapitalize="words"
                autoCorrect={false}
              />

              <Touchable>
                <PostButton>Post</PostButton>
              </Touchable>
            </CommentInputContainer>
          </View>
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
};

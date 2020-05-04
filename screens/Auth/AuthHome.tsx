import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styled from "styled-components";
import constants from "../constants";
import AuthButton from "../../components/AuthButton";

const Aview = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Image = styled.Image`
  width: ${constants.width / 2.5}px;
  margin-bottom: 0px;
`;

const Touchable = styled.TouchableOpacity``;

const SignUpBtn = styled.View`
  background-color: ${(props) => props.theme.blueColor};
  padding: 10px;
  margin: 0px 50px;
  border-radius: 4px;
  width: ${constants.width / 2}px;
  margin-bottom: 25px;
`;

const SignUpBtnText = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;

const LoginLink = styled.View``;
const LoginLinkText = styled.Text`
  color: ${(props) => props.theme.blueColor};
  margin-top: 20px;
`;

export default ({ navigation }) => (
  <Aview>
    <Image
      resizeMode={"contain"}
      source={require("../../assets/logo_text.png")}
    />
    <AuthButton
      text={"Create New Account"}
      onPress={() => navigation.navigate("Signup")}
    />
    <Touchable onPress={() => navigation.navigate("Login")}>
      <LoginLink>
        <LoginLinkText>Log in </LoginLinkText>
      </LoginLink>
    </Touchable>
  </Aview>
);

import React from "react";
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

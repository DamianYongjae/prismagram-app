import React from "react";
import styled from "styled-components";
import constants from "../screens/constants";

const Touchable = styled.TouchableOpacity``;
const Container = styled.View`
  background-color: ${(props) => props.theme.blueColor};
  padding: 10px;
  margin: 0px 50px;
  border-radius: 4px;
  width: ${constants.width / 2}px;
`;
const Text = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;

type ButtonProps = {
  text: string;
  onPress: Function;
};

const AuthButton = ({ text, onPress }: ButtonProps) => (
  <Touchable onPress={onPress}>
    <Container>
      <Text>{text}</Text>
    </Container>
  </Touchable>
);

export default AuthButton;

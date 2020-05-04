import React from "react";
import styled from "styled-components";
import constants from "../screens/constants";
import { ActivityIndicator } from "react-native";

const Touchable = styled.TouchableOpacity``;
const Container = styled.View`
  background-color: ${(props) => props.theme.blueColor};
  padding: 10px;
  margin: 0px 50px;
  border-radius: 4px;
  width: ${constants.width / 1.7}px;
`;
const Text = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;

type ButtonProps = {
  text: string;
  onPress: Function;
  loading: boolean;
};

const AuthButton = ({
  text,
  onPress,
  loading = false,
}: ButtonProps): JSX.Element => (
  <Touchable disabled={loading} onPress={onPress}>
    <Container>
      {loading ? <ActivityIndicator color={"white"} /> : <Text>{text}</Text>}
    </Container>
  </Touchable>
);

export default AuthButton;

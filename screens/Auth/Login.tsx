import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default () => {
  const emailInput = useInput("");
  const handleLogin = () => {};
  return (
    <View>
      <AuthInput
        {...emailInput}
        keyboardType={"email-address"}
        placeholder={"Email"}
      />
      <AuthButton onPress={() => null} text={"Log In"} />
    </View>
  );
};

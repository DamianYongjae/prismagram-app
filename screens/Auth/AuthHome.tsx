import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styled from "styled-components";

const Aview = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default ({ navigation }) => (
  <Aview>
    <Text>Auth Home</Text>
    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
      <Text>Go to Login</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
      <Text>Go to Signup</Text>
    </TouchableOpacity>
  </Aview>
);

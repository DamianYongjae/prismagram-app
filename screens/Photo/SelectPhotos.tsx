import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styled from "styled-components";

const Aview = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default () => (
  <Aview>
    <Text>Select Photo</Text>
  </Aview>
);
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styled from "styled-components";

const Aview = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default ({ navigation }): JSX.Element => (
  <Aview>
    <TouchableOpacity onPress={() => navigation.navigate("UploadPhoto")}>
      <Text>Take Photo</Text>
    </TouchableOpacity>
  </Aview>
);

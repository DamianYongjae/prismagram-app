import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styled from "styled-components";
import Loader from "../../components/Loader";

const Aview = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default (): JSX.Element => (
  <Aview name="Home">
    <Loader />
  </Aview>
);

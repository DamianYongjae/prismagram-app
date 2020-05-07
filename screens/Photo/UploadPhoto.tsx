import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styled from "styled-components";

const Aview = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default ({ navigation, route }) => {
  console.log(route.params.photo);

  navigation.setOptions({
    headerTitle: "Upload",
  });

  return (
    <Aview>
      <Image
        style={{ width: 100, height: 100 }}
        source={{ uri: route.params.photo.uri }}
      />
    </Aview>
  );
};

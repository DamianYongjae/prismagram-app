import React from "react";
import styled from "styled-components";
import { Text, View, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { useNavigation } from "@react-navigation/native";

const Container = styled.TouchableOpacity``;

const Atext = styled.Text``;

export default withNavigation(({ navigation }) => (
  <Container onPress={() => navigation.navigate("MessageNavigation")}>
    <Atext>Messages</Atext>
  </Container>
));

// export default function MessagesLink() {
//   const navigation = useNavigation();

//   return (
//     <Container onPress={() => navigation.navigate("MessageNavigation")}>
//       <Atext>Messages</Atext>
//     </Container>
//   );
// }

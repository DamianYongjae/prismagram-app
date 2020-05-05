import React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import styles from "../styles";
import NavIcon from "./NavIcon";

const Container = styled.TouchableOpacity`
  padding-right: 20px;
`;

export default withNavigation(
  ({ navigation }): JSX.Element => (
    <Container onPress={() => navigation.navigate("MessageNavigation")}>
      <NavIcon
        name={Platform.OS === "ios" ? "ios-paper-plane" : "md-paper-plane"}
      />
    </Container>
  )
);

// export default function MessagesLink() {
//   const navigation = useNavigation();

//   return (
//     <Container onPress={() => navigation.navigate("MessageNavigation")}>
//       <Atext>Messages</Atext>
//     </Container>
//   );
// }

import React, { useState } from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import { useMutation } from "react-apollo-hooks";
import { Platform } from "react-native";
import styles from "../styles";
import NavIcon from "./NavIcon";
import { useLogOut } from "../AuthContext";

const Container = styled.TouchableOpacity`
  padding-right: 20px;
`;

export default withNavigation(
  ({ navigation }): JSX.Element => {
    return (
      <Container onPress={useLogOut()}>
        <NavIcon
          name={Platform.OS === "ios" ? "ios-log-out" : "md-log-out"}
          color={styles.darkGreyColor}
          size={25}
        />
      </Container>
    );
  }
);

// export default function MessagesLink() {
//   const navigation = useNavigation();

//   return (
//     <Container onPress={() => navigation.navigate("MessageNavigation")}>
//       <Atext>Messages</Atext>
//     </Container>
//   );
// }

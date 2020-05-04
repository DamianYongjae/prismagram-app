import React from "react";
import styled from "styled-components";
import constants from "../screens/constants";

const Container = styled.View`
  margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
  width: ${constants.width / 2}px;
  background-color: ${(props) => props.theme.greyColor};
  padding: 10px;
  border: 1px solid ${(props) => props.theme.lightGreyColor};
  border-radius: 4px;
`;

type InputProps = {
  placeholder: string;
  value: string;
  keyboardType:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad";
  autoCapitalize: "none" | "sentences" | "words" | "characters";
  onChange: Function;
};

const AuthInput = ({
  placeholder,
  value,
  keyboardType = "default",
  autoCapitalize,
  onChange,
}: InputProps): JSX.Element => (
  <Container>
    <TextInput
      onChangeText={onChange}
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      placeholder={placeholder}
      value={value}
    />
  </Container>
);

export default AuthInput;

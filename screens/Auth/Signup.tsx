import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput, { useInputProps } from "../../hooks/useInput";
import { Alert } from "react-native";
import { CREATE_ACCOUNT } from "../Auth/AuthQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default ({ route, navigation }) => {
  const fNameInput: useInputProps = useInput("");
  const lNameInput: useInputProps = useInput("");
  const usernameInput: useInputProps = useInput("");
  let passedEmail: string =
    typeof route.params === "undefined" ? "" : route.params.email;

  const emailInput: useInputProps = useInput(passedEmail);
  const [loading, setLoading]: [boolean, Function] = useState(false);

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: usernameInput.value,
      email: emailInput.value,
      firstName: fNameInput.value,
      lastName: lNameInput.value,
    },
  });

  const handleSignup = async (): Promise<void> => {
    const { value: email }: useInputProps = emailInput;
    const { value: fName }: useInputProps = fNameInput;
    const { value: lName }: useInputProps = lNameInput;
    const { value: username }: useInputProps = usernameInput;
    const emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(email)) {
      return Alert.alert("That email is invalid");
    }
    if (fName === "") {
      return Alert.alert("I need your name");
    }
    if (username === "") {
      return Alert.alert("Invalid username");
    }

    try {
      setLoading(true);
      const {
        data: { createAccount },
      } = await createAccountMutation();
      if (createAccount) {
        Alert.alert("Account created", "Log in now!");
        navigation.navigate("Login", { email });
      }
    } catch (e) {
      Alert.alert("Username taken.", "Log in instead");
      navigation.navigate("Login", { email });
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...fNameInput}
          keyboardType="default"
          placeholder="First name"
          autoCapitalize="words"
          autoCorrect={false}
        />
        <AuthInput
          {...lNameInput}
          keyboardType="default"
          placeholder="Last name"
          autoCapitalize="words"
          autoCorrect={false}
        />

        <AuthInput
          {...emailInput}
          keyboardType="email-address"
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <AuthInput
          {...usernameInput}
          keyboardType="default"
          placeholder="Username"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <AuthButton loading={loading} onPress={handleSignup} text="Sign Up" />
      </View>
    </TouchableWithoutFeedback>
  );
};

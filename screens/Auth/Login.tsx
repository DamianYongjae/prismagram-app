import React, { useState } from "react";
import { useMutation, MutationFn } from "react-apollo-hooks";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput, { useInputProps } from "../../hooks/useInput";
import { Alert } from "react-native";
import { LOG_IN } from "../Auth/AuthQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default ({ navigation }) => {
  const emailInput: useInputProps = useInput("");
  const [loading, setLoading]: [boolean, Function] = useState(false);

  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: emailInput.value },
  });

  const handleLogin = async (): Promise<void> => {
    const { value }: useInputProps = emailInput;
    const emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (value === "") {
      return Alert.alert("Email can't be empty");
    } else if (!value.includes("@") || !value.includes(".")) {
      return Alert.alert("Please input an email");
    } else if (!emailRegex.test(value)) {
      return Alert.alert("That email is invalid");
    }
    try {
      setLoading(true);
      const {
        data: { requestSecret },
      } = await requestSecretMutation();
      if (requestSecret) {
        Alert.alert("check your email");
        navigation.navigate("Confirm", { email: value });
        return;
      } else {
        Alert.alert("Account Not found");
        navigation.navigate("Signup", { email: value });
      }
    } catch (e) {
      Alert.alert("Can't login");
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...emailInput}
          keyboardType="email-address"
          placeholder="Email"
          returnKeyType="send"
          autoCapitalize="none"
          onSubmitEditing={handleLogin}
          autoCorrect={false}
        />
        <AuthButton loading={loading} onPress={handleLogin} text={"Log In"} />
      </View>
    </TouchableWithoutFeedback>
  );
};

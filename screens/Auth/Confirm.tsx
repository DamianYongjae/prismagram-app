import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput, { useInputProps } from "../../hooks/useInput";
import { Alert } from "react-native";
import { CONFIRM_SECRET } from "../Auth/AuthQueries";
import { useLogin } from "../../AuthContext";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

type secretDataProp = {
  data: Promise<dataProp>;
};
type dataProp = {
  confirmSecret: string;
};

export default ({ route }) => {
  const confirmInput: useInputProps = useInput("");
  const logIn: object = useLogin();
  const [loading, setLoading]: [boolean, Function] = useState(false);
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      secret: confirmInput.value,
      email: route.params.email,
    },
  });

  const handleConfirm = async (): Promise<void> => {
    const { value }: useInputProps = confirmInput;
    if (value === "" || !value.includes(" ")) {
      return Alert.alert("Invalid secret");
    }

    try {
      setLoading(true);
      const {
        data: { confirmSecret },
      } = await confirmSecretMutation();
      if (confirmSecret !== "" || confirmSecret !== false) {
        logIn;
      } else {
        Alert.alert("Wrong secret");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Can't confirm secret");
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...confirmInput}
          placeholder="Secret"
          returnKeyType="send"
          autoCapitalize="none"
          onSubmitEditing={handleConfirm}
          autoCorrect={false}
        />
        <AuthButton
          loading={loading}
          onPress={handleConfirm}
          text={"Confirm"}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput, { useInputProps } from "../../hooks/useInput";
import { Alert } from "react-native";
import { CREATE_ACCOUNT } from "../Auth/AuthQueries";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const FBContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.lightGreyColor};
  border-style: solid;
`;

type userInfoProp = {
  email: string;
  first_name: string;
  last_name: string;
};

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

  const fbLogin = async (): Promise<void> => {
    try {
      setLoading(true);
      await Facebook.initializeAsync("243703263536448");
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`
        );
        const {
          email,
          first_name,
          last_name,
        }: userInfoProp = await response.json();
        updateFormData(email, first_name, last_name);

        setLoading(false);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  const googleLogin = async (): Promise<void> => {
    const GOOGLE_ID: string =
      "471684211889-efcrqgi12p4spem8ju71db4iduni1d65.apps.googleusercontent.com";
    try {
      setLoading(true);
      const result = await Google.logInAsync({
        iosClientId: GOOGLE_ID,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        const user = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: { Authorization: `Bearer ${result.accessToken}` },
        });
        const {
          email,
          family_name: last_name,
          given_name: first_name,
        }: {
          email: string;
          family_name: string;
          given_name: string;
        } = await user.json();
        updateFormData(email, first_name, last_name);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (
    email: string,
    first_name: string,
    last_name: string
  ): void => {
    emailInput.setValue(email);
    fNameInput.setValue(first_name);
    lNameInput.setValue(last_name);
    const username: string = email.split("@")[0];
    usernameInput.setValue(username);
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
        <FBContainer>
          <AuthButton
            bgColor={"#2D4DA7"}
            loading={false}
            onPress={fbLogin}
            text="Connect Facebook"
          />
          <AuthButton
            bgColor={"#ee1922"}
            loading={false}
            onPress={googleLogin}
            text="Connect Google"
          />
        </FBContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};

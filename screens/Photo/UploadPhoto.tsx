import React, { useState } from "react";
import axios from "axios";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import styles from "../../styles";
import constants from "../constants";
import { Alert } from "react-native";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import { ActivityIndicator } from "react-native";
import { FEED_QUERY } from "../Tabs/Home";

const UPLOAD = gql`
  mutation upload($caption: String!, $files: [String!]!, $location: String!) {
    upload(caption: $caption, files: $files, location: $location) {
      id
      caption
      location
    }
  }
`;

const Aview = styled.View`
  padding: 20px;
  flex: 1;
  flex-direction: row;
  background-color: white;
`;

const FormContainer = styled.View`
  padding-left: 10px;
`;

const STextInput = styled.TextInput`
  margin-top: 10px;
  background-color: white;
  width: ${constants.width / 1.8}px;
  height: 40px;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.lightGreyColor};
`;

const Button = styled.TouchableOpacity`
  background-color: ${styles.blueColor};
  border-radius: 3px;
  width: ${constants.width / 1.8}px;
  height: 40px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 15px;
`;

export default ({ navigation, route }) => {
  const [loading, setIsloading] = useState(false);
  const photo = route.params.photo;
  const captionInput = useInput("");
  const locationInput = useInput("");
  const [uploadMutation] = useMutation(UPLOAD, {
    refetchQueries: () => [{ query: FEED_QUERY }],
  });

  navigation.setOptions({
    headerTitle: "Upload",
  });

  const handleSubmit = async () => {
    if (captionInput.value === "" || locationInput.value === "") {
      Alert.alert("All fields are required");
    }
    const formData = new FormData();
    const name = photo.filename;
    const [, type] = name.split(".");
    formData.append("file", { name, type: type.toLowerCase(), uri: photo.uri }); //append([multer's variable name. ex).single("file") <- file is name.], [value])
    try {
      setIsloading(true);
      const {
        data: { location },
      } = await axios.post("http://localhost:4000/api/upload", formData, {
        headers: {
          "cotent-type": "multipart/form-data",
        },
      });

      console.log(location);

      const {
        data: { upload },
      } = await uploadMutation({
        variables: {
          files: [location],
          caption: captionInput.value,
          location: locationInput.value,
        },
      });

      if (upload.id) {
        navigation.navigate("TabNavigation");
      }
    } catch (e) {
      Alert.alert("Can't upload.", "Try later");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <Aview>
      <Image style={{ width: 100, height: 100 }} source={{ uri: photo.uri }} />
      <FormContainer>
        <STextInput
          onChangeText={captionInput.onChange}
          value={captionInput.value}
          placeholder={"Caption"}
          multiline={true}
          placeholderTextColor={styles.darkGreyColor}
        />
        <STextInput
          onChangeText={locationInput.onChange}
          value={locationInput.value}
          placeholder={"Location"}
          multiline={true}
          placeholderTextColor={styles.darkGreyColor}
        />

        <Button onPress={handleSubmit}>
          {loading ? (
            <ActivityIndicator color={"white"} />
          ) : (
            <ButtonText>Upload</ButtonText>
          )}
        </Button>
      </FormContainer>
    </Aview>
  );
};

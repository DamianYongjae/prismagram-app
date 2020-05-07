import React, { useState, useEffect } from "react";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import Loader from "../../components/Loader";
import constants from "../constants";
import styles from "../../styles";

const View = styled.View`
  flex: 1;
`;
const Button = styled.TouchableOpacity`
  background-color: ${styles.blueColor};
  width: 130px;
  height: 40px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 18px;
`;

export default ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selected, setSelected] = useState();
  const [allPhotos, setAllPhotos] = useState();

  const changeSelected = (photo) => {
    setSelected(photo);
  };

  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync();
      console.log(assets);
      const [firstPhoto] = assets;
      setSelected(firstPhoto);
      setAllPhotos(assets);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        setHasPermission(true);
        getPhotos();
      }
    } catch (e) {
      console.log(e);
      setHasPermission(false);
    }
  };

  const handleSelected = () => {
    navigation.navigate("UploadPhoto", { photo: selected });
  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <View>
          {hasPermission ? (
            <>
              <Image
                style={{ width: constants.width, height: constants.height / 2 }}
                source={{ uri: selected.uri }}
              />
              <Button onPress={handleSelected}>
                <Text>Select Photo</Text>
              </Button>

              <ScrollView
                contentContainerStyle={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {allPhotos.map((photo) => (
                  <TouchableOpacity
                    key={photo.id}
                    onPress={() => changeSelected(photo)}
                  >
                    <Image
                      style={{
                        width: constants.width / 3,
                        height: constants.height / 6,
                        opacity: photo.id === selected.id ? 0.5 : 1,
                      }}
                      source={{ uri: photo.uri }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          ) : null}
        </View>
      )}
    </View>
  );
};

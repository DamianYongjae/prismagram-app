import React from "react";
import { TouchableOpacity, Image } from "react-native";
import constants from "../screens/constants";
import { withNavigation } from "react-navigation";

type SquarePhotoProps = {
  navigation?;
  files?;
  id: string;
};

const SquarePhoto = ({ navigation, files = [], id }: SquarePhotoProps) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Detail", { id })}>
      <Image
        source={{ uri: files[0].url }}
        style={{ width: constants.width / 3, height: constants.height / 6 }}
      />
    </TouchableOpacity>
  );
};

export default withNavigation(SquarePhoto);

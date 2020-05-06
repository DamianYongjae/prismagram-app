import React from "react";
import { TextInput } from "react-native";
import styles from "../styles";
import constants from "../screens/constants";

type SearchBarProps = {
  onChange: Function;
  value: string;
  onSubmit: Function;
};

const SearchBar = ({ onChange, value, onSubmit }: SearchBarProps) => (
  <TextInput
    value={value}
    placeholder={"🔍 Search"}
    onChangeText={onChange}
    onEndEditing={onSubmit}
    returnKeyType="search"
    style={{
      width: constants.width - 40,
      height: 35,
      backgroundColor: styles.lightGreyColor,
      padding: 10,
      borderRadius: 5,
      textAlign: "center",
    }}
    placeholderTextColor={styles.darkBlueColor}
    autoCorrect={false}
  />
);

export default SearchBar;

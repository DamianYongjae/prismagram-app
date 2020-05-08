import React from "react";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles";

type NavIconProps = {
  name: string;
  color?: string;
  size?: number;
  focused?: boolean;
};

const NavIcon = ({
  name,
  color = styles.blackColor,
  size = 22,
  focused = true,
  style,
}: NavIconProps): JSX.Element => (
  <Ionicons
    focused={focused}
    name={name}
    color={focused ? color : styles.darkGreyColor}
    size={size}
    style={style}
  />
);

export default NavIcon;

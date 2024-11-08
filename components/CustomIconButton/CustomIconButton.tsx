import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { colors } from "@/constants";
import { CustomIconButtonProps } from "@/types";
// import garmentsIcon from "@/assets/icons/garments.png";

export default function CustomIconButton({
  text,
  image,
  onPress,
  active,
}: CustomIconButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: active ? colors.primary_light : colors.white },
      ]}
      onPress={onPress}
    >
      <Image source={image} style={styles.buttonIcon} />
      <Text
        style={[
          styles.buttonText,
          { color: active ? colors.dark : colors.muted },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 10,
    height: 40,
    width: 110,
    elevation: 3,
    margin: 5,
  },
  buttonText: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: "bold",
  },
  buttonIcon: {
    height: 20,
    width: 35,
    resizeMode: "contain",
  },
});

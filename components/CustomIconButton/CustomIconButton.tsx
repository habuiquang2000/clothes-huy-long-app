import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  type LayoutChangeEvent,
} from "react-native";

import { EXPO_PUBLIC_STATICS_URL } from "@/utils/dotenv";
import { colors } from "@/constants";
import { ICustomIconButtonProps } from "@/types";

const { width } = Dimensions.get("window");

export default function CustomIconButton({
  text,
  image,
  onPress,
  active,
}: ICustomIconButtonProps) {
  const [buttonHeight, setButtonHeight] = useState(0);

  const onButtonLayoutHandle = (event: LayoutChangeEvent) => {
    const { x, y, height, width } = event.nativeEvent.layout;

    if (!buttonHeight) setButtonHeight(height);
  };

  return (
    <TouchableOpacity
      onLayout={onButtonLayoutHandle}
      style={[
        styles.container,
        {
          backgroundColor: active ? colors.primary_light : colors.white,
        },
      ]}
      onPress={onPress}
    >
      <Image
        source={{
          uri: `${EXPO_PUBLIC_STATICS_URL}/uploads/categories/${image}`,
        }}
        style={[
          styles.buttonIcon,
          {
            height: buttonHeight * 0.9,
            width: buttonHeight * 0.9,
          },
        ]}
      />
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
    elevation: 3,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  buttonText: {
    fontSize: width / 28,
    color: colors.muted,
    fontWeight: "bold",
  },
  buttonIcon: {
    resizeMode: "contain",
    marginRight: 8,
  },
});

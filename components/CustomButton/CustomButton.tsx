import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "@/constants/Colors";

const CustomButton = ({ text, onPress, disabled = false }: any) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={disabled ? styles.containerDisabled : styles.container}
      onPress={onPress}
    >
      <Text style={disabled ? styles.buttonTextDisabled : styles.buttonText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    width: "100%",
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
  },
  containerDisabled: {
    padding: 15,
    width: "100%",
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colors.muted,
  },
  buttonTextDisabled: {
    fontWeight: "bold",
    color: colors.light,
  },
});

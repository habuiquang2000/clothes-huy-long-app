import React, { useMemo } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import colors from "@/constants/Colors";

function CustomInput({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  placeholderTextColor,
  onFocus,
  radius,
  width = "100%",
  keyboardType,
  maxLength,
}: any) {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        CustomInput: {
          height: 40,
          marginBottom: 10,
          marginTop: 10,
          borderRadius: radius,
          width: "100%",
          padding: 5,
          backgroundColor: colors.white,
          elevation: 5,
          paddingHorizontal: 20,
        },
      }),
    []
  );

  return (
    <View style={{ width: width }}>
      <TextInput
        placeholder={placeholder}
        onChangeText={setValue}
        value={value}
        secureTextEntry={secureTextEntry}
        style={styles.CustomInput}
        placeholderTextColor={placeholderTextColor}
        onFocus={onFocus}
        maxLength={maxLength}
        keyboardType={keyboardType}
      />
    </View>
  );
}

export default CustomInput;

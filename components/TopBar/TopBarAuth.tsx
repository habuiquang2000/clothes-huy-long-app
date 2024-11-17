import React, { PropsWithChildren, useMemo } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants";

import type { INavigationPropParams } from "@/types";

const TopBarAuth = ({ children }: PropsWithChildren) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<INavigationPropParams>();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: "100%",
          display: "flex",
          flexDirection: "row",
          marginTop: insets.top,
          justifyContent: "flex-start",
          alignItems: "center",
        },
      }),
    [insets.top]
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons
          name="arrow-back-circle-outline"
          size={30}
          color={colors.muted}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TopBarAuth;

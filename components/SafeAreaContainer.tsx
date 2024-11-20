import React, { PropsWithChildren, useMemo } from "react";
import { StyleSheet, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@/constants";
import InternetConnectionAlert from "@/components/InternetConnectionAlert";

export default function SafeAreaContainer({ children }: PropsWithChildren) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          marginTop: insets.top,
        },
      ]}
    >
      <StatusBar />
      <InternetConnectionAlert />

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
});

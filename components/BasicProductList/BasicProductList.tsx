import React from "react";
import { StyleSheet, Image, Text, View } from "react-native";

import { EXPO_PUBLIC_STATICS_URL } from "@/utils/dotenv";
import { colors } from "@/constants";

export default function BasicProductList({
  title,
  price,
  quantity,
  image,
}: any) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.IconContainer}>
          <Image
            source={{ uri: `${EXPO_PUBLIC_STATICS_URL}/uploads/${image}` }}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </View>
        <View style={styles.productInfoContainer}>
          <Text style={styles.secondaryText}>{title}</Text>
          <Text>x{quantity}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.primaryText}>đ{quantity * price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.white,
    paddingVertical: 5,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  productInfoContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 10,
  },
  IconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light,
    height: 40,
    width: 40,
    borderRadius: 5,
  },
  primaryText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.primary,
  },
  secondaryText: {
    fontSize: 15,
    fontWeight: "600",
  },
});

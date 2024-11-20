import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import React, { useMemo } from "react";
import { colors } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

import type { ProductCardProps } from "@/types/product";

const { width } = Dimensions.get("window");

export default function ProductCard({
  title,
  nameMaxLength = 8,
  price,
  image,
  quantity,

  onPress,
  onPressSecondary,
  cardSize,
}: ProductCardProps) {
  const cardWidth = useMemo(() => {
    switch (cardSize) {
      case "large":
        return "100%";
      case "half":
        return width / 2.12;
      case "medium":
        return width / 2.75;
      default:
        return width / 2 - 20;
    }
  }, [width]);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: cardWidth,
        },
      ]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.productImage} />
      </View>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.secondaryTextSm}>{`${title?.substring(
            0,
            nameMaxLength
          )}...`}</Text>
          <Text style={styles.primaryTextSm}>{price}VNĐ</Text>
        </View>
        <View>
          {quantity > 0 ? (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={onPressSecondary}
            >
              <Ionicons name="cart" size={20} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.iconContainerDisable} disabled>
              <Ionicons name="cart" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
    elevation: 5,
  },
  imageContainer: {
    backgroundColor: colors.light,
    width: "100%",
    height: 140,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 5,
    paddingBottom: 0,
  },
  productImage: {
    height: 120,
    width: 120,
  },
  infoContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  secondaryTextSm: {
    fontSize: width / 30,
    fontWeight: "bold",
  },
  primaryTextSm: {
    fontSize: width / 32,
    fontWeight: "bold",
    color: colors.primary,
  },
  iconContainer: {
    backgroundColor: colors.primary,
    width: 30,
    height: 30,
    borderRadius: 5,
    display: "flex",

    justifyContent: "center",
    alignItems: "center",
  },
  iconContainerDisable: {
    backgroundColor: colors.muted,
    width: 30,
    height: 30,
    borderRadius: 5,
    display: "flex",

    justifyContent: "center",
    alignItems: "center",
  },
});

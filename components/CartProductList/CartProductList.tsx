import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../constants";

import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import type { CartProductListProps } from "@/types/cart";

export default function CartProductList({
  image,
  title,
  price,
  quantity = 1,
  disableDecrement,
  disableIncrement,
  handleDelete,
  onPressDecrement,
  onPressIncrement,
}: CartProductListProps) {
  const rightSwipe = () => {
    return (
      <TouchableOpacity
        style={styles.deleteButtonContainer}
        onPress={handleDelete}
      >
        <MaterialCommunityIcons
          name="delete"
          size={25}
          color={colors.primary}
        />
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.containerOuter}>
        <Swipeable renderRightActions={rightSwipe}>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.productImage} />
            </View>
            <View style={styles.productInfoContainer}>
              <Text style={styles.productTitle}>{title}</Text>
              <View style={styles.productListBottomContainer}>
                <Text style={styles.productPrice}>đ{price}</Text>

                <View style={styles.counter}>
                  <TouchableOpacity
                    style={[
                      styles.counterButtonContainer,
                      {
                        ...(disableDecrement && {
                          opacity: 0.5,
                        }),
                      },
                    ]}
                    disabled={disableDecrement}
                    onPress={onPressDecrement}
                  >
                    <Text style={styles.counterButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterCountText}>{quantity}</Text>
                  <TouchableOpacity
                    style={[
                      styles.counterButtonContainer,
                      {
                        ...(disableIncrement && {
                          opacity: 0.5,
                        }),
                      },
                    ]}
                    disabled={disableIncrement}
                    onPress={onPressIncrement}
                  >
                    <Text style={styles.counterButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Swipeable>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.white,
    height: 120,
    borderRadius: 15,
    width: "100%",
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  containerOuter: {
    backgroundColor: colors.primary_light,
    height: 120,
    borderRadius: 15,
    width: "100%",
    marginBottom: 10,
  },
  imageContainer: {
    backgroundColor: colors.light,
    borderRadius: 10,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productInfoContainer: {
    padding: 10,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.dark,
  },
  productQuantitySm: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.muted,
  },
  productPrice: {
    fontSize: 15,
    color: colors.primary,
  },
  deleteButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary_light,
    borderTopEndRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 10,
    width: 70,
  },
  productListBottomContainer: {
    width: "auto",
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  counter: {
    backgroundColor: colors.white,
    width: 150,
    marginLeft: 20,
    padding: 5,
    borderRadius: 5,
    borderBottomRightRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  counterButtonContainer: {
    display: "flex",
    width: 30,
    height: 30,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.muted,
    borderRadius: 15,
    elevation: 2,
  },
  counterButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
  },
  counterCountText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

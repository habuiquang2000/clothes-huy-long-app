import React, { PropsWithChildren, useMemo } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants";
import { useAppSelector } from "@/stores/hooks";
import { selectCart } from "@/stores/features/cart/cart.slice";

import type { INavigationPropParams } from "@/types";

type Prop = PropsWithChildren<{
  canGoBack?: boolean;
}>;

const TopBarUser = ({ children, canGoBack }: Prop) => {
  const cartSelector = useAppSelector(selectCart);

  const insets = useSafeAreaInsets();
  const navigation = useNavigation<INavigationPropParams>();

  const navigateBackHandle = () => {
    navigation.goBack();
  };

  const navigateCartHandle = () => {
    navigation.navigate("product", {
      screen: "cart",
    });
  };

  return (
    <View
      style={[
        styles.topBarContainer,
        {
          marginTop: insets.top,
        },
      ]}
    >
      {/*  */}
      {canGoBack && (
        <TouchableOpacity
          // disabled
          onPress={navigateBackHandle}
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={30}
            color={colors.muted}
          />
          {/* <Ionicons name="menu" size={30} color={colors.muted} /> */}
        </TouchableOpacity>
      )}
      {children}

      {/*  */}
      <View style={styles.topbarlogoContainer}>
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.logo}
        />
        <Text style={styles.toBarText}>Huy Long Clothes</Text>
      </View>

      {/*  */}
      <TouchableOpacity
        style={styles.cartIconContainer}
        onPress={navigateCartHandle}
      >
        {cartSelector.data && cartSelector.data?.length > 0 && (
          <View style={styles.cartItemCountContainer}>
            <Text style={styles.cartItemCountText}>
              {cartSelector.data.length}
            </Text>
          </View>
        )}
        <Image source={require("@/assets/icons/cart_beg.png")} />
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={() => handleOnRefresh()}>
  <Ionicons name="cart-outline" size={30} color={colors.primary} /> */}
    </View>
  );
};

export default TopBarUser;

const styles = StyleSheet.create({
  topBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 20,
  },
  topbarlogoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 20,
  },
  logoContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  logo: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  toBarText: {
    fontSize: 15,
    fontWeight: "600",
  },

  cartIconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cartItemCountContainer: {
    position: "absolute",
    zIndex: 10,
    top: -10,
    left: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 22,
    width: 22,
    backgroundColor: colors.danger,
    borderRadius: 11,
  },
  cartItemCountText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 10,
  },
});

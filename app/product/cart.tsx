import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { EXPO_PUBLIC_STATICS_URL } from "@/utils/dotenv";
import { colors } from "@/constants";
import SafeAreaContainer from "@/components/SafeAreaContainer";
import CartProductList from "@/components/CartProductList/CartProductList";
import CustomButton from "@/components/CustomButton";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  addProductToCart,
  decreaseProductInCart,
  removeProductInCart,
  selectCart,
} from "@/stores/features/cart/cart.slice";

import type { INavigationPropParams } from "@/types";
import type { IProduct } from "@/types/product";

const { width } = Dimensions.get("window");

export default function CartScreen() {
  const dispatch = useAppDispatch();
  const cartSelector = useAppSelector(selectCart);
  const navigation = useNavigation<INavigationPropParams>();

  const increaseQuantity = (product: IProduct, quantity: number) => {
    if (product.quantity! > quantity)
      dispatch(addProductToCart({ product, quantity: 1 }));
  };
  const decreaseQuantity = (id: string, quantity: number) => {
    if (quantity > 1) dispatch(decreaseProductInCart({ id, quantity: 1 }));
  };
  const deleteItem = (id: string) => {
    dispatch(removeProductInCart(id));
  };

  return (
    <SafeAreaContainer>
      {/* TOPBAR - START */}
      <View style={styles.topBarContainer}>
        <View style={styles.cartInfoContainerTopBar}>
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
          <View style={styles.cartInfoTopBar}>
            <Text>Your Cart</Text>
            <Text>{cartSelector.data?.length} Items</Text>
          </View>
        </View>
      </View>
      {/* TOPBAR - END */}

      {/* BODY CONTENT - START */}
      {!cartSelector.data?.length ? (
        <View style={styles.cartProductListContiainerEmpty}>
          <Image
            source={require("@/assets/images/emptybox.png")}
            style={{
              height: width / 2.5,
              width: width / 2.5,
              resizeMode: "contain",
            }}
          />
          <Text style={styles.secondaryTextSmItalic}>"Cart is empty"</Text>
        </View>
      ) : (
        <ScrollView style={styles.cartProductListContiainer}>
          {cartSelector.data?.map((item, index) => (
            <CartProductList
              key={index}
              image={`${EXPO_PUBLIC_STATICS_URL}/uploads/${item.product.image}`}
              title={item.product.title}
              price={item.product.price}
              quantity={item.quantity}
              disableDecrement={item.quantity <= 1}
              disableIncrement={item.quantity >= item.product.quantity}
              onPressDecrement={() => {
                decreaseQuantity(item.product._id!, item.quantity);
              }}
              onPressIncrement={() => {
                increaseQuantity(item.product, item.quantity);
              }}
              handleDelete={() => {
                deleteItem(item.product._id!);
              }}
            />
          ))}
          <View style={styles.emptyView}></View>
        </ScrollView>
      )}
      {/* BODY CONTENT - END */}

      <View style={styles.cartBottomContainer}>
        <View style={styles.cartBottomLeftContainer}>
          <View style={styles.IconContainer}>
            <MaterialIcons
              name="featured-play-list"
              size={24}
              color={colors.primary}
            />
          </View>
          <View>
            <Text style={styles.cartBottomPrimaryText}>Total</Text>
            <Text style={styles.cartBottomSecondaryText}>
              đ
              {cartSelector.data?.reduce((accumulator, object) => {
                return accumulator + object.product.price * object.quantity;
              }, 0)}
            </Text>
          </View>
        </View>
        <View style={styles.cartBottomRightContainer}>
          <CustomButton
            text={"Checkout"}
            disabled={!cartSelector.data?.length}
            onPress={() => {
              navigation.navigate("product", {
                screen: "checkout",
              });
            }}
          />
        </View>
      </View>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  topBarContainer: {
    width: "100%",
    flexDirection: "row",
    padding: 20,
  },
  toBarText: {
    fontSize: 15,
    fontWeight: "600",
  },

  cartProductListContiainer: {
    width: "100%",
    paddingHorizontal: 8,
  },
  cartProductListContiainerEmpty: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  secondaryTextSmItalic: {
    fontStyle: "italic",
    fontSize: 15,
    color: colors.muted,
  },
  cartBottomContainer: {
    width: "100%",
    height: 120,
    display: "flex",
    backgroundColor: colors.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 3,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  cartBottomLeftContainer: {
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "center",
    width: "30%",
    height: "100%",
  },
  cartBottomRightContainer: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
    alignItems: "center",
    width: "50%",
    height: "100%",
  },
  cartBottomPrimaryText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  cartBottomSecondaryText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  emptyView: {
    width: "100%",
    height: 20,
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
  cartInfoContainerTopBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cartInfoTopBar: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 5,
  },
});

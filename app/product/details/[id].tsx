import React, { useState, useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, View, Text } from "react-native";
import ProgressDialog from "react-native-progress-dialog";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import SafeAreaContainer from "@/components/SafeAreaContainer";
import CustomButton from "@/components/CustomButton";
import CustomAlert from "@/components/CustomAlert/CustomAlert";

import { EXPO_PUBLIC_STATICS_URL } from "@/utils/dotenv";
import { colors } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  addProductToCart,
  selectCart,
} from "@/stores/features/cart/cart.slice";
import {
  getProductDetailAsync,
  selectProductDetail,
} from "@/stores/features/product/productDetail.slice";
import {
  getWishlistAsync,
  selectWishlist,
  toggleWishlistAsync,
} from "@/stores/features/product/wishlist.slice";

import type { IAlertType, INavigationPropParams } from "@/types";
import type { IProduct } from "@/types/product";

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const cartSelector = useAppSelector(selectCart);
  const productDetailSelector = useAppSelector(selectProductDetail);
  const wishlistSelector = useAppSelector(selectWishlist);

  const navigation = useNavigation<INavigationPropParams>();

  const [onWishlist, setOnWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isDisable, setIsDisbale] = useState(false);
  const [error, setError] = useState("");
  const [alertType, setAlertType] = useState<IAlertType>("error");

  const handleAddToCart = (product: IProduct, quantity: number) => {
    dispatch(
      addProductToCart({
        product,
        quantity,
      })
    );
  };

  const navigateCartHandle = () => {
    navigation.navigate("product", {
      screen: "cart",
    });
  };

  /** method to increase the product quantity */
  const handleIncreaseButton = (quantity: number) => {
    if ((productDetailSelector.data?.quantity || 1) > quantity) {
      setQuantity(quantity + 1);
    }
  };

  /** method to decrease the product quantity */
  const handleDecreaseButton = (quantity: number) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const toggleWishlistHandle = async () => {
    setIsDisbale(true);

    dispatch(toggleWishlistAsync({ id, onWishlist }))
      .unwrap()
      .then((result) => {
        if (result.success) {
          setError(result.message!);
          setAlertType("success");
        } else {
          setError(result.message!);
          setAlertType("error");
        }
      })
      .catch((error) => {
        setError(error.message);
        setAlertType("error");
      })
      .finally(() => {
        setIsDisbale(false);
      });
  };

  useEffect(() => {
    dispatch(getProductDetailAsync(id));
    setQuantity(1);
    dispatch(getWishlistAsync());
  }, []);

  useEffect(() => {
    setOnWishlist(
      wishlistSelector.data?.wishlist?.some(
        (item) => item.productId._id === id
      ) || false
    );
  }, [wishlistSelector.data]);

  return (
    <SafeAreaContainer>
      <ProgressDialog
        visible={productDetailSelector.status === "loading"}
        label={"Loading ..."}
      />

      {/* TOPBAR - START */}
      <View style={styles.topBarContainer}>
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
        <TouchableOpacity
          style={styles.cartIconContainer}
          onPress={navigateCartHandle}
        >
          {cartSelector.data && cartSelector.data?.length && (
            <View style={styles.cartItemCountContainer}>
              <Text style={styles.cartItemCountText}>
                {cartSelector.data.length}
              </Text>
            </View>
          )}
          <Image source={require("@/assets/icons/cart_beg.png")} />
        </TouchableOpacity>
      </View>
      {/* TOPBAR - END */}

      {/* BODY CONTENT - START */}
      <View style={styles.bodyContainer}>
        <View style={styles.productImageContainer}>
          <Image
            source={{
              uri: `${EXPO_PUBLIC_STATICS_URL}/uploads/${productDetailSelector.data?.image}`,
            }}
            style={styles.productImage}
          />
        </View>
        <CustomAlert message={error} type={alertType} />
        <View style={styles.productInfoContainer}>
          <View style={styles.productInfoTopContainer}>
            <View style={styles.productNameContaier}>
              <Text style={styles.productNameText}>
                {productDetailSelector.data?.title}
              </Text>
            </View>
            <View style={styles.infoButtonContainer}>
              <View style={styles.wishlistButtonContainer}>
                <TouchableOpacity
                  disabled={isDisable}
                  style={styles.iconContainer}
                  onPress={toggleWishlistHandle}
                >
                  <Ionicons
                    name="heart"
                    size={25}
                    color={!onWishlist ? colors.muted : colors.danger}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.productDetailContainer}>
              <View>
                <Text style={styles.secondaryTextSm}>Price:</Text>
                <Text style={styles.primaryTextSm}>
                  {productDetailSelector.data?.price} đ
                </Text>
              </View>
            </View>
            <View style={styles.productDescriptionContainer}>
              <Text style={styles.secondaryTextSm}>Description:</Text>
              <Text>{productDetailSelector.data?.description}</Text>
            </View>
          </View>
          <View style={styles.productInfoBottomContainer}>
            <View style={styles.counterContainer}>
              <View style={styles.counter}>
                <TouchableOpacity
                  style={[
                    styles.counterButtonContainer,
                    quantity <= 1 && {
                      opacity: 0.5,
                    },
                  ]}
                  disabled={quantity <= 1}
                  onPress={() => {
                    handleDecreaseButton(quantity);
                  }}
                >
                  <Text style={styles.counterButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterCountText}>{quantity}</Text>
                <TouchableOpacity
                  style={[
                    styles.counterButtonContainer,
                    quantity >= (productDetailSelector.data?.quantity || 1) && {
                      opacity: 0.5,
                    },
                  ]}
                  disabled={
                    quantity >= (productDetailSelector.data?.quantity || 1)
                  }
                  onPress={() => {
                    handleIncreaseButton(quantity);
                  }}
                >
                  <Text style={styles.counterButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.productButtonContainer}>
              <CustomButton
                text={
                  productDetailSelector.data?.quantity
                    ? "Add to Cart"
                    : "Out of Stock"
                }
                disabled={!productDetailSelector.data?.quantity}
                onPress={() => {
                  handleAddToCart(productDetailSelector.data!, quantity);
                }}
              />
            </View>
          </View>
        </View>
      </View>
      {/* BODY CONTENT - END */}
    </SafeAreaContainer>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  topBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  toBarText: {
    fontSize: 15,
    fontWeight: "600",
  },
  bodyContainer: {
    width: "100%",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  productImageContainer: {
    width: "100%",
    flex: 2,
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 0,
  },
  productInfoContainer: {
    width: "100%",
    flex: 3,
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    elevation: 25,
  },
  productImage: {
    height: 300,
    width: 300,
    resizeMode: "contain",
  },
  productInfoTopContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%",
    width: "100%",
    flex: 1,
  },
  productInfoBottomContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: colors.light,
    width: "100%",
    height: 140,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  productButtonContainer: {
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: colors.white,
    width: "100%",
    height: 100,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  productNameContaier: {
    padding: 5,
    paddingLeft: 20,
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  productNameText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  infoButtonContainer: {
    padding: 5,
    paddingRight: 0,
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  wishlistButtonContainer: {
    height: 50,
    width: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  productDetailContainer: {
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 5,
  },
  secondaryTextSm: { fontSize: 15, fontWeight: "bold" },
  primaryTextSm: { color: colors.primary, fontSize: 15, fontWeight: "bold" },
  productDescriptionContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    backgroundColor: colors.white,
    borderRadius: 20,
  },
  counterContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 50,
  },
  counter: {
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

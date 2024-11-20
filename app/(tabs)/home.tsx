import React, { useEffect, useState, useMemo } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  RefreshControl,
  ScrollView,
  TextInput,
  type ListRenderItemInfo,
} from "react-native";
import { useNavigation } from "expo-router";
import { TabActions } from "@react-navigation/native";
import { ActivityIndicator } from "@ant-design/react-native";

import { EXPO_PUBLIC_STATICS_URL } from "@/utils/dotenv";
import colors from "@/constants/Colors";
import SafeAreaContainer from "@/components/SafeAreaContainer";
import CustomIconButton from "@/components/CustomIconButton/CustomIconButton";
import ProductCard from "@/components/ProductCard/ProductCard";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getUserAsync, selectUser } from "@/stores/features/user/user.slice";
import {
  addProductToCart,
  selectCart,
} from "@/stores/features/cart/cart.slice";
import {
  getCategoryListAsync,
  selectCategoryList,
} from "@/stores/features/category/categoryList.slice";
import {
  getProductListAsync,
  selectProductList,
} from "@/stores/features/product/productList.slice";

import type { INavigationPropParams } from "@/types";
import type { IProduct } from "@/types/product";

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const userSelector = useAppSelector(selectUser);
  const cartSelector = useAppSelector(selectCart);
  const categoryListSelector = useAppSelector(selectCategoryList);
  const productListSelector = useAppSelector(selectProductList);

  const navigation = useNavigation<INavigationPropParams>();

  const [search, setSearch] = useState("");
  const [refeshing, setRefreshing] = useState(false);

  const searchHandle = () => {
    const jumpToCategories = TabActions.jumpTo("categories", {
      search,
    });

    navigation.dispatch(jumpToCategories);
  };

  const handleCategoryPress = (categoryId: string | undefined) => {
    const jumpToCategories = TabActions.jumpTo("categories", {
      id: categoryId,
    });

    navigation.dispatch(jumpToCategories);
  };
  const handleProductPress = (productId: string | undefined) => {
    navigation.navigate("product", {
      screen: "details/[id]",
      params: { id: productId },
    });
    // navigation.navigate("productdetail", { product: product });
  };
  const handleAddToCart = (product: IProduct, quantity: number) => {
    dispatch(
      addProductToCart({
        product,
        quantity,
      })
    );
  };

  const fetchCategoties = () => {
    dispatch(getCategoryListAsync());
  };
  const fetchProducts = () => {
    dispatch(getProductListAsync());
  };

  //method call on pull refresh
  const handleOnRefresh = () => {
    setRefreshing(true);
    fetchCategoties();
    fetchProducts();
    setRefreshing(false);
  };

  //convert user to json and fetch products in initial render
  useEffect(() => {
    fetchCategoties();
    fetchProducts();

    if (userSelector.data == null) dispatch(getUserAsync());
  }, []);

  return (
    <SafeAreaContainer>
      {/* TOPBAR - START */}
      <View style={styles.topBarContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Search..."
              onChangeText={setSearch}
              value={search}
              style={{
                borderRadius: 10,
                paddingLeft: 10,
                borderWidth: 0,
                backgroundColor: colors.white,
              }}
              keyboardType={"default"}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={searchHandle} style={styles.scanButton}>
              <Text style={styles.scanButtonText}>Search</Text>
              <Image
                source={require("@/assets/icons/scan_icons.png")}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.cartIconContainer}
          onPress={() => {
            navigation.navigate("product", {
              screen: "cart",
            });
          }}
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
      </View>
      {/* TOPBAR - END */}

      {/* BODY CONTENT - START */}
      <View style={styles.bodyContainer}>
        <ScrollView
          nestedScrollEnabled
          keyboardDismissMode="on-drag"
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refeshing}
              onRefresh={handleOnRefresh}
            />
          }
          style={{ width: "100%" }}
        >
          {/* CATEGORIES - START */}
          <View style={styles.sectionGroup}>
            <View style={styles.primaryTextContainer}>
              <Text style={styles.primaryText}>Categories</Text>
            </View>
            <View style={styles.categoryContainer}>
              {categoryListSelector.status === "idle" ? (
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={categoryListSelector.data}
                  keyExtractor={(item, index) => `${item}-${index}`}
                  contentContainerStyle={{
                    gap: 6,
                  }}
                  renderItem={({ item, index }) => (
                    <CustomIconButton
                      key={index}
                      text={item.title}
                      image={item.image}
                      onPress={() => {
                        handleCategoryPress(item._id);
                      }}
                    />
                  )}
                />
              ) : (
                <ActivityIndicator styles={{ container: { height: "100%" } }} />
              )}
            </View>
          </View>
          {/* CATEGORIES - END */}

          {/* NEW ARRIVALS - START */}
          <View style={styles.sectionGroup}>
            <View style={styles.primaryTextContainer}>
              <Text style={styles.primaryText}>New Arrivals</Text>
            </View>

            {productListSelector.status === "idle" ? (
              productListSelector.data?.length === 0 ? (
                <View style={styles.productCardContainerEmpty}>
                  <Text style={styles.productCardContainerEmptyText}>
                    No Found Product
                  </Text>
                </View>
              ) : (
                <FlatList
                  style={{
                    marginHorizontal: 4,
                    paddingHorizontal: 4,
                    paddingVertical: 8,
                  }}
                  showsHorizontalScrollIndicator={false}
                  initialNumToRender={5}
                  horizontal={true}
                  data={productListSelector.data?.slice(0, 5)}
                  keyExtractor={(item) => item._id ?? ""}
                  contentContainerStyle={{
                    gap: 3,
                  }}
                  renderItem={(info: ListRenderItemInfo<IProduct>) => (
                    <ProductCard
                      key={info.index}
                      cardSize="medium"
                      name={info.item.title}
                      image={`${EXPO_PUBLIC_STATICS_URL}/uploads/${info.item.image}`}
                      price={info.item.price}
                      quantity={info.item.quantity}
                      onPress={() => {
                        handleProductPress(info.item._id);
                      }}
                      onPressSecondary={() => {
                        handleAddToCart(info.item, 1);
                      }}
                    />
                  )}
                />
              )
            ) : (
              <ActivityIndicator styles={{ container: { height: "100%" } }} />
            )}
          </View>
          {/* NEW ARRIVALS - END */}

          {/* PRODUCT FOR YOU - START */}
          <View style={styles.sectionGroup}>
            <View style={styles.primaryTextContainer}>
              <Text style={styles.primaryText}>Product For You</Text>
            </View>
            <View
              style={{
                width: "100%",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {productListSelector.status === "idle" ? (
                productListSelector.data?.length === 0 ? (
                  <View style={styles.productCardContainerEmpty}>
                    <Text style={styles.productCardContainerEmptyText}>
                      No Found Product
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{
                      paddingBottom: 60,
                    }}
                    numColumns={2}
                    contentContainerStyle={{
                      gap: 6,
                    }}
                    columnWrapperStyle={{
                      gap: 6,
                    }}
                    nestedScrollEnabled
                    scrollEnabled={false}
                    data={productListSelector.data}
                    keyExtractor={(item) => item._id ?? ""}
                    renderItem={(info: ListRenderItemInfo<IProduct>) => (
                      <ProductCard
                        key={info.index}
                        cardSize="half"
                        name={info.item.title}
                        nameMaxLength={12}
                        image={`${EXPO_PUBLIC_STATICS_URL}/uploads/${info.item.image}`}
                        price={info.item.price}
                        quantity={info.item.quantity}
                        onPress={() => {
                          handleProductPress(info.item._id);
                        }}
                        onPressSecondary={() => {
                          handleAddToCart(info.item, 1);
                        }}
                      />
                    )}
                  />
                )
              ) : (
                <ActivityIndicator styles={{ container: { height: "100%" } }} />
              )}
            </View>
          </View>
          {/* PRODUCT FOR YOU - END */}
        </ScrollView>
      </View>
      {/* BODY CONTENT - END */}
    </SafeAreaContainer>
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
  /** TOP BAR - START */
  topBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: colors.light,
  },
  searchContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  inputContainer: {
    width: "70%",
  },
  buttonContainer: {
    width: "25%",
  },
  scanButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: "100%",
    paddingVertical: 12,
  },
  scanButtonText: {
    fontSize: 15,
    color: colors.light,
    fontWeight: "bold",
  },
  /** TOP BAR - END */

  /** BODY - START */
  bodyContainer: {
    width: "100%",
    paddingBottom: 8,
  },
  sectionGroup: {
    width: "100%",
    marginTop: 24,
  },
  primaryTextContainer: {
    width: "100%",
    marginLeft: 8,
  },
  primaryText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  categoryContainer: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  productCardContainerEmpty: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 240,
    marginLeft: 10,
    paddingTop: 0,
  },
  productCardContainerEmptyText: {
    fontSize: 15,
    fontStyle: "italic",
    color: colors.muted,
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

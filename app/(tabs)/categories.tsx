import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  FlatList,
  RefreshControl,
  Dimensions,
} from "react-native";
import ProgressDialog from "react-native-progress-dialog";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";

import { colors } from "@/constants";
// import * as actionCreaters from "@/states/actionCreaters/actionCreaters";
import CustomIconButton from "@/components/CustomIconButton/CustomIconButton";
import ProductCard from "@/components/ProductCard/ProductCard";
import CustomInput from "@/components/CustomInput";

import InternetConnectionAlert from "@/components/InternetConnectionAlert";
import TopBarUser from "@/components/TopBar/TopBarUser";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { addProductToCart } from "@/stores/features/cart/cart.slice";
import {
  getProductListAsync,
  selectProductList,
} from "@/stores/features/product/productList.slice";
import { selectCategoryList } from "@/stores/features/category/categoryList.slice";

import type { INavigationPropParams } from "@/types";
import type { IProduct } from "@/types/product";
import { ICategory } from "@/types/category";

const { width } = Dimensions.get("window");

export default function CategoriesScreen() {
  const dispatch = useAppDispatch();
  const productListSelector = useAppSelector(selectProductList);
  const categoryListSelector = useAppSelector(selectCategoryList);

  const navigation = useNavigation<INavigationPropParams>();
  const { categoryID } = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [refeshing, setRefreshing] = useState(false);
  const [label, setLabel] = useState("Loading...");
  const [error, setError] = useState("");
  const [foundItems, setFoundItems] = useState<IProduct[]>([]);
  const [filterItem, setFilterItem] = useState("");

  const handleAddToCat = (product: IProduct) => {
    // dispatch(addProductToCart(product));
  };

  //method call on pull refresh
  const handleOnRefresh = () => {
    setRefreshing(true);
    fetchProduct();
    setRefreshing(false);
  };

  var headerOptions = {
    method: "GET",
    redirect: "follow",
  };

  const [selectedTab, setSelectedTab] = useState<ICategory>(() => {
    if (categoryListSelector.data) return categoryListSelector.data[0];
    return {
      title: "",
      image: "",
    };
  });

  const fetchProduct = () => {
    dispatch(getProductListAsync());
  };

  //listener call on tab focus and initlize categoryID
  // navigation.addListener("focus", () => {
  //   if (categoryID) {
  //     setSelectedTab(categoryID);
  //   }
  // });

  //method to filter the product according to user search in selected category
  const filter = () => {
    const keyword = filterItem;
    if (keyword !== "") {
      const results = productListSelector.data?.filter((product) =>
        product.title?.toLowerCase().includes(keyword.toLowerCase())
      );

      setFoundItems(results ?? []);
    } else {
      setFoundItems(productListSelector.data || []);
    }
  };

  //render whenever the value of filterItem change
  useEffect(() => {
    filter();
  }, [filterItem]);

  //fetch the product on initial render
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar />
      <InternetConnectionAlert />
      <ProgressDialog visible={isLoading} label={"Loading ..."} />

      <TopBarUser canGoBack />

      <View style={styles.bodyContainer}>
        <View style={{ padding: 0, paddingLeft: 20, paddingRight: 20 }}>
          <CustomInput
            radius={5}
            placeholder={"Search..."}
            value={filterItem}
            setValue={setFilterItem}
          />
        </View>
        <FlatList
          data={categoryListSelector.data}
          keyExtractor={(index, item) => `${index}-${item}`}
          horizontal
          style={{ flexGrow: 0 }}
          contentContainerStyle={{ padding: 10 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: tab }) => (
            <CustomIconButton
              // key={tab}
              text={tab.title}
              image={tab.image}
              active={selectedTab?.title === tab.title ? true : false}
              onPress={() => {
                setSelectedTab(tab);
              }}
            />
          )}
        />

        {foundItems.filter(
          (product: IProduct) => product?.category?._id === selectedTab?._id
        ).length === 0 ? (
          <View style={styles.noItemContainer}>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.white,
                height: 150,
                width: 150,
                borderRadius: 10,
              }}
            >
              <Image
                source={require("@/assets/images/emptybox.png")}
                style={{ height: 80, width: 80, resizeMode: "contain" }}
              />
              <Text style={styles.emptyBoxText}>
                There no product in this category
              </Text>
            </View>
          </View>
        ) : (
          <FlatList
            data={foundItems.filter(
              (product: IProduct) => product?.category?._id === selectedTab?._id
            )}
            refreshControl={
              <RefreshControl
                refreshing={refeshing}
                onRefresh={handleOnRefresh}
              />
            }
            keyExtractor={(index, item) => `${index}-${item}`}
            contentContainerStyle={{ margin: 10 }}
            numColumns={2}
            renderItem={({ item: product }: { item: IProduct }) => (
              <View
                style={[
                  styles.productCartContainer,
                  { width: (width - width * 0.1) / 2 },
                ]}
              >
                <ProductCard
                  cardSize={"large"}
                  name={product.title}
                  image={`https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/3.jpg`}
                  // image={`${network.serverip}/uploads/${product.image}`}
                  price={product.price}
                  quantity={product.quantity}
                  onPress={() => {
                    // navigation.navigate("productdetail", { product: product });
                  }}
                  onPressSecondary={handleAddToCat}
                />
                <View style={styles.emptyView}></View>
              </View>
            )}
          />
        )}
      </View>
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
  toBarText: {
    fontSize: 15,
    fontWeight: "600",
  },
  bodyContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.light,
    justifyContent: "flex-start",
  },
  productCartContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 5,
    padding: 5,
    paddingBottom: 0,
    paddingTop: 0,
    marginBottom: 0,
  },
  noItemContainer: {
    width: "100%",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  emptyBoxText: {
    fontSize: 11,
    color: colors.muted,
    textAlign: "center",
  },
  emptyView: {
    height: 20,
  },
});

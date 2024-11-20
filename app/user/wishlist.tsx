import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ProgressDialog from "react-native-progress-dialog";

import { EXPO_PUBLIC_STATICS_URL } from "@/utils/dotenv";
import { colors } from "@/constants";
import SafeAreaContainer from "@/components/SafeAreaContainer";
import CustomAlert from "@/components/CustomAlert/CustomAlert";
import WishList from "@/components/WishList/WishList";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  getWishlistAsync,
  selectWishlist,
  toggleWishlistAsync,
} from "@/stores/features/product/wishlist.slice";

import type { INavigationPropParams } from "@/types";
import type { IWishList } from "@/types/wishList";

export default function WishlistScreen() {
  const navigation = useNavigation<INavigationPropParams>();
  const dispatch = useAppDispatch();
  const wishlistSelector = useAppSelector(selectWishlist);

  const [refeshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const handleView = (id: string) => {
    navigation.navigate("product", {
      screen: "details/[id]",
      params: { id },
    });
  };

  const handleOnRefresh = () => {
    setRefreshing(true);
    fetchWishlist();
    setRefreshing(false);
  };

  const fetchWishlist = () => {
    dispatch(getWishlistAsync());
  };

  const handleRemoveFromWishlist = (id: string) => {
    dispatch(toggleWishlistAsync({ id, onWishlist: true }));
  };

  useEffect(() => {
    setError("");
    fetchWishlist();
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <SafeAreaContainer>
      <ProgressDialog
        visible={wishlistSelector.status === "loading"}
        label={"Loading ..."}
      />
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
        <View>
          <Text style={styles.screenNameText}>My Wishlist</Text>
        </View>
        <TouchableOpacity onPress={() => handleOnRefresh()}>
          <Ionicons name="heart-outline" size={30} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <CustomAlert message={error} type={"error"} />
      <ScrollView
        style={{
          flex: 1,
          width: "100%",
          paddingHorizontal: 20,
          paddingBottom: 20,
          marginBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refeshing} onRefresh={handleOnRefresh} />
        }
      >
        {wishlistSelector.data?.wishlist?.length == 0 ? (
          <View style={styles.ListContiainerEmpty}>
            <Text style={styles.secondaryTextSmItalic}>
              "There are no product in wishlist yet."
            </Text>
          </View>
        ) : (
          wishlistSelector.data?.wishlist?.map((list: IWishList, index) => {
            return (
              <WishList
                image={`${EXPO_PUBLIC_STATICS_URL}/uploads/${list.product.image}`}
                title={list?.product?.title}
                description={list?.product?.description}
                key={index}
                onPressView={() => handleView(list.product._id!)}
                onPressRemove={() => {
                  handleRemoveFromWishlist(list.product._id!);
                }}
              />
            );
          })
        )}
      </ScrollView>
    </SafeAreaContainer>
  );
}

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
  screenNameContainer: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
  screenNameParagraph: {
    marginTop: 5,
    fontSize: 15,
  },
  bodyContainer: {
    width: "100%",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  emptyView: {
    height: 20,
  },
  ListContiainerEmpty: {
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
});

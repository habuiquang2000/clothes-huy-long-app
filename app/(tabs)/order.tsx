import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import ProgressDialog from "react-native-progress-dialog";
import { useNavigation } from "expo-router";

import { colors } from "@/constants";
import SafeAreaContainer from "@/components/SafeAreaContainer";
import CustomAlert from "@/components/CustomAlert/CustomAlert";
import OrderList from "@/components/OrderList/OrderList";
import TopBarUser from "@/components/TopBar/TopBarUser";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  orderFetchAsync,
  selectOrder,
} from "@/stores/features/cart/order.slice";

import type { IAlertType, INavigationPropParams } from "@/types";

export default function OrderScreen() {
  const dispatch = useAppDispatch();
  const orderSelector = useAppSelector(selectOrder);
  const navigation = useNavigation<INavigationPropParams>();

  const [label, setLabel] = useState("Please wait...");
  const [refeshing, setRefreshing] = useState(false);
  const [alertType, setAlertType] = useState<IAlertType>("error");
  const [error, setError] = useState("");

  const fetchOrders = () => {
    dispatch(orderFetchAsync())
      .unwrap()
      .then((result) => {
        if (result.success) {
          setError("");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const handleOnRefresh = () => {
    setRefreshing(true);
    fetchOrders();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <SafeAreaContainer>
      <ProgressDialog
        visible={orderSelector.status === "loading"}
        label={label}
      />

      <TopBarUser canGoBack />

      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>My Orders</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>
            Your order and your order status
          </Text>
        </View>
      </View>

      <CustomAlert message={error} type={alertType} />
      {orderSelector.data?.length == 0 ? (
        <View style={styles.ListContiainerEmpty}>
          <Text style={styles.secondaryTextSmItalic}>
            "There are no orders placed yet."
          </Text>
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1, width: "100%", padding: 20 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refeshing}
              onRefresh={handleOnRefresh}
            />
          }
        >
          {orderSelector.data?.map((order, idx) => (
            <OrderList
              key={idx}
              item={order}
              onPress={() => {
                navigation.navigate("product", {
                  screen: "orderDetail/[id]",
                  params: { id: order.orderId },
                });
              }}
            />
          ))}
          <View style={styles.emptyView}></View>
        </ScrollView>
      )}
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
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

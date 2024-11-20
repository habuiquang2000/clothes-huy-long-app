import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import ProgressDialog from "react-native-progress-dialog";
import StepIndicator from "react-native-step-indicator";

import { colors } from "@/constants";
import SafeAreaContainer from "@/components/SafeAreaContainer";
import CustomAlert from "@/components/CustomAlert/CustomAlert";
import BasicProductList from "@/components/BasicProductList/BasicProductList";
import { useAppSelector } from "@/stores/hooks";
import { selectOrder } from "@/stores/features/cart/order.slice";

import type { IAlertType, INavigationPropParams } from "@/types";
import type { IOrder } from "@/types/order";
import type { ICart } from "@/types/cart";

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation<INavigationPropParams>();
  const orderSelector = useAppSelector(selectOrder);

  const [orderDetail, setOrderDetail] = useState<IOrder>();
  const [value, setValue] = useState<
    "pending" | "shipped" | "delivered" | undefined
  >(undefined);
  const labels = ["Processing", "Shipping", "Delivery"];
  const [trackingState, setTrackingState] = useState(1);
  const [error, setError] = useState("");
  const [alertType, setAlertType] = useState<IAlertType>("error");

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: colors.primary,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: colors.primary,
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "#fe7013",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#fe7013",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: colors.white,
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#fe7013",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: "#fe7013",
  };

  //method to convert time to AM PM format
  // function tConvert(time) {
  //   time = time
  //     .toString()
  //     .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  //   if (time.length > 1) {
  //     time = time.slice(1); // Remove full string match value
  //     time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
  //     time[0] = +time[0] % 12 || 12; // Adjust hours
  //   }
  //   return time.join("");
  // }

  //method to convert data to dd-mm-yyyy  format
  const dateFormat = (datex: Date) => {
    //   let t = new Date(datex);
    //   const date = ("0" + t.getDate()).slice(-2);
    //   const month = ("0" + (t.getMonth() + 1)).slice(-2);
    //   const year = t.getFullYear();
    //   const hours = ("0" + t.getHours()).slice(-2);
    //   const minutes = ("0" + t.getMinutes()).slice(-2);
    //   const seconds = ("0" + t.getSeconds()).slice(-2);
    //   const time = tConvert(`${hours}:${minutes}:${seconds}`);
    //   const newDate = `${date}-${month}-${year}, ${time}`;
    // return newDate;
    return datex;
  };

  useEffect(() => {
    const itemIndex = orderSelector.data?.findIndex((item) => {
      return item.orderId === id;
    });

    setOrderDetail(orderSelector.data![itemIndex!]);
  }, []);

  useEffect(() => {
    setError("");
    setAlertType("error");

    setValue(orderDetail?.status);

    if (orderDetail?.status === "pending") {
      setTrackingState(1);
    } else if (orderDetail?.status === "shipped") {
      setTrackingState(2);
    } else {
      setTrackingState(3);
    }
  }, []);

  return (
    <SafeAreaContainer>
      {/* <ProgressDialog visible={isloading} label={label} /> */}

      <View style={styles.TopBarContainer}>
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
        <Text style={styles.screenNameText}>Order Detials</Text>
      </View>

      <CustomAlert message={error} type={alertType} />

      <ScrollView
        style={styles.bodyContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containerNameContainer}>
          <Text style={styles.containerNameText}>Shipping Address</Text>
        </View>
        <View style={styles.ShipingInfoContainer}>
          <Text style={styles.secondarytextSm}>
            {orderDetail?.shippingAddress}
          </Text>
        </View>

        <Text style={styles.containerNameText}>Order Info</Text>
        <View style={styles.orderInfoContainer}>
          <Text style={styles.secondarytextMedian}>
            Order # {orderDetail?.orderId}
          </Text>
          <Text style={styles.secondarytextSm}>
            Ordered on: {`${orderDetail?.createdAt}`}
            {/* {dateFormat(orderDetail?.createdAt!).toString()} */}
          </Text>
          {orderDetail?.shippedOn && (
            <Text style={styles.secondarytextSm}>
              Shipped on {orderDetail?.shippedOn}
            </Text>
          )}
          {orderDetail?.deliveredOn && (
            <Text style={styles.secondarytextSm}>
              Delivered on {orderDetail?.deliveredOn}
            </Text>
          )}
          <View style={{ marginTop: 15, width: "100%" }}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={trackingState}
              stepCount={3}
              labels={labels}
            />
          </View>
        </View>

        <View style={styles.containerNameContainer}>
          <Text style={styles.containerNameText}>Package Details</Text>
        </View>
        <View style={styles.orderItemsContainer}>
          <View style={styles.orderItemContainer}>
            <Text style={styles.orderItemText}>Package</Text>
            <Text>{value}</Text>
          </View>
          <View style={styles.orderItemContainer}>
            <Text style={styles.orderItemText}>
              Order on : {`${orderDetail?.updatedAt}`}
            </Text>
          </View>
          <ScrollView
            style={styles.orderSummaryContainer}
            nestedScrollEnabled={true}
          >
            {orderDetail?.items?.map((cart: ICart, index: number) => {
              return (
                <View key={index}>
                  <BasicProductList
                    title={cart.product.title}
                    image={cart.product.image}
                    price={cart.product.price}
                    quantity={cart?.quantity}
                  />
                </View>
              );
            })}
          </ScrollView>

          <View style={styles.orderItemContainer}>
            <Text style={styles.orderItemText}>Total</Text>
            <Text>
              đ
              {orderDetail?.items?.reduce((accumulator, object) => {
                return (accumulator + object.product.price) * object.quantity;
              }, 0)}
            </Text>
          </View>
        </View>
        <View style={styles.emptyView}></View>
      </ScrollView>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  TopBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },

  bodyContainer: {
    flex: 1,
    width: "100%",
    padding: 5,
    paddingHorizontal: 15,
  },
  ShipingInfoContainer: {
    marginTop: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    borderColor: colors.muted,
    elevation: 5,
    marginBottom: 10,
  },
  containerNameContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  containerNameText: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.muted,
  },
  secondarytextSm: {
    color: colors.muted,
    fontSize: 13,
  },
  orderItemsContainer: {
    marginTop: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,

    borderColor: colors.muted,
    elevation: 3,
    marginBottom: 10,
  },
  orderItemContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderItemText: {
    fontSize: 13,
    color: colors.muted,
  },
  orderSummaryContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    maxHeight: 220,
    width: "100%",
    marginBottom: 5,
  },
  bottomContainer: {
    backgroundColor: colors.white,
    width: "110%",
    height: 70,
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10,
    elevation: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingLeft: 10,
    paddingRight: 10,
  },
  orderInfoContainer: {
    marginTop: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,

    borderColor: colors.muted,
    elevation: 1,
    marginBottom: 10,
  },
  primarytextMedian: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "bold",
  },
  secondarytextMedian: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "bold",
  },
  emptyView: {
    height: 20,
  },
});

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Modal,
  Dimensions,
} from "react-native";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ProgressDialog from "react-native-progress-dialog";

import { colors } from "@/constants";
import SafeAreaContainer from "@/components/SafeAreaContainer";
import BasicProductList from "@/components/BasicProductList/BasicProductList";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { selectCart, emptyCart } from "@/stores/features/cart/cart.slice";
import { selectUser } from "@/stores/features/user/user.slice";
import { orderCreateAsync } from "@/stores/features/cart/order.slice";

import type { INavigationPropParams } from "@/types";

const { width } = Dimensions.get("window");

export default function CheckoutScreen() {
  const dispatch = useAppDispatch();
  const cartSelector = useAppSelector(selectCart);
  const userSelector = useAppSelector(selectUser);
  const navigation = useNavigation<INavigationPropParams>();

  const [modalVisible, setModalVisible] = useState(false);

  const [deliveryCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [country, setCountry] = useState("Ha Noi");
  const [city, setCity] = useState("Quan");
  const [streetAddress, setStreetAddress] = useState("Nha 18");
  const [shippingAddress, setShippingAddresss] = useState("");

  const [isloading, setIsloading] = useState(false);

  const handleCheckout = async () => {
    setIsloading(true);

    dispatch(
      orderCreateAsync({
        items: cartSelector.data!,
        country,
        city,
        shippingAddress,
      })
    )
      .unwrap()
      .then((result) => {
        if (result.success) {
          dispatch(emptyCart());
          navigation.replace("orderConfirm");
        }
      })
      .catch((error) => {})
      .finally(() => {
        setIsloading(false);
      });
  };

  useEffect(() => {
    setShippingAddresss(`${streetAddress}, ${city},${country}`);

    setTotalCost(
      cartSelector.data?.reduce((accumulator, object) => {
        return accumulator + object.product.price * object.quantity;
      }, 0) || 0
    );
  }, []);

  return (
    <SafeAreaContainer>
      <ProgressDialog visible={isloading} label={"Placing Order..."} />

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
      </View>

      <ScrollView style={styles.bodyContainer} nestedScrollEnabled={true}>
        <Text style={styles.primaryText}>Order Summary</Text>
        <ScrollView
          style={styles.orderSummaryContainer}
          nestedScrollEnabled={true}
        >
          {cartSelector.data?.map(({ product, quantity }, index) => (
            <BasicProductList
              key={index}
              title={product.title}
              price={product.price}
              image={product.image}
              quantity={quantity}
            />
          ))}
        </ScrollView>
        <View style={styles.totalOrderInfoContainer}>
          <View style={styles.list}>
            <Text>Order</Text>
            <Text>đ{totalCost}</Text>
          </View>
          <View style={styles.list}>
            <Text>Delivery</Text>
            <Text>đ{deliveryCost}</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.primaryTextSm}>Total</Text>
            <Text style={styles.secondaryTextSm}>
              đ{totalCost + deliveryCost}
            </Text>
          </View>
        </View>

        <Text style={styles.primaryText}>Contact</Text>
        <View style={styles.listContainer}>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Email</Text>
            <Text style={styles.secondaryTextSm}>
              {userSelector.data?.email}
            </Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Phone</Text>
            <Text style={styles.secondaryTextSm}>
              {userSelector.data?.phone}
            </Text>
          </View>
        </View>

        <Text style={styles.primaryText}>Address</Text>
        <View style={styles.listContainer}>
          <TouchableOpacity
            style={styles.list}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={styles.secondaryTextSm}>Address</Text>

            <View>
              {country || city || streetAddress ? (
                <Text
                  style={styles.secondaryTextSm}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {shippingAddress.length < 25
                    ? `${shippingAddress}`
                    : `${shippingAddress.substring(0, 25)}...`}
                </Text>
              ) : (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="document-text-outline"
                    size={25}
                    color={colors.primary}
                  />
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.primaryText}>Payment</Text>
        <View style={styles.listContainer}>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Method</Text>
            <Text style={styles.primaryTextSm}>Cash On Delivery</Text>
          </View>
        </View>

        <View style={styles.emptyView}></View>
      </ScrollView>

      <View style={styles.buttomContainer}>
        <CustomButton
          text={"Submit Order"}
          disabled={!(country && city && streetAddress)}
          onPress={handleCheckout}
        />
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        style={{
          opacity: 0.5,
        }}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalBody}>
          <View style={styles.modalAddressContainer}>
            <View
              style={{
                width: "100%",
              }}
            >
              <CustomInput
                value={country}
                setValue={setCountry}
                placeholder={"Enter Country"}
              />
              <CustomInput
                value={city}
                setValue={setCity}
                placeholder={"Enter City"}
              />
              <CustomInput
                value={streetAddress}
                setValue={setStreetAddress}
                placeholder={"Enter Street Address"}
              />
            </View>

            <View
              style={{
                width: "100%",
              }}
            >
              {streetAddress || city || country != "" ? (
                <CustomButton
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setShippingAddresss(`${streetAddress}, ${city},${country}`);
                  }}
                  text={"save"}
                />
              ) : (
                <CustomButton
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                  text={"close"}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  topBarContainer: {
    width: "100%",
    padding: 20,
  },

  bodyContainer: {
    paddingHorizontal: 15,
  },

  primaryText: {
    fontSize: width / 20,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  orderSummaryContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 8,
  },
  totalOrderInfoContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
  },
  list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.muted,
    paddingBottom: 5,
  },

  primaryTextSm: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.primary,
  },
  secondaryTextSm: {
    fontSize: 15,
    fontWeight: "bold",
  },
  listContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
  },
  buttomContainer: {
    // width: "100%",
    // padding: 20,
    // paddingLeft: 30,
    // paddingRight: 30,
  },
  emptyView: {
    // width: "100%",
    // height: 20,
  },

  modalBody: {
    flex: 1,
    display: "flex",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalAddressContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 20,
    elevation: 3,
    padding: 10,
  },
});

import React, { useEffect, useState } from "react";
import { StyleSheet, Image, Text, View, StatusBar } from "react-native";
import { useNavigation } from "expo-router";

import CustomButton from "@/components/CustomButton";
import type { INavigationPropParams } from "@/types";

const OrderConfirmScreen = () => {
  const navigation = useNavigation<INavigationPropParams>();

  return (
    <View style={styles.container}>
      <View style={styles.imageConatiner}>
        <Image
          source={require("@/assets/icons/success.png")}
          style={styles.Image}
        />
      </View>
      <Text style={styles.secondaryText}>Order has be confirmed</Text>
      <View>
        <CustomButton
          text={"Back to Home"}
          onPress={() => {
            navigation.replace("(tabs)");
          }}
        />
      </View>
    </View>
  );
};

export default OrderConfirmScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 40,
    flex: 1,
  },
  imageConatiner: {
    width: "100%",
  },
  Image: {
    width: 400,
    height: 300,
  },
  secondaryText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

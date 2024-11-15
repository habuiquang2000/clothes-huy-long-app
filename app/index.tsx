import React, { useEffect } from "react";
import { StyleSheet, Text, Image, View, Dimensions } from "react-native";
import { useNavigation } from "expo-router";

import colors from "@/constants/Colors";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getUserAsync, selectUser } from "@/stores/features/user/userSlice";

import type { INavigationPropParams } from "@/types";
import type { IUser } from "@/types/auth";

const { width } = Dimensions.get("window");

export default function SplashScreen() {
  const dispatch = useAppDispatch();
  const userSelector = useAppSelector(selectUser);
  const navigation = useNavigation<INavigationPropParams>();

  const _retrieveData = async (user: IUser | null) => {
    try {
      setTimeout(() => {
        navigation.replace(user !== null ? "(tabs)" : "(auth)");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  // check the authUser and navigate to screens accordingly on initial render
  useEffect(() => {
    if (userSelector.data == null)
      dispatch(getUserAsync()).unwrap().then(_retrieveData);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.splashText}>HUY LONG CLOTHES</Text>
      <Image style={styles.logo} source={require("@/assets/images/icon.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  splashText: {
    color: colors.dark,
    fontSize: 50,
    fontWeight: "bold",
    fontFamily: "RobotoRegular",
  },
  logo: {
    resizeMode: "contain",
    width: width / 2,
    height: width / 2,
  },
});

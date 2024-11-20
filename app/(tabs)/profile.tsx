import React, { useEffect, useState } from "react";
import { StyleSheet, View, StatusBar, ScrollView } from "react-native";
import ProgressDialog from "react-native-progress-dialog";
import { useNavigation } from "expo-router";

import { colors } from "@/constants";
import OptionList from "@/components/OptionList/OptionList";
import UserProfileCard from "@/components/UserProfileCard/UserProfileCard";
import InternetConnectionAlert from "@/components/InternetConnectionAlert";
import TopBarUser from "@/components/TopBar/TopBarUser";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  getUserAsync,
  logoutUserAsync,
  removeUserAsync,
  selectUser,
} from "@/stores/features/user/user.slice";

import type { INavigationPropParams } from "@/types";

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const userSelector = useAppSelector(selectUser);
  const navigation = useNavigation<INavigationPropParams>();

  useEffect(() => {
    if (!userSelector.data) dispatch(getUserAsync());
  }, []);

  //method to remove the authUser from aysnc storage and navigate to login
  const logoutHandle = async () => {
    dispatch(logoutUserAsync())
      .unwrap()
      .then(() => {
        dispatch(removeUserAsync())
          .unwrap()
          .then(() => {
            navigation.replace("(auth)", {
              screen: "login",
            });
          });
      });
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar translucent="auto"></StatusBar> */}

      <StatusBar />
      <InternetConnectionAlert />
      <ProgressDialog
        visible={userSelector.status === "loading"}
        label={"Loading"}
      />

      <TopBarUser>
        <View />
      </TopBarUser>

      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={{ width: "100%" }}
      >
        <View style={styles.userAvatarContianer}>
          <UserProfileCard
            name={userSelector?.data?.name}
            email={userSelector?.data?.email}
          />
        </View>

        <View style={styles.OptionsContainer}>
          <OptionList
            text={"My Account"}
            iconName={"person"}
            onPress={() => {
              navigation.navigate("user", {
                screen: "account",
              });
            }}
          />

          <OptionList
            text={"Wishlist"}
            iconName={"heart"}
            onPress={() => {
              navigation.navigate("user", {
                screen: "wishlist",
              });
            }}
          />

          {/* !For future use --- */}
          <OptionList
            disabled
            text={"Settings"}
            iconName={"settings-sharp"}
            onPress={() => {}}
          />
          <OptionList
            disabled
            text={"Help Center"}
            iconName={"help-circle"}
            onPress={() => {}}
          />

          {/* !For future use ---- End */}
          <OptionList
            text={"Logout"}
            iconName={"log-out"}
            onPress={logoutHandle}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    flex: 1,
  },
  userAvatarContianer: {
    width: "100%",
    height: "20%",
  },
  OptionsContainer: {
    marginTop: 20,
    width: "100%",
  },
});

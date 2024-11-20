import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../constants";
import SafeAreaContainer from "@/components/SafeAreaContainer";
import OptionList from "../../components/OptionList/OptionList";
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getUserAsync, selectUser } from "@/stores/features/user/user.slice";

import type { INavigationPropParams } from "@/types";

export default function AccountScreen() {
  const dispatch = useAppDispatch();
  const userSelector = useAppSelector(selectUser);
  const navigation = useNavigation<INavigationPropParams>();

  const [showBox, setShowBox] = useState(true);
  const [error, setError] = useState("");

  //method to delete the account using API call
  const deleteAccontHandle = (userID: string) => {
    // let fetchURL = network.serverip + "/?id=" + String(userID);
    //   .then((result) => {
    //     if (result.success == true) {
    //       navigation.navigate("login");
    //     } else {
    //       setError(result.message);
    //     }
    //   })
    //   .catch((error) => {});
  };

  const confirmDeleteAccountDialog = (id: string) => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove your account?",
      [
        {
          text: "Yes",
          onPress: () => {
            setShowBox(false);
            deleteAccontHandle(id);
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  useEffect(() => {
    // dispatch(getUserAsync());
  }, []);

  return (
    <SafeAreaContainer>
      {/* <StatusBar style="auto"></StatusBar> */}

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

        <Text style={styles.screenNameText}>My Account</Text>
      </View>

      <View style={styles.userProfileCardContianer}>
        <UserProfileCard
          name={userSelector.data?.name}
          email={userSelector.data?.email}
        />
      </View>

      <View style={styles.optionsContainer}>
        <OptionList
          text={"Change Password"}
          iconName={"key-sharp"}
          onPress={() => {
            navigation.navigate("user", {
              screen: "updatePassword",
              params: {
                // userID,
              },
            });
          }}
        />
        <OptionList
          text={"Delete My Account"}
          iconName={"bag-remove"}
          type={"danger"}
          onPress={() => confirmDeleteAccountDialog(userSelector.data?._id!)}
        />
      </View>
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
  userProfileCardContianer: {
    width: "100%",
    height: "25%",
    paddingHorizontal: 15,
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
  optionsContainer: {
    width: "100%",
    paddingHorizontal: 15,
  },
});

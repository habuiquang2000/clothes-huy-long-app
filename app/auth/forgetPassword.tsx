import React, { useState, useMemo } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import ProgressDialog from "react-native-progress-dialog";

import { colors } from "@/constants";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";

import InternetConnectionAlert from "@/components/InternetConnectionAlert";
import TopBarContainer from "@/components/TopBarContainer";
import CustomAlert from "@/components/CustomAlert";

import { useAppDispatch } from "@/stores/hooks";
import { forgetPasswordUserAsync } from "@/stores/features/user/userSlice";

export default function ForgetPasswordScreen() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isloading, setIsloading] = useState<boolean>(false);

  const sendInstructionsHandle = () => {
    setIsloading(true);
    setError(null);

    if (email == "") {
      return setError("Please enter your email");
    }

    if (!email.includes("@")) {
      return setError("Email is not valid");
    }
    if (email.length < 6) {
      return setError("Email is too short");
    }

    dispatch(forgetPasswordUserAsync({ email }))
      .unwrap()
      .then((result) => {
        // if (result.success) navigation.navigate("login");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <InternetConnectionAlert />
      <ProgressDialog visible={isloading} label={"Register ..."} />

      <TopBarContainer />
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>Reset Password</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>
            Enter the email associated with your account and we'll send an email
            with instruction to reset the password.
          </Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <CustomAlert message={error} type={"error"} />
        <CustomInput
          value={email}
          setValue={setEmail}
          placeholder={"Enter your Email Address"}
          placeholderTextColor={colors.muted}
          radius={5}
        />
      </View>

      <CustomButton
        text={"Reset password"}
        onPress={sendInstructionsHandle}
        radius={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    alignItems: "center",
    paddingHorizontal: 20,
    flex: 1,
  },
  screenNameContainer: {
    marginTop: 10,
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
  formContainer: {
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
  },
});

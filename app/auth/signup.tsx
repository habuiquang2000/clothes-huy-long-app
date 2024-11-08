import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
} from "react-native";
import { useNavigation } from "expo-router";
import ProgressDialog from "react-native-progress-dialog";

import { colors } from "@/constants";
import InternetConnectionAlert from "@/components/InternetConnectionAlert";
import TopBarContainer from "@/components/TopBarContainer";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import CustomAlert from "@/components/CustomAlert/CustomAlert";
import { useAppDispatch } from "@/stores/hooks";
import { signupUserAsync } from "@/stores/features/user/userSlice";

import type { INavigationPropParams } from "@/types";

export default function SignupScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<INavigationPropParams>();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isloading, setIsloading] = useState<boolean>(false);

  //method to post the user data to server for user signup using API call
  const signUpHandle = () => {
    setIsloading(true);
    setError(null);

    if (email == "") {
      return setError("Please enter your email");
    }
    if (name == "") {
      return setError("Please enter your name");
    }
    if (password == "") {
      return setError("Please enter your password");
    }
    if (!email.includes("@")) {
      return setError("Email is not valid");
    }
    if (email.length < 6) {
      return setError("Email is too short");
    }
    if (password.length < 5) {
      return setError("Password must be 6 characters long");
    }
    if (password != confirmPassword) {
      return setError("password does not match");
    }

    dispatch(signupUserAsync({ email, password, name, userType: "USER" }))
      .unwrap()
      .then((result) => {
        if (result.success) navigation.navigate("login");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar />
      <InternetConnectionAlert />
      <ProgressDialog visible={isloading} label={"Register ..."} />

      <TopBarContainer />
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <View style={styles.welconeContainer}>
          <Image
            style={styles.logo}
            source={require("@/assets/images/icon.png")}
          />
        </View>
        <View style={styles.screenNameContainer}>
          <View>
            <Text style={styles.screenNameText}>Sign up</Text>
          </View>
          <View>
            <Text style={styles.screenNameParagraph}>
              Create your account on ClothesShop to get an access to millions of
              products
            </Text>
          </View>
        </View>
        <View style={styles.formContainer}>
          <CustomAlert message={error} type={"error"} />
          <CustomInput
            value={name}
            setValue={setName}
            placeholder={"Name"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={email}
            setValue={setEmail}
            placeholder={"Email"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
            placeholder={"Password"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={confirmPassword}
            setValue={setConfirmPassword}
            secureTextEntry={true}
            placeholder={"Confirm Password"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
        </View>
      </ScrollView>
      <View style={styles.buttomContainer}>
        <CustomButton text={"Sign up"} onPress={signUpHandle} />
      </View>
      <View style={styles.bottomContainer}>
        <Text>Already have an account?</Text>
        <Text
          onPress={() => navigation.navigate("login")}
          style={styles.signupText}
        >
          Login
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    flex: 1,
  },
  welconeContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "15%",
  },
  formContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    padding: 5,
  },
  logo: {
    resizeMode: "contain",
    width: 80,
  },
  forgetPasswordContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  ForgetText: {
    fontSize: 15,
    fontWeight: "600",
  },
  buttomContainer: {
    width: "100%",
  },
  bottomContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    marginLeft: 2,
    color: colors.primary,
    fontSize: 15,
    fontWeight: "600",
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
});

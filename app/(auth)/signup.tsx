import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  Dimensions,
} from "react-native";
import { useNavigation } from "expo-router";
import ProgressDialog from "react-native-progress-dialog";

import { colors } from "@/constants";
import InternetConnectionAlert from "@/components/InternetConnectionAlert";
import TopBarAuth from "@/components/TopBar/TopBarAuth";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import CustomAlert from "@/components/CustomAlert/CustomAlert";
import { useAppDispatch } from "@/stores/hooks";
import { signupUserAsync } from "@/stores/features/user/user.slice";

import type { INavigationPropParams } from "@/types";
import type { IUser } from "@/types/auth";

const { width } = Dimensions.get("window");

export default function SignupScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<INavigationPropParams>();

  const [form, setForm] = useState<IUser>({
    email: "user@gmail.com",
    name: "user mock",
    password: "user1234",
    confirmPassword: "user1234",
  });
  const [error, setError] = useState<string | null>(null);
  const [isloading, setIsloading] = useState<boolean>(false);

  const setFormHandler = (value: string, key: string) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const errorSetHandler = (msg: string) => {
    setIsloading(false);
    setError(msg);
  };

  //method to post the user data to server for user signup using API call
  const signUpHandle = () => {
    const { email, name, password, confirmPassword } = form;

    setIsloading(true);
    setError(null);

    if (email?.trim().length == 0) {
      errorSetHandler("Please enter your email");
      return;
    }
    if (name?.trim().length == 0) {
      errorSetHandler("Please enter your name");
      return;
    }
    if (password?.trim().length == 0) {
      errorSetHandler("Please enter your password");
      return;
    }
    if (!email?.includes("@")) {
      errorSetHandler("Email is not valid");
      return;
    }
    if (email.length < 6) {
      errorSetHandler("Email is too short");
      return;
    }
    if (password?.trim().length! < 5) {
      errorSetHandler("Password must be 6 characters long");
      return;
    }
    if (password != confirmPassword) {
      errorSetHandler("password does not match");
      return;
    }

    dispatch(signupUserAsync({ email, password, name, userType: "USER" }))
      .unwrap()
      .then((result) => {
        if (result.success) navigation.replace("login");
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

      <TopBarAuth />
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
            value={form.name}
            setValue={(value: string) => setFormHandler(value, "name")}
            placeholder={"Name"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={form.email}
            setValue={(value: string) => setFormHandler(value, "email")}
            placeholder={"Email"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={form.password}
            setValue={(value: string) => setFormHandler(value, "password")}
            secureTextEntry={true}
            placeholder={"Password"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={form.confirmPassword}
            setValue={(value: string) =>
              setFormHandler(value, "confirmPassword")
            }
            secureTextEntry={true}
            placeholder={"Confirm Password"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton text={"Sign up"} onPress={signUpHandle} />
      </View>
      <View style={styles.bottomContainer}>
        <Text>Already have an account?</Text>
        <Text onPress={() => navigation.goBack()} style={styles.signupText}>
          Login
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.light,
    padding: 20,
  },
  welconeContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
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
    height: width / 2,
    width: width / 2,
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
  buttonContainer: {
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

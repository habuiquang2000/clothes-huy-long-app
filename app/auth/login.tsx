import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "expo-router";
import ProgressDialog from "react-native-progress-dialog";

import colors from "@/constants/Colors";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import CustomAlert from "@/components/CustomAlert/CustomAlert";
import InternetConnectionAlert from "@/components/InternetConnectionAlert";
import { useAppDispatch } from "@/stores/hooks";
import { loginUserAsync, setUserAsync } from "@/stores/features/user/userSlice";

import type { INavigationPropParams } from "@/types";

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<INavigationPropParams>();

  const [email, setEmail] = useState<string>("email@gmail.com");
  const [password, setPassword] = useState<string>("1234567");

  const [error, setError] = useState<string | null>(null);
  const [isloading, setIsloading] = useState<boolean>(false);

  //method to validate the user credentials and navigate to Home Screen / Dashboard
  const loginHandle = () => {
    setIsloading(true);
    setError(null);

    //[check validation] -- Start
    // if email does not contain @ sign
    if (email == "") {
      setIsloading(false);
      return setError("Please enter your email");
    }
    if (password == "") {
      setIsloading(false);
      return setError("Please enter your password");
    }
    if (!email.includes("@")) {
      setIsloading(false);
      return setError("Email is not valid");
    }
    // length of email must be greater than 5 characters
    if (email.length < 6) {
      setIsloading(false);
      return setError("Email is too short");
    }
    // length of password must be greater than 5 characters
    if (password.length < 6) {
      setIsloading(false);
      return setError("Password must be 6 characters long");
    }
    //[check validation] -- End

    dispatch(loginUserAsync({ email, password }))
      .unwrap()
      .then((result) => {
        if (
          result.status == 200 ||
          (result.status == 1 && result.success != false)
        ) {
          //check the user type if the type is ADMIN then navigate to Dashboard else navigate to User Home
          dispatch(setUserAsync(result.data))
            .unwrap()
            .then(() => {
              navigation.replace(
                result?.data?.userType == "ADMIN" ? "admin" : "(tabs)"
              ); // naviagte to Admin Dashboard
            });
        } else {
          return setError(result.message ?? null);
        }
      })
      .catch((error) => {
        setError(error?.message || error);
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar />
      <InternetConnectionAlert />
      <ProgressDialog visible={isloading} label={"Login ..."} />

      <ScrollView style={{ flex: 1, width: "100%" }}>
        <View style={styles.welconeContainer}>
          <View>
            <Text style={styles.welcomeText}>Welcome to ClothesShop</Text>
            <Text style={styles.welcomeParagraph}>Huy Long ecommerce shop</Text>
          </View>
          <View>
            <Image
              style={styles.logo}
              source={require("@/assets/images/icon.png")}
            />
          </View>
        </View>
        <View style={styles.screenNameContainer}>
          <Text style={styles.screenNameText}>Login</Text>
        </View>
        <View style={styles.formContainer}>
          <CustomAlert message={error} type={"error"} />
          <CustomInput
            value={email}
            setValue={setEmail}
            placeholder={"Username"}
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
          <View style={styles.forgetPasswordContainer}>
            <Text
              onPress={() => {
                navigation.navigate("forgetPassword");
              }}
              style={styles.ForgetText}
            >
              Forget Password?
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton text={"Login"} onPress={loginHandle} />
      </View>
      <View style={styles.bottomContainer}>
        <Text>Don't have an account?</Text>
        <Text
          onPress={() => {
            navigation.navigate("signup");
          }}
          style={styles.signupText}
        >
          signup
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
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  welconeContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "30%",
    padding: 15,
  },
  formContainer: {
    flex: 3,
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
  welcomeText: {
    fontSize: 42,
    fontWeight: "bold",
    color: colors.muted,
  },
  welcomeParagraph: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.primary_shadow,
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
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
});

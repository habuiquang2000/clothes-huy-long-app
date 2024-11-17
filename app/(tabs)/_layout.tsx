import React from "react";
import { Tabs } from "expo-router";
import { StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";

import colors from "@/constants/Colors";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const { width } = Dimensions.get("window");

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const tabsIconHandle = (routename: string, focused: boolean) => {
    switch (routename) {
      case "home": {
        return (
          <Image
            source={
              focused == true
                ? require("@/assets/icons/bar_home_icon_active.png")
                : require("@/assets/icons/bar_home_icon.png")
            }
            style={styles.tabIconStyle}
          />
        );
      }
      case "categories": {
        return (
          <TabBarIcon
            size={width / 15}
            name="apps-outline"
            color={colors[focused == true ? "primary" : "muted"]}
          />
        );
      }
      case "order": {
        return (
          <TabBarIcon
            size={width / 15}
            name="cart-outline"
            color={colors[focused == true ? "primary" : "muted"]}
          />
        );
      }
      case "profile": {
        return (
          <Image
            source={
              focused == true
                ? require("@/assets/icons/bar_profile_icon_active.png")
                : require("@/assets/icons/bar_profile_icon.png")
            }
            style={styles.tabIconStyle}
          />
        );
      }
      default: {
        return;
      }
    }
  };

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarHideOnKeyboard: true,

        tabBarStyle: [
          {
            display: "flex",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: colors.white,
          },
        ],

        // headerShown: false,
        tabBarShowLabel: false,
        // tabBarActiveTintColor: colors.primary,

        tabBarIcon: ({ focused }) => {
          const routename = route.name;

          return (
            <TouchableOpacity disabled>
              {tabsIconHandle(routename, focused)}
            </TouchableOpacity>
          );
        },
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarHideOnKeyboard: true,
          // tabBarIcon: ({ color, focused }) => (
          //   <TabBarIcon
          //     name={focused ? "home" : "home-outline"}
          //     color={color}
          //   />
          // ),
        }}
      />

      <Tabs.Screen name="categories" />
      <Tabs.Screen name="order" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIconStyle: {
    resizeMode: "stretch",
    width: width / 16,
    height: width / 16,
  },
});

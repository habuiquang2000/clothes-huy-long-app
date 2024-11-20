import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants";

import type { UserProfileCardProps } from "@/types/auth";

const { width } = Dimensions.get("window");

export default function UserProfileCard({
  name,
  email,
  avatarLinh,
}: UserProfileCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {!avatarLinh ? (
          <Ionicons name="person" size={width / 9} color={colors.primary} />
        ) : (
          <Ionicons name="person" size={width / 9} color={colors.primary} />
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.usernameText}>{name}</Text>
        <Text style={styles.secondaryText}>{email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  avatarContainer: {
    display: "flex",
    width: width / 5,
    height: width / 5,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary_light,
    borderRadius: "50%",
    padding: 10,
  },
  infoContainer: {
    display: "flex",
    width: "50%",

    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: colors.light,

    paddingLeft: 10,
  },
  usernameText: {
    fontWeight: "bold",
    fontSize: 25,
  },
  secondaryText: {
    fontWeight: "bold",
    fontSize: 12,
  },
});

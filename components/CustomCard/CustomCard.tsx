import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type GestureResponderEvent,
} from "react-native";
import React from "react";
import { colors } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

import type { CustomCardProps } from "@/types/card";

export default function CustomCard({
  title,
  value,
  iconName,
  onPress,
  type,
}: CustomCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.iconContainer, styles[`${type}`]]}>
        <Ionicons name={iconName} size={40} color={colors.white} />
      </View>
      <Text style={styles.cardPrimaryText}>{title}</Text>
      <Text style={styles.cardSecondaryText}>{value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    width: 170,
    height: 170,
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    margin: 5,
    elevation: 5,
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 5,
    padding: 5,
  },
  cardPrimaryText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardSecondaryText: {
    fontSize: 15,
    fontWeight: "800",
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.tertiary,
  },
  warning: {
    backgroundColor: colors.warning,
  },
  muted: {
    backgroundColor: colors.muted,
  },
});

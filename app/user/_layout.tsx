import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="details/[id]" />
      <Stack.Screen name="account" />
      <Stack.Screen name="wishlist" />
      <Stack.Screen name="updatePassword" />

      <Stack.Screen name="cart" />
    </Stack>
  );
}

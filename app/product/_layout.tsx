import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="details/[id]" />
      <Stack.Screen name="cart" />
      <Stack.Screen name="checkout" />

      <Stack.Screen name="orderConfirm" />
      <Stack.Screen name="orderDetail/[id]" />
    </Stack>
  );
}

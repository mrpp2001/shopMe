import { Stack } from "expo-router";
import React from "react";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      {/* <Stack.Screen name="cart" options={{ headerBackTitle: "Cart" }} /> */}
    </Stack>
  );
};

export default StackLayout;

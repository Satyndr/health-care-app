import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack initialRouteName="login">
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="otp"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;

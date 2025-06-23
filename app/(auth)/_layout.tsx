import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack
      initialRouteName="onboarding"
      screenOptions={{
        statusBarStyle: "dark",
      }}
    >
      <Stack.Screen
        name="onboarding"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="role"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="(doctor)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="(patient)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;

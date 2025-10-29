import { Stack } from "expo-router";
import React from "react";
import AuthProvider from "./AuthProvider";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false, animation: "none" }}>
        <Stack.Screen name={"Login"} />
        <Stack.Screen name={"Home"} />
        <Stack.Screen name={"CreatePost"} />
        <Stack.Screen name={"postView"} />
        <Stack.Screen name={"Profile"} /> 
        <Stack.Screen name={"Admin"} />
      </Stack>
    </AuthProvider>
  );
}

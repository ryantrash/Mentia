import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "none"}}>
      <Stack.Screen name={"Login"}/>
      <Stack.Screen name={"Home"}/>
      <Stack.Screen name={"CreatePost"}/>
      <Stack.Screen name={"PostView"}/>
    </Stack>
  );
}

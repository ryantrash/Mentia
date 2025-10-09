import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "none"}}>
      <Stack.Screen name={"index"}/>
      <Stack.Screen name={"createPost"}/>
      <Stack.Screen name={"postView"}/>
    </Stack>
  );
}

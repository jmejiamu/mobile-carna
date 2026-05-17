import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="(stack)"
        options={{
          headerShown: false,
        }}
      /> */}

      {/* <Stack.Screen
        name="(modal)"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      /> */}
    </Stack>
  );
}

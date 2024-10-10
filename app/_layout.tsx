import { Stack } from "expo-router";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

export default function RootLayout() {
  return (
    <ActionSheetProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="notification" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ActionSheetProvider>
  );
}

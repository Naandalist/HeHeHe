import { Stack } from "expo-router";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { LogBox } from "react-native";

export default function RootLayout() {
  LogBox.ignoreLogs(["Possible unhandled promise rejection"]);
  return (
    <ActionSheetProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ActionSheetProvider>
  );
}



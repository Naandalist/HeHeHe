import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function FreshScreen() {
  return (
    <View style={styles.container}>
      <Text>FreshScreen Screen is blank! 😀</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

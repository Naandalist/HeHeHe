import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function MedaliScreen() {
  return (
    <View style={styles.container}>
      <Text>MedaliScreen Screen is blank! 😀</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

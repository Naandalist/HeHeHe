import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function SavedScreen() {
  return (
    <View style={styles.container}>
      <Text>SavedScreen is blank! 😀</Text>
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

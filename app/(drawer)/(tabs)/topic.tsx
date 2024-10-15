import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function TopicContent() {
  return (
    <View style={styles.tabContent}>
      <Text style={styles.text}>Topik Content</Text>
    </View>
  );
}

function HasJoinContent() {
  return (
    <View style={styles.tabContent}>
      <Text style={styles.text}>Sudah Gabung Content</Text>
    </View>
  );
}

function TopicTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#f0f0f0',
          paddingTop: 50,
        },
        tabBarActiveTintColor: '#65a4ec',
        tabBarInactiveTintColor: '#000000',
        tabBarIndicatorStyle: {
          backgroundColor: '#65a4ec',
        },
      }}
    >
      <Tab.Screen name="Topik" component={TopicContent} />
      <Tab.Screen name="Sudah Gabung" component={HasJoinContent} />
    </Tab.Navigator>
  );
}

export default function TopicScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <View style={styles.container}>
      <TopicTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  text: {
    color: '#25292e',
  },
  bannerContainer: {
    backgroundColor: '#1e3a5f',
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  bannerText: {
    color: '#fff',
    textAlign: 'center',
  },
});

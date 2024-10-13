import { Text, View, StyleSheet } from "react-native";
import React from "react";
import HomeScreen from "@/screens/HomeScreen";
import { Colors, FontWeight } from "@/constants";
import {
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import FreshScreen from "../fresh";
import TrendingScreen from "../trending";

const Tab = createMaterialTopTabNavigator();

const tabOptions = (label: string): MaterialTopTabNavigationOptions => ({
  tabBarLabel: ({ color, focused }) => (
    <Text
      style={[styles.tabLabel, { color }, focused && styles.tabLabelFocused]}
    >
      {label}
    </Text>
  ),
});

export default function Index() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: false,
          tabBarStyle: {
            backgroundColor: Colors.PLAIN,
            borderTopWidth: 1,
            borderTopColor: Colors.SEMI_TRANSPARENT_BLACK,
          },
          tabBarActiveTintColor: Colors.PRIMARY,
          tabBarInactiveTintColor: Colors.FILL_3,
          tabBarIndicatorStyle: {
            backgroundColor: Colors.PRIMARY,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={tabOptions("Home")}
        />
        <Tab.Screen
          name="Fresh"
          component={FreshScreen}
          options={tabOptions("Fresh ")}
        />
        <Tab.Screen
          name="Trending"
          component={TrendingScreen}
          options={tabOptions("Trending ")}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabLabel: {
    fontWeight: FontWeight.MEDIUM,
  },
  tabLabelFocused: {
    fontWeight: FontWeight.EXTRA_BOLD,
  },
});

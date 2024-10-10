import { Text, View, StyleSheet, useColorScheme } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "@/screens/HomeScreen";

const Tab = createMaterialTopTabNavigator();

// function HomeScreen() {
//   return (
//     <View style={styles.tabContent}>
//       <Text style={styles.text}>Home Content</Text>
//     </View>
//   );
// }

function FreshScreen() {
  return (
    <View style={styles.tabContent}>
      <Text style={styles.text}>Fresh Content</Text>
    </View>
  );
}

function TrendingScreen() {
  return (
    <View style={styles.tabContent}>
      <Text style={styles.text}>Trending Content</Text>
    </View>
  );
}

export default function Index() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#FFF",
            // paddingTop: 50,
            borderTopWidth: 1, // Add border width
            borderTopColor: "#000", // Add border color
          },
          tabBarActiveTintColor: "#65a4ec",
          tabBarInactiveTintColor: "#000000",
          tabBarIndicatorStyle: {
            backgroundColor: "#65a4ec",
          },
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Fresh" component={FreshScreen} />
        <Tab.Screen name="Trending" component={TrendingScreen} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#25292e",
  },
  tabContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  text: {
    color: "#25292e",
  },
  bannerContainer: {
    backgroundColor: "#1e3a5f",
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  bannerText: {
    color: "#fff",
    textAlign: "center",
  },
});

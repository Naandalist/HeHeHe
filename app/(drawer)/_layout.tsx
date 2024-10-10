import { Drawer } from "expo-router/drawer";
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Gap from "@/components/Gap";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        // headerTitle: "",
        header: ({ navigation }) => (
          <View style={styles.header}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pressable
                onPress={() => navigation.toggleDrawer()}
                style={styles.menuButton}
              >
                <Ionicons name="menu" size={24} color="black" />
              </Pressable>
              <Gap width={10} />
              <Text style={styles.logoText}>LAHELU</Text>
            </View>
            <Pressable style={styles.searchButton}>
              <Ionicons name="search" size={24} color="black" />
            </Pressable>
          </View>
        ),
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Home",
          title: "Home",
        }}
      />
      <Drawer.Screen
        name="notification"
        options={{
          drawerLabel: "Notification",
          title: "Outside 1",
        }}
      />
      <Drawer.Screen
        name="search"
        options={{
          drawerLabel: "Search",
          title: "Search",
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: "#FFF",
  },
  menuButton: {
    // padding: 5,
    // backgroundColor: "green",
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    // backgroundColor: "pink",
  },
  searchButton: {
    // padding: 5,
    // backgroundColor: "yellow",
  },
});

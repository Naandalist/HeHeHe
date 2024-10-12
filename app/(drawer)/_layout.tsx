import React from "react";
import { Drawer } from "expo-router/drawer";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing } from "@/constants";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Gap from "@/components/gap";
import CustomDrawerContent from "@/components/drawer-content";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          header: ({ navigation }) => (
            <View style={styles.header}>
              <View style={styles.leftGroup}>
                <Pressable onPress={() => navigation.toggleDrawer()}>
                  <Ionicons name="menu" size={24} color="black" />
                </Pressable>
                <Gap width={20} />
                <Image
                  source={require("../../assets/images/LAHELU.png")}
                  style={{ height: 20, width: 100 }}
                />
              </View>
              <Pressable>
                <Ionicons name="search" size={24} color="black" />
              </Pressable>
            </View>
          ),
        }}
      >
        <Drawer.Screen name="(tabs)" options={{ drawerLabel: "Home" }} />
        <Drawer.Screen name="fresh" options={{ drawerLabel: "Fresh" }} />
        <Drawer.Screen name="trending" options={{ drawerLabel: "Trending" }} />
        <Drawer.Screen name="topic" options={{ drawerLabel: "Topic" }} />
        <Drawer.Screen name="ranking" options={{ drawerLabel: "Peringkat" }} />
        <Drawer.Screen name="saved" options={{ drawerLabel: "Tersimpan" }} />
        <Drawer.Screen name="random" options={{ drawerLabel: "Acak" }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: Spacing.SPACE_M,
    backgroundColor: Colors.PLAIN,
  },
  leftGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter, Href } from "expo-router";

interface MenuItem {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: Href<string>;
}

interface Section {
  title: string;
  items: MenuItem[];
}

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const pathname = usePathname();
  const router = useRouter();

  const sections: Section[] = [
    {
      title: "",
      items: [
        { label: "Home", icon: "home-outline", route: "/" as Href<string> },
        {
          label: "Fresh",
          icon: "time-outline",
          route: "/fresh" as Href<string>,
        },
        {
          label: "Trending",
          icon: "trending-up-outline",
          route: "/trending" as Href<string>,
        },
        {
          label: "Topic",
          icon: "people-outline",
          route: "/topic" as Href<string>,
        },
      ],
    },
    {
      title: "Meme lain",
      items: [
        {
          label: "Peringkat",
          icon: "trophy-outline",
          route: "/ranking" as Href<string>,
        },
        {
          label: "Tersimpan",
          icon: "bookmark-outline",
          route: "/saved" as Href<string>,
        },
        {
          label: "Acak",
          icon: "shuffle-outline",
          route: "/random" as Href<string>,
        },
      ],
    },
    {
      title: "Jelajah",
      items: [
        {
          label: "Donatur",
          icon: "heart-outline",
          route: "/donatur" as Href<string>,
        },
        {
          label: "Medali",
          icon: "medal-outline",
          route: "/medali" as Href<string>,
        },
        {
          label: "Toko koin",
          icon: "cash-outline",
          route: "/toko-koin" as Href<string>,
        },
        {
          label: "Discord",
          icon: "logo-discord",
          route: "/discord" as Href<string>,
        },
      ],
    },
  ];

  const isActive = (route: Href<string>) => {
    if (route === "/" && pathname === "(tabs)") return true;
    return pathname === route;
  };

  const handleNavigation = (route: Href<string>) => {
    router.push(route);
    props.navigation.closeDrawer();
  };

  const renderSection = (section: Section) => (
    <View key={section.title} style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {section.items.map((item, index) => {
        const active = isActive(item.route);
        return (
          <Pressable
            key={index}
            style={[styles.menuItem, active && styles.activeMenuItem]}
            onPress={() => handleNavigation(item.route)}
          >
            <Ionicons
              name={item.icon}
              size={24}
              color={active ? "#4285F4" : "black"}
            />
            <Text
              style={[styles.menuItemText, active && styles.activeMenuItemText]}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );

  return (
    <DrawerContentScrollView {...props}>
      {sections.map(renderSection)}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  activeMenuItem: {
    backgroundColor: "#E8F0FE",
  },
  menuItemText: {
    marginLeft: 15,
    fontSize: 16,
  },
  activeMenuItemText: {
    color: "#4285F4",
    fontWeight: "bold",
  },
});

export default CustomDrawerContent;
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter, Href } from 'expo-router';
import { styles } from './style';

interface MenuItem {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: Href<string>;
}

interface Section {
  title: string;
  items: MenuItem[];
}

function CustomDrawerContent({ navigation }: DrawerContentComponentProps) {
  const pathname = usePathname();
  const router = useRouter();

  const sections: Section[] = [
    {
      title: '',
      items: [
        { label: 'Home', icon: 'home-outline', route: '/' as Href<string> },
        { label: 'Fresh', icon: 'time-outline', route: '/fresh' as Href<string> },
        { label: 'Trending', icon: 'trending-up-outline', route: '/trending' as Href<string> },
        { label: 'Topic', icon: 'people-outline', route: '/topic' as Href<string> },
      ],
    },
    {
      title: 'Meme lain',
      items: [
        { label: 'Peringkat', icon: 'trophy-outline', route: '/ranking' as Href<string> },
        { label: 'Tersimpan', icon: 'bookmark-outline', route: '/saved' as Href<string> },
        { label: 'Acak', icon: 'shuffle-outline', route: '/random' as Href<string> },
      ],
    },
    {
      title: 'Jelajah',
      items: [
        { label: 'Donatur', icon: 'heart-outline', route: '/donatur' as Href<string> },
        { label: 'Medali', icon: 'medal-outline', route: '/medali' as Href<string> },
        { label: 'Toko koin', icon: 'cash-outline', route: '/toko-koin' as Href<string> },
        { label: 'Discord', icon: 'logo-discord', route: '/discord' as Href<string> },
      ],
    },
  ];

  const isActive = (route: Href<string>) => {
    if (route === '/' && pathname === '(tabs)') return true;
    return pathname === route;
  };

  const handleNavigation = (route: Href<string>) => {
    router.push(route);
    navigation.closeDrawer();
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
            <Ionicons name={item.icon} size={24} color={active ? '#4285F4' : 'black'} />
            <Text style={[styles.menuItemText, active && styles.activeMenuItemText]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );

  return <DrawerContentScrollView>{sections.map(renderSection)}</DrawerContentScrollView>;
}

export default CustomDrawerContent;

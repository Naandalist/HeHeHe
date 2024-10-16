import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CustomDrawerContent, CustomDrawerHeader } from '@/components';
import { DrawerContentComponentProps, DrawerHeaderProps } from '@react-navigation/drawer';

function Header({ navigation }: DrawerHeaderProps) {
  return <CustomDrawerHeader navigation={navigation} />;
}

function DrawerContent({ state, navigation, descriptors }: DrawerContentComponentProps) {
  return <CustomDrawerContent state={state} navigation={navigation} descriptors={descriptors} />;
}

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          swipeEnabled: false,
          header: Header,
        }}
        drawerContent={DrawerContent}
      >
        <Drawer.Screen name="(tabs)" options={{ drawerLabel: 'Home' }} />
        <Drawer.Screen name="fresh" options={{ drawerLabel: 'Fresh' }} />
        <Drawer.Screen name="trending" options={{ drawerLabel: 'Trending' }} />
        <Drawer.Screen name="topic" options={{ drawerLabel: 'Topic' }} />
        <Drawer.Screen name="ranking" options={{ drawerLabel: 'Peringkat' }} />
        <Drawer.Screen name="saved" options={{ drawerLabel: 'Tersimpan' }} />
        <Drawer.Screen name="random" options={{ drawerLabel: 'Acak' }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
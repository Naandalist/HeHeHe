import React, { useState } from 'react';
import { Pressable, Alert } from 'react-native';
import { Tabs } from 'expo-router';
import { Colors } from '@/constants';
import { IconTabBar, WelcomeModal } from '@/components';

const handlePress = (tabName: string) => {
  Alert.alert(`${tabName} pressed`, "This tab doesn't navigate to anywhere.");
};

function AddPostTab(props: any) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Pressable {...props} onPress={() => setModalVisible(true)} />
      <WelcomeModal isVisible={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
}

function NotificationTab(props: any) {
  return <Pressable {...props} onPress={() => handlePress('notification')} />;
}

function ProfileTab(props: any) {
  return <Pressable {...props} onPress={() => handlePress('Profile')} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <IconTabBar name="home-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="topic"
        options={{
          title: 'Topic',
          headerShown: false,
          tabBarIcon: ({ color }) => <IconTabBar name="people-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="add-post"
        options={{
          title: 'Add New Post',
          headerShown: false,
          tabBarIcon: ({ color }) => <IconTabBar name="add-circle-outline" color={color} />,
          tabBarButton: AddPostTab,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: 'Notification',
          headerShown: false,
          tabBarIcon: ({ color }) => <IconTabBar name="notifications-outline" color={color} />,
          tabBarButton: NotificationTab,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconTabBar name="person-circle-outline" color={color} />,
          tabBarButton: ProfileTab,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
    </Tabs>
  );
}

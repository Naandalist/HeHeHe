import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Alert } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Colors } from '@/constants';

export default function TabLayout() {
  const { showActionSheetWithOptions } = useActionSheet();

  const openActionSheet = () => {
    const options = [
      '0 koin',
      'hurairaalistisa384',
      'Lahelu Plus',
      'Tersimpan',
      'Koin gratis',
      'Logout',
      'Pengaturan',
      'Hubungi kami',
      'Cancel',
    ];
    const cancelButtonIndex = options.length - 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex: 5, // Index for 'Logout'
      },
      (selectedIndex: number | undefined) => {
        switch (selectedIndex) {
          case 0:
            // Handle '0 koin'
            break;
          case 1:
            // Handle 'hurairaalistisa384'
            break;
          case 2:
            // Handle 'Lahelu Plus'
            break;
          case 3:
            // Handle 'Tersimpan'
            break;
          case 4:
            // Handle 'Koin gratis'
            break;
          case 5:
            // Handle 'Logout'
            break;
          case 6:
            // Handle 'Pengaturan'
            break;
          case 7:
            // Handle 'Hubungi kami'
            break;
          // Add cases for other options as needed
        }
      },
    );
  };

  const handlePress = (tabName: string) => {
    Alert.alert(`${tabName} pressed`, "This tab doesn't navigate to a new screen.");
  };

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
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="topic"
        options={{
          title: 'Topic',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={'people-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-post"
        options={{
          title: 'Add New Post',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="add-circle-outline" color={color} size={24} />,
          tabBarButton: (props) => <Pressable {...props} onPress={() => handlePress('Add Post')} />,
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
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications-outline" color={color} size={24} />
          ),
          tabBarButton: (props) => (
            <Pressable {...props} onPress={() => handlePress('notification')} />
          ),
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
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" color={color} size={24} />
          ),
          tabBarButton: (props) => <Pressable {...props} onPress={() => openActionSheet()} />,
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

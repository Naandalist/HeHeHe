import { Pressable, Alert } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { Colors } from '@/constants';

const handlePress = (tabName: string) => {
  Alert.alert(`${tabName} pressed`, "This tab doesn't navigate to a new screen.");
};

function AddPostTab(props: any) {
  return <Pressable {...props} onPress={() => handlePress('Add Post')} />;
}

function NotificationTab(props: any) {
  return <Pressable {...props} onPress={() => handlePress('notification')} />;
}

function ProfileTab(props: any) {
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
          default:
          // Handle default
        }
      },
    );
  };

  return <Pressable {...props} onPress={openActionSheet} />;
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
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="topic"
        options={{
          title: 'Topic',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="people-outline" color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="add-post"
        options={{
          title: 'Add New Post',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="add-circle-outline" color={color} size={24} />,
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
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications-outline" color={color} size={24} />
          ),
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
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" color={color} size={24} />
          ),
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

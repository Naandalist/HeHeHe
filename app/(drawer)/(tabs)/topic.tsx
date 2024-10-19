import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { BlankScreen } from '@/screens';
import { Colors, Spacing } from '@/constants';

const Tab = createMaterialTopTabNavigator();

function TopicContent() {
  return <BlankScreen screenName="Topik" />;
}

function HasJoinContent() {
  return <BlankScreen screenName="Has Joined" />;
}

function TopicTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.GREY,
          paddingTop: Spacing.SPACE_2XS,
        },
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInactiveTintColor: Colors.FILL_2,
        tabBarIndicatorStyle: {
          backgroundColor: Colors.PRIMARY,
        },
      }}
    >
      <Tab.Screen name="Topik" component={TopicContent} />
      <Tab.Screen name="Sudah Gabung" component={HasJoinContent} />
    </Tab.Navigator>
  );
}

export default function TopicScreen() {
  return (
    <View style={{ flex: 1 }}>
      <TopicTabs />
    </View>
  );
}

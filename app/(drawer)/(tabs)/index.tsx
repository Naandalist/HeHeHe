import { View } from 'react-native';
import {
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import { Colors } from '@/constants';
import { CustomTabLabel } from '@/components';
import HomeScreen from '@/screens/HomeScreen';
import FreshScreen from '../fresh';
import TrendingScreen from '../trending';

const Tab = createMaterialTopTabNavigator();

const tabOptions = (label: string): MaterialTopTabNavigationOptions => ({
  tabBarLabel: ({ color, focused }) => (
    <CustomTabLabel label={label} color={color} focused={focused} />
  ),
});

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: false,
          tabBarStyle: {
            backgroundColor: Colors.PLAIN,
            borderTopWidth: 1,
            borderTopColor: Colors.SEMI_TRANSPARENT_BLACK,
          },
          tabBarActiveTintColor: Colors.PRIMARY,
          tabBarInactiveTintColor: Colors.FILL_3,
          tabBarIndicatorStyle: {
            backgroundColor: Colors.PRIMARY,
          },
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={tabOptions('Home')} />
        <Tab.Screen name="Fresh" component={FreshScreen} options={tabOptions('Fresh ')} />
        <Tab.Screen name="Trending" component={TrendingScreen} options={tabOptions('Trending ')} />
      </Tab.Navigator>
    </View>
  );
}

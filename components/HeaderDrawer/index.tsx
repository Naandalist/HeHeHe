import { View, Pressable, Image } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';
import logoImage from '../../assets/images/HEHEHE.png';

type CustomDrawerHeaderProps = {
  navigation: DrawerNavigationProp<any>;
};

export default function CustomDrawerHeader({ navigation }: CustomDrawerHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.leftGroup}>
        <Pressable onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="menu" size={24} color="black" />
        </Pressable>
        <Image source={logoImage} style={styles.logo} />
      </View>
      <Pressable>
        <Ionicons name="search" size={24} color="black" />
      </Pressable>
    </View>
  );
}

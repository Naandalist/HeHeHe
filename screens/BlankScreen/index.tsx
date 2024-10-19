import { Text, View } from 'react-native';
import styles from './style';

interface BlankScreenProps {
  screenName: string;
}

export default function BlankScreen({ screenName }: BlankScreenProps) {
  return (
    <View style={styles.container}>
      <Text>{screenName} Screen is blank! 😀</Text>
    </View>
  );
}

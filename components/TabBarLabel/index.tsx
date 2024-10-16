import { Text } from 'react-native';
import { styles } from './style';

interface CustomTabLabelProps {
  label: string;
  color: string;
  focused: boolean;
}

export default function CustomTabLabel({ label, color, focused }: CustomTabLabelProps) {
  return (
    <Text style={[styles.tabLabel, { color }, focused && styles.tabLabelFocused]}>{label}</Text>
  );
}

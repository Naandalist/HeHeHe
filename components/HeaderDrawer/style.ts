import { Colors, Spacing } from '@/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: Spacing.SPACE_M,
    backgroundColor: Colors.PLAIN,
  },
  leftGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 20,
    width: 100,
    marginHorizontal: 12,
  },
});

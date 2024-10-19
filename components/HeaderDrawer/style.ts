import { Colors, LogoSize, Spacing } from '@/constants';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.SPACE_M,
    paddingTop: Spacing.SPACE_G,
    paddingBottom: Spacing.SPACE_M,
    backgroundColor: Colors.PLAIN,
  },
  leftGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: LogoSize.height,
    width: LogoSize.width,
    marginHorizontal: Spacing.SPACE_S,
  },
});

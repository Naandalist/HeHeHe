import { Colors, FontSizes, FontWeight, Spacing } from '@/constants';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  section: {
    marginBottom: Spacing.SPACE_L,
  },
  sectionTitle: {
    fontSize: Spacing.SPACE_M,
    fontWeight: FontWeight.BOLD,
    marginLeft: Spacing.SPACE_M,
    marginBottom: Spacing.SPACE_M,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.SPACE_XS,
    paddingHorizontal: Spacing.SPACE_M,
  },
  activeMenuItem: {
    backgroundColor: Colors.PRIMARY,
  },
  menuItemText: {
    marginLeft: Spacing.SPACE_M,
    fontSize: FontSizes.M,
    color: Colors.FILL_2,
  },
  activeMenuItemText: {
    color: Colors.PLAIN,
    fontWeight: FontWeight.BOLD,
  },
});

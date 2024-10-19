import { BorderRadius, Colors, FontSizes, FontWeight, IconSize, Spacing } from '@/constants';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.SPACE_XS,
  },
  likeAndDislike: {
    flexDirection: 'row',
    borderRadius: BorderRadius.M,
    borderColor: Colors.FILL_5,
    borderWidth: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.SPACE_XS,
    paddingHorizontal: Spacing.SPACE_S,
  },
  buttonComment: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.SPACE_XS,
    paddingHorizontal: Spacing.SPACE_S,
    borderRadius: BorderRadius.M,
    borderColor: Colors.FILL_5,
    borderWidth: 1,
    marginLeft: Spacing.SPACE_XS,
  },
  buttonShare: {
    alignItems: 'center',
    paddingVertical: Spacing.SPACE_XS,
    paddingHorizontal: Spacing.SPACE_S,
    borderRadius: BorderRadius.M,
    borderColor: Colors.FILL_5,
    borderWidth: 1,
  },
  icon: {
    width: IconSize,
    height: IconSize,
    tintColor: Colors.TINT_COLOR,
  },
  buttonText: {
    marginLeft: Spacing.SPACE_2XS,
    fontSize: FontSizes.S,
    color: Colors.TINT_COLOR,
    fontWeight: FontWeight.BOLD,
  },
});

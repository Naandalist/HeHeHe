import { StyleSheet } from 'react-native';
import { BorderRadius, Colors, FontSizes, FontWeight, Spacing } from '@/constants';

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.DISABLED_BACKGROUND,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: BorderRadius.L,
    paddingHorizontal: Spacing.SPACE_3XL,
    paddingVertical: Spacing.SPACE_M,
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: Spacing.SPACE_M,
    borderRadius: BorderRadius.FULL,
  },
  modalTitle: {
    marginBottom: Spacing.SPACE_S,
    textAlign: 'center',
    fontSize: Spacing.SPACE_L,
    fontWeight: FontWeight.BOLD,
  },
  modalText: {
    marginBottom: Spacing.SPACE_M,
    textAlign: 'center',
    color: Colors.FILL_3,
    fontSize: FontSizes.XS,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.PLAIN,
    borderWidth: 1,
    borderColor: Colors.FILL_4,
    paddingVertical: Spacing.SPACE_S,
    paddingHorizontal: Spacing.SPACE_3XL,
    borderRadius: BorderRadius.M,
  },
  googleIcon: {
    marginRight: Spacing.SPACE_XS,
  },
  googleButtonText: {
    color: Colors.FILL_3,
    fontSize: FontSizes.M,
    fontWeight: FontWeight.BOLD,
  },
});

import { StyleSheet, Dimensions } from 'react-native';
import { BorderRadius, Colors, FontSizes, FontWeight, Spacing, avaSize } from '@/constants';

const { width: screenWidth } = Dimensions.get('window');

export default StyleSheet.create({
  post: {
    marginBottom: Spacing.SPACE_2XS,
    backgroundColor: Colors.WHITE,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.SPACE_S,
  },
  avatar: {
    width: avaSize,
    height: avaSize,
    marginRight: Spacing.SPACE_S,
  },
  username: {
    fontWeight: 'bold',
    marginRight: Spacing.SPACE_S,
    fontSize: FontSizes.S,
    color: Colors.FILL_1,
  },
  date: {
    color: Colors.FILL_2,
    fontSize: FontSizes.XS,
  },
  title: {
    marginHorizontal: Spacing.SPACE_M,
    marginBottom: Spacing.SPACE_S,
    fontWeight: FontWeight.BOLD,
    fontSize: Spacing.SPACE_M,
  },
  mediaContainer: {
    backgroundColor: Colors.FILL_6,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  videoWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    flex: 1,
    width: '100%',
  },
  postFooter: {
    padding: Spacing.SPACE_XS,
  },
  caption: {
    marginHorizontal: Spacing.SPACE_M,
  },
  hashtag: {
    color: Colors.FILL_1,
    marginRight: Spacing.SPACE_XS,
    borderRadius: BorderRadius.XXL,
    paddingHorizontal: Spacing.SPACE_L,
    paddingVertical: Spacing.SPACE_2XS,
    fontSize: FontSizes.S,
    fontWeight: FontWeight.MEDIUM,
    borderColor: Colors.FILL_5,
    borderWidth: 1,
  },
  sawerButton: {
    backgroundColor: Colors.ORANGE,
    color: Colors.PLAIN,
    marginRight: Spacing.SPACE_XS,
    borderRadius: BorderRadius.XXL,
    paddingHorizontal: Spacing.SPACE_L,
    paddingVertical: Spacing.SPACE_2XS,
    fontSize: FontSizes.S,
    fontWeight: FontWeight.MEDIUM,
  },
  muteButton: {
    position: 'absolute',
    bottom: Spacing.SPACE_L,
    right: Spacing.SPACE_S,
    backgroundColor: Colors.SEMI_TRANSPARENT_BLACK,
    borderRadius: BorderRadius.XXL,
    padding: Spacing.SPACE_2XS,
    zIndex: 5,
  },
  playButton: {
    position: 'absolute',
    paddingHorizontal: screenWidth / 2,
    paddingVertical: '31%',
  },
  playButtonOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
    position: 'absolute',
  },
  sliderContainer: {
    position: 'absolute',
    bottom: -Spacing.SPACE_M,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 2,
    marginLeft: -Spacing.SPACE_M,
    paddingRight: Spacing.SPACE_S,
    paddingVertical: Spacing.SPACE_XS,
  },
  slider: {
    width: '110%',
  },
});

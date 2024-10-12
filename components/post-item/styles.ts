import { StyleSheet } from "react-native";
import {
  BorderRadius,
  Colors,
  FontSizes,
  FontWeight,
  Spacing,
} from "@/constants";

export const styles = StyleSheet.create({
  post: {
    marginBottom: Spacing.SPACE_2XS,
    backgroundColor: Colors.WHITE,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.SPACE_S,
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: Spacing.SPACE_S,
  },
  username: {
    fontWeight: "bold",
    marginRight: Spacing.SPACE_S,
    fontSize: FontSizes.S,
    color: Colors.FILL_1,
  },
  date: {
    color: Colors.FILL_2,
    fontSize: FontSizes.XS,
  },
  title: {
    marginHorizontal: 16,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  mediaContainer: {
    backgroundColor: Colors.FILL_6,
    justifyContent: "center",
    alignItems: "center",
  },
  videoWrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  media: {
    flex: 1,
    width: "100%",
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
    position: "absolute",
    bottom: Spacing.SPACE_S,
    right: Spacing.SPACE_S,
    backgroundColor: Colors.SEMI_TRANSPARENT_BLACK,
    borderRadius: BorderRadius.XXL,
    padding: Spacing.SPACE_2XS,
  },
  playButton: {
    position: "absolute",
    backgroundColor: Colors.SEMI_TRANSPARENT_BLACK,
    borderRadius: BorderRadius.XXL,
  },
});

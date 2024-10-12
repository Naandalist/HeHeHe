import { Colors, Spacing } from "@/constants";
import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  post: {
    marginBottom: 15,
    backgroundColor: Colors.WHITE,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    zIndex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    marginRight: 10,
  },
  date: {
    color: Colors.FILL_1,
  },
  mediaContainer: {
    width: "100%",
    height: screenWidth,
    backgroundColor: Colors.FILL_1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenZoomable: {
    width: "100%",
    height: "100%",
  },
  videoWrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  media: {
    width: "100%",
    height: "100%",
  },
  postFooter: {
    padding: 10,
    zIndex: 1,
  },
  caption: {
    marginBottom: 5,
  },
  hashtags: {
    flexDirection: "row",
    marginBottom: 10,
  },
  hashtag: {
    color: Colors.FILL_1,
    marginRight: 5,
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    marginRight: 15,
  },
  muteButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: Colors.SEMI_TRANSPARENT_BLACK,
    borderRadius: 20,
    padding: 5,
  },
  loader: {
    paddingBottom: Spacing.SPACE_XL,
    paddingTop: Spacing.SPACE_S,
  },
});

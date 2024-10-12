import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import {
  BorderRadius,
  Colors,
  FontSizes,
  FontWeight,
  Spacing,
} from "@/constants";
import Gap from "../gap";
import { PostInfo } from "@/types";

interface ActionButtonsProps {
  item: PostInfo;
}
const ActionButtons: React.FC<ActionButtonsProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View style={styles.likeAndDislike}>
          <TouchableOpacity style={styles.button}>
            <Image
              source={require("../../assets/images/arrow-big-up.png")}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>{item.totalUpvotes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image
              source={require("../../assets/images/arrow-big-down.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <Gap width={10} />
        <TouchableOpacity style={styles.buttonComment}>
          <Image
            source={require("../../assets/images/message-square-text.png")}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>{item.totalUpvotes}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.buttonShare}>
        <Image
          source={require("../../assets/images/forward.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.SPACE_XS,
  },
  likeAndDislike: {
    flexDirection: "row",
    borderRadius: BorderRadius.M,
    borderColor: Colors.FILL_5,
    borderWidth: 1,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.SPACE_XS,
    paddingHorizontal: Spacing.SPACE_S,
  },
  buttonComment: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.SPACE_XS,
    paddingHorizontal: Spacing.SPACE_S,
    borderRadius: BorderRadius.M,
    borderColor: Colors.FILL_5,
    borderWidth: 1,
  },
  buttonShare: {
    alignItems: "center",
    paddingVertical: Spacing.SPACE_XS,
    paddingHorizontal: Spacing.SPACE_S,
    borderRadius: BorderRadius.M,
    borderColor: Colors.FILL_5,
    borderWidth: 1,
  },
  icon: {
    width: 20,
    height: 24,
    tintColor: Colors.TINT_COLOR,
  },
  buttonText: {
    marginLeft: Spacing.SPACE_2XS,
    fontSize: FontSizes.S,
    tintColor: Colors.TINT_COLOR,
    fontWeight: FontWeight.BOLD,
  },
});

export default ActionButtons;

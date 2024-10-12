import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import { Image } from "expo-image";
import { Video, ResizeMode } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { PostInfo } from "@/types";
import { styles } from "./styles";
import uuid from "react-native-uuid";
import ActionButtons from "./action-button";

interface PostItemProps {
  item: PostInfo;
  isMuted: boolean;
  toggleMute: () => void;
  videoRef: (ref: Video | null) => void;
}

const { width: screenWidth } = Dimensions.get("window");

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const PostItem: React.FC<PostItemProps> = ({
  item,
  isMuted,
  toggleMute,
  videoRef,
}) => {
  // Calculate media container dimensions for 4:3 aspect ratio
  const containerWidth = screenWidth;
  const containerHeight = (screenWidth / 4) * 3;

  return (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
        <Text style={styles.username}>{item.userUsername}</Text>
        <Text style={styles.date}>{item.createTime}</Text>
      </View>
      <Text
        style={{
          marginHorizontal: 16,
          marginBottom: 10,
          fontWeight: "bold",
          fontSize: 16,
        }}
      >
        {item.title}
      </Text>
      <View
        style={[
          styles.mediaContainer,
          { width: containerWidth, height: containerHeight },
        ]}
      >
        {item.mediaType === 0 ? (
          <Image
            source={{ uri: item.media }}
            style={styles.media}
            placeholder={{ blurhash }}
            contentFit="contain"
            transition={1000}
          />
        ) : (
          <View style={styles.videoWrapper}>
            <Video
              ref={videoRef}
              source={{ uri: item.media }}
              style={styles.media}
              resizeMode={ResizeMode.CONTAIN}
              isLooping={true}
              isMuted={isMuted}
              useNativeControls={false}
            />
            <TouchableOpacity style={styles.muteButton} onPress={toggleMute}>
              <Ionicons
                name={isMuted ? "volume-mute" : "volume-medium"}
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.postFooter}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10 }}
        >
          <TouchableOpacity>
            <Text style={styles.sawerButton}>$ Sawer</Text>
          </TouchableOpacity>
          {item.hashtags.map((tag, index) => {
            return (
              <TouchableOpacity key={`${item.postID}-${tag}-${index}`}>
                <Text style={styles.hashtag}>{`#  ${tag}`}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <ActionButtons />
      </View>
    </View>
  );
};

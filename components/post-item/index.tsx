import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { Video, ResizeMode } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { PostInfo } from "@/types";
import { styles } from "./styles";
import ActionButtons from "./action-button";

interface PostItemProps {
  item: PostInfo;
  isPlaying: boolean;
  isMuted: boolean;
  toggleMute: (postId: string, mute: boolean) => void;
  videoRef: (ref: Video | null) => void;
}

const { width: screenWidth } = Dimensions.get("window");

// Blurhash placeholder for images
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const PostItem: React.FC<PostItemProps> = ({
  item,
  isPlaying,
  isMuted,
  toggleMute,
  videoRef,
}) => {
  // Calculate media container dimensions for 4:3 aspect ratio
  const containerWidth = screenWidth;
  const containerHeight = (screenWidth / 4) * 3;

  const localVideoRef = useRef<Video>(null);

  // Pass the video ref to the parent component
  useEffect(() => {
    if (localVideoRef.current) {
      videoRef(localVideoRef.current);
    }
  }, [videoRef]);

  // Control video playback based on isPlaying prop
  useEffect(() => {
    if (localVideoRef.current) {
      isPlaying
        ? localVideoRef.current.playAsync()
        : localVideoRef.current.pauseAsync();
    }
  }, [isPlaying]);

  /**
   * Renders the media content (image or video) based on the mediaType
   */
  const renderMedia = () => {
    if (item.mediaType === 0) {
      // Image
      return (
        <Image
          source={{ uri: item.media }}
          style={styles.media}
          placeholder={{ blurhash }}
          contentFit="contain"
          transition={1000}
        />
      );
    } else {
      // Video
      return (
        <View style={styles.videoWrapper}>
          <Video
            ref={localVideoRef}
            source={{ uri: item.media }}
            style={styles.media}
            resizeMode={ResizeMode.CONTAIN}
            isLooping={true}
            isMuted={isMuted}
            useNativeControls={false}
            shouldPlay={isPlaying}
          />
          <TouchableOpacity
            style={styles.muteButton}
            onPress={() => toggleMute(item.postID.toString(), !isMuted)}
          >
            <Ionicons
              name={isMuted ? "volume-mute" : "volume-medium"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      );
    }
  };

  /**
   * Renders the hashtags as horizontal scrollable buttons
   */
  const renderHashtags = () => (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 10 }}
    >
      <TouchableOpacity>
        <Text style={styles.sawerButton}>$ Sawer</Text>
      </TouchableOpacity>
      {item.hashtags.map((tag, index) => (
        <TouchableOpacity key={`${item.postID}-${tag}-${index}`}>
          <Text style={styles.hashtag}>{`#  ${tag}`}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
        <Text style={styles.username}>{item.userUsername}</Text>
        <Text style={styles.date}>{item.createTime}</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <View
        style={[
          styles.mediaContainer,
          { width: containerWidth, height: containerHeight },
        ]}
      >
        {renderMedia()}
      </View>
      <View style={styles.postFooter}>
        {renderHashtags()}
        <ActionButtons item={item} />
      </View>
    </View>
  );
};

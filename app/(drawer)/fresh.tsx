import React, { useState, useRef } from "react";
import { View, StyleSheet, Button, Pressable } from "react-native";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";

export default function FreshScreen() {
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus>(
    {} as AVPlaybackStatus
  );

  const handleVideoPress = () => {
    if (!video.current) return;
    if (status.isLoaded && status.isPlaying) {
      video.current.pauseAsync();
    } else if (status.isLoaded) {
      video.current.playAsync();
    }
  };

  const isPlaying = status.isLoaded && status.isPlaying;

  return (
    <View style={styles.container}>
      <Pressable onPress={handleVideoPress}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          useNativeControls={false}
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={setStatus}
        />
      </Pressable>
      <View style={styles.buttons}>
        <Button
          title={isPlaying ? "Pause" : "Play"}
          onPress={handleVideoPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

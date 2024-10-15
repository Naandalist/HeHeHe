import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import Slider from '@react-native-community/slider';

export default function CustomVideoPlayer() {
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus>({} as AVPlaybackStatus);
  const [sliderValue, setSliderValue] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (status.isLoaded) {
      setDuration(status.durationMillis ?? 0);
      setSliderValue(status.positionMillis ?? 0);
    }
  }, [status]);

  const handleVideoPress = () => {
    if (!video.current) return;
    if (status.isLoaded && status.isPlaying) {
      video.current.pauseAsync();
    } else if (status.isLoaded) {
      video.current.playAsync();
    }
  };

  const handleSliderValueChange = (value: number) => {
    if (status.isLoaded) {
      video.current?.setPositionAsync(value);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleVideoPress}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: 'https://cache.lahelu.com/video-PDGkHW3r4-98257',
          }}
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={setStatus}
        />
      </Pressable>
      <View style={styles.controls}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={sliderValue}
          onValueChange={handleSliderValueChange}
          thumbTintColor="transparent"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 500,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
});

import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import ActionButtons from '../ActionButtonPostItem';
import { PostInfo } from '@/types';
import { styles } from './styles';
import { Colors } from '@/constants';
import { ZoomableView } from '@/lib';

interface PostItemProps {
  item: PostInfo;
  isPlaying: boolean;
  isMuted: boolean;
  togglePlay: (postId: string) => void;
  toggleMute: (postId: string, mute: boolean) => void;
  onPlaybackStatusUpdate: (status: AVPlaybackStatus) => void;
  videoRef: (ref: Video | null) => void;
}

const { width: screenWidth } = Dimensions.get('window');

function PostItem({
  item,
  isPlaying,
  isMuted,
  togglePlay,
  toggleMute,
  onPlaybackStatusUpdate,
  videoRef,
}: PostItemProps): React.ReactElement {
  const containerWidth = screenWidth;
  const containerHeight = (screenWidth / 4) * 3;

  const localVideoRef = useRef<Video | null>(null);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (localVideoRef.current) {
      if (isPlaying) {
        localVideoRef.current.playAsync();
      } else {
        localVideoRef.current.pauseAsync();
      }
    }
  }, [isPlaying]);

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      if (!isSeeking) {
        setDuration(status.durationMillis || 0);
        setPosition(status.positionMillis || 0);
      }
    }
    onPlaybackStatusUpdate(status);
  };

  const handleSliderSlidingStart = () => {
    setIsSeeking(true);
  };

  const handleSliderSlidingComplete = async (value: number) => {
    if (localVideoRef.current) {
      await localVideoRef.current.setPositionAsync(value);
      setPosition(value);
      setIsSeeking(false);
      if (isPlaying) {
        localVideoRef.current.playAsync();
      }
    }
  };

  const getPostIdString = (postId: string | number): string => postId.toString();

  const renderMedia = () => {
    if (item.mediaType === 0) {
      return (
        <Image
          source={{ uri: item.media }}
          style={styles.media}
          contentFit="contain"
          transition={1000}
        />
      );
    } else {
      return (
        <View style={styles.videoWrapper}>
          <Video
            ref={(ref) => {
              localVideoRef.current = ref;
              videoRef(ref);
            }}
            source={{ uri: item.media }}
            style={styles.media}
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            isMuted={isMuted}
            useNativeControls={false}
            shouldPlay={isPlaying}
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          />
          <TouchableOpacity
            onPress={() => togglePlay(getPostIdString(item.postID))}
            style={[styles.playButton, styles.playButtonOverlay]}
          />
          {!isPlaying && (
            <TouchableOpacity
              style={styles.playButtonOverlay}
              onPress={() => {
                togglePlay(getPostIdString(item.postID));
              }}
            >
              <Ionicons name="play-circle" size={52} color="white" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.muteButton}
            onPress={() => toggleMute(getPostIdString(item.postID), !isMuted)}
          >
            <Ionicons name={isMuted ? 'volume-mute' : 'volume-medium'} size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={duration}
              value={position}
              onSlidingStart={handleSliderSlidingStart}
              onSlidingComplete={handleSliderSlidingComplete}
              minimumTrackTintColor={Colors.PRIMARY}
              maximumTrackTintColor={Colors.FILL_3}
              thumbTintColor="transparent"
            />
          </View>
        </View>
      );
    }
  };

  const renderHashtags = () => (
    <ScrollView
      horizontal
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

  const renderPostFooter = () => (
    <View style={styles.postFooter}>
      {!isZoomed ? (
        <>
          {renderHashtags()}
          <ActionButtons item={item} />
        </>
      ) : (
        <View style={{ paddingVertical: 48 }} />
      )}
    </View>
  );

  return (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
        <Text style={styles.username}>{item.userUsername}</Text>
        <Text style={styles.date}>{item.createTime}</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <ZoomableView
        style={[styles.mediaContainer, { width: containerWidth, height: containerHeight }]}
        onZoomChange={setIsZoomed}
      >
        {renderMedia()}
      </ZoomableView>
      {renderPostFooter()}
    </View>
  );
}

export default PostItem;

import React, { useRef, useEffect, useState, useCallback, memo } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import ActionButtons from '../ActionButtonPostItem';
import { PostInfo } from '@/types';
import { Colors, IconSize } from '@/constants';
import { ZoomableView } from '@/lib';
import styles from './styles';

interface PostItemProps {
  item: PostInfo;
  isPlaying: boolean;
  isMuted: boolean;
  togglePlay: (postId: string) => void;
  toggleMute: (postId: string) => void;
  onPlaybackStatusUpdate: (status: AVPlaybackStatus) => void;
  videoRef: (ref: Video | null) => void;
}

const { width: screenWidth } = Dimensions.get('window');

// Memoizing PostItem to prevent unnecessary re-render
const PostItem: React.FC<PostItemProps> = memo(
  ({ item, isPlaying, isMuted, togglePlay, toggleMute, onPlaybackStatusUpdate, videoRef }) => {
    const containerWidth = screenWidth;
    const containerHeight = (screenWidth / 4) * 3; // aspect ratio 4:3 based on screen width.

    const localVideoRef = useRef<Video | null>(null);
    const [duration, setDuration] = useState(0);
    const [position, setPosition] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);

    // Effect to handling video playback based on isPlaying prop
    useEffect(() => {
      if (localVideoRef.current) {
        if (isPlaying) {
          localVideoRef.current.playAsync();
        } else {
          localVideoRef.current.pauseAsync();
        }
      }
    }, [isPlaying]);

    // Callback to handling video playback by status update
    const handlePlaybackStatusUpdate = useCallback(
      (status: AVPlaybackStatus) => {
        if (status.isLoaded) {
          if (!isSeeking) {
            setDuration(status.durationMillis || 0);
            setPosition(status.positionMillis || 0);
          }
        }
        onPlaybackStatusUpdate(status);
      },
      [isSeeking, onPlaybackStatusUpdate],
    );

    // Callbacks for slider video timeline
    const handleSliderSlidingStart = useCallback(() => {
      setIsSeeking(true);
    }, []);

    const handleSliderSlidingComplete = useCallback(
      async (value: number) => {
        if (localVideoRef.current) {
          await localVideoRef.current.setPositionAsync(value);
          setPosition(value);
          setIsSeeking(false);
          if (isPlaying) {
            localVideoRef.current.playAsync();
          }
        }
      },
      [isPlaying],
    );

    const getPostIdString = useCallback((postId: string | number): string => postId.toString(), []);

    // Memoized function to render media (image or video)
    const renderMedia = useCallback(() => {
      if (item.mediaType === 0) {
        // Render image
        return (
          <Image
            source={{ uri: item.media }}
            style={styles.media}
            contentFit="contain"
            transition={1000}
          />
        );
      } else {
        // Render video
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
            {/* Button play or pause overlay */}
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
            {/* Button mute or unmute */}
            <TouchableOpacity
              style={styles.muteButton}
              onPress={() => toggleMute(getPostIdString(item.postID))}
            >
              <Ionicons
                name={isMuted ? 'volume-mute' : 'volume-medium'}
                size={IconSize}
                color="white"
              />
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
    }, [
      item,
      isPlaying,
      isMuted,
      togglePlay,
      toggleMute,
      handlePlaybackStatusUpdate,
      duration,
      position,
      getPostIdString,
      handleSliderSlidingStart,
      handleSliderSlidingComplete,
      videoRef,
    ]);

    const renderHashtags = useCallback(
      () => (
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
      ),
      [item.hashtags, item.postID],
    );

    const renderPostFooter = useCallback(
      () => (
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
      ),
      [isZoomed, renderHashtags, item],
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
  },
);

PostItem.displayName = 'PostItem';

export default PostItem;

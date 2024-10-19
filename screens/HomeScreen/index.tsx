import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { FlatList, RefreshControl, ActivityIndicator, ListRenderItemInfo } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { PostItem } from '@/components';
import { PostInfo } from '@/types';
import { Colors } from '@/constants';
import { fetchPosts } from '@/lib';
import styles from './styles';

function HomeScreen() {
  const [posts, setPosts] = useState<PostInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Unified state for video playback and mute status
  const [videoStates, setVideoStates] = useState<{
    [key: string]: { isPlaying: boolean; isMuted: boolean };
  }>({});

  // Ref declarations
  const flatListRef = useRef<FlatList<PostInfo>>(null);
  const videoRefs = useRef<{ [key: string]: Video | null }>({});
  const isLoadingRef = useRef<boolean>(false);

  // Callback for handling viewable items changes
  const onViewableItemsChanged = useCallback(
    ({ changed }: { changed: Array<{ item: PostInfo; isViewable: boolean }> }) => {
      setVideoStates((prevStates) => {
        const newStates = { ...prevStates };
        changed.forEach(({ item, isViewable }) => {
          const postId = item.postID.toString();
          if (item.mediaType === 1) {
            // Update video state only for video media type
            newStates[postId] = {
              ...newStates[postId],
              isPlaying: isViewable,
              isMuted: isViewable ? false : (newStates[postId]?.isMuted ?? true),
            };
            // Play or pause video based on visibility in viewport
            if (isViewable) {
              videoRefs.current[postId]?.playAsync();
            } else {
              videoRefs.current[postId]?.pauseAsync();
            }
          }
        });
        return newStates;
      });
    },
    [],
  );

  // Memoized viewability
  const viewabilityConfig = useMemo(() => ({ itemVisiblePercentThreshold: 50 }), []);

  // to load posts
  const loadPosts = useCallback(async (shouldRefresh: boolean = false) => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      const response = await fetchPosts();
      setPosts((prevPosts) =>
        shouldRefresh ? response.postInfos : [...prevPosts, ...response.postInfos],
      );
    } catch (error) {
      // console.log('Error function loadPosts: ', error);
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  }, []);

  // Load posts on component mount
  useEffect(() => {
    loadPosts(true);
  }, [loadPosts]);

  // Callback for refresh action
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadPosts(true);
    setRefreshing(false);
  }, [loadPosts]);

  // Callback when scrolling reach end of list
  const onEndReached = useCallback(() => {
    if (!isLoadingRef.current) {
      loadPosts();
    }
  }, [loadPosts]);

  // Callback to toggling mute state of video
  const toggleMute = useCallback((postId: string | number) => {
    const id = postId.toString();
    setVideoStates((prevStates) => ({
      ...prevStates,
      [id]: { ...prevStates[id], isMuted: !prevStates[id]?.isMuted },
    }));
  }, []);

  // Callback to toggling play state of video
  const togglePlay = useCallback((postId: string | number) => {
    const id = postId.toString();
    setVideoStates((prevStates) => ({
      ...prevStates,
      [id]: { ...prevStates[id], isPlaying: !prevStates[id]?.isPlaying },
    }));
  }, []);

  // Memoized render function for PostItem
  // Memoized function to render individual post items
  const renderPost = useCallback(
    ({ item }: ListRenderItemInfo<PostInfo>) => {
      // Convert the post ID to a string for consistent key usage
      const postId = item.postID.toString();

      // Get the video state for this post, or use default values if not set
      const videoState = videoStates[postId] || { isPlaying: false, isMuted: true };

      // Return the PostItem component with necessary props
      return (
        <PostItem
          item={item}
          isPlaying={videoState.isPlaying}
          isMuted={videoState.isMuted}
          togglePlay={togglePlay}
          toggleMute={toggleMute}
          onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
            // If the video is loaded but not playing, update its state
            if (status.isLoaded && !status.isPlaying) {
              setVideoStates((prevStates) => ({
                ...prevStates,
                [postId]: { ...prevStates[postId], isPlaying: false },
              }));
            }
          }}
          // to store the video ref for current post
          videoRef={(ref: Video | null) => {
            // If a valid ref is provided, store it in videoRefs obj
            if (ref) {
              videoRefs.current[postId] = ref;
            }
          }}
        />
      );
    },
    [videoStates, togglePlay, toggleMute],
  );

  return (
    <FlatList
      data={posts}
      ref={flatListRef}
      renderItem={renderPost}
      keyExtractor={(item) => item.postID.toString()}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
      removeClippedSubviews
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      ListFooterComponent={
        isLoading ? (
          <ActivityIndicator size="large" color={Colors.PRIMARY} style={styles.loader} />
        ) : null
      }
      windowSize={5}
      maxToRenderPerBatch={5}
      updateCellsBatchingPeriod={30}
    />
  );
}

export default HomeScreen;

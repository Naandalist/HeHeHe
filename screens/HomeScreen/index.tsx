import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  ListRenderItemInfo,
} from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { styles } from './styles';
import { PostItem } from '@/components';
import { PostInfo } from '@/types';
import { fetchPosts } from '@/api/post';
import { Colors } from '@/constants';

function HomeScreen() {
  // State
  const [posts, setPosts] = useState<PostInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set());
  const [mutedVideos, setMutedVideos] = useState<Set<string>>(new Set());

  // Refs
  const flatListRef = useRef<FlatList<PostInfo>>(null);
  const videoRefs = useRef<{ [key: string]: Video | null }>({});
  const isLoadingRef = useRef<boolean>(false);

  const onViewableItemsChanged = useCallback(
    ({ changed }: { changed: Array<{ item: PostInfo; isViewable: boolean }> }) => {
      changed.forEach(({ item, isViewable }) => {
        const postId = item.postID.toString();
        if (item.mediaType === 1) {
          // Video media type
          if (isViewable) {
            setPlayingVideos((prev) => new Set(prev).add(postId));
            setMutedVideos((prev) => {
              const newSet = new Set(prev);
              newSet.delete(postId);
              return newSet;
            });
            videoRefs.current[postId]?.playAsync();
          } else {
            setPlayingVideos((prev) => {
              const newSet = new Set(prev);
              newSet.delete(postId);
              return newSet;
            });
            videoRefs.current[postId]?.pauseAsync();
          }
        }
      });
    },
    [],
  );

  const viewabilityConfig = { itemVisiblePercentThreshold: 50 };

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
      // console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    loadPosts(true);
  }, [loadPosts]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadPosts(true);
    setRefreshing(false);
  }, [loadPosts]);

  const onEndReached = useCallback(() => {
    if (!isLoadingRef.current) {
      loadPosts();
    }
  }, [loadPosts]);

  const toggleMute = useCallback((postId: string | number, mute: boolean) => {
    const id = postId.toString();
    setMutedVideos((prev) => {
      const newSet = new Set(prev);
      mute ? newSet.add(id) : newSet.delete(id);
      return newSet;
    });
  }, []);

  const renderPost = useCallback(
    ({ item }: ListRenderItemInfo<PostInfo>) => {
      const postId = item.postID.toString();
      return (
        <PostItem
          item={item}
          isPlaying={playingVideos.has(postId)}
          isMuted={mutedVideos.has(postId)}
          togglePlay={(id: string) => {
            setPlayingVideos((prev) => {
              const newSet = new Set(prev);
              if (newSet.has(id)) {
                newSet.delete(id);
              } else {
                newSet.add(id);
              }
              return newSet;
            });
          }}
          toggleMute={toggleMute}
          onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
            if (status.isLoaded && !status.isPlaying) {
              setPlayingVideos((prev) => {
                const newSet = new Set(prev);
                newSet.delete(postId);
                return newSet;
              });
            }
          }}
          videoRef={(ref: Video | null) => {
            if (ref) {
              videoRefs.current[postId] = ref;
            }
          }}
        />
      );
    },
    [playingVideos, mutedVideos, toggleMute],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        ref={flatListRef}
        renderItem={renderPost}
        keyExtractor={(item) => item.postID.toString()}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListFooterComponent={
          isLoading ? (
            <ActivityIndicator size="large" color={Colors.PRIMARY} style={styles.loader} />
          ) : null
        }
      />
    </View>
  );
};

export default HomeScreen;

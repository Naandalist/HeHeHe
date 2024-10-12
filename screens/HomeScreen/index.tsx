import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Text,
} from "react-native";
import { Video } from "expo-av";
import { styles } from "./styles";
import { PostItem } from "@/components/post-item";
import { PostInfo } from "@/types";
import { fetchPosts } from "@/api/post";
import { Colors } from "@/constants";

const HomeScreen: React.FC = () => {
  // State
  const [posts, setPosts] = useState<PostInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set());
  const [mutedVideos, setMutedVideos] = useState<Set<string>>(new Set());

  // Ref
  const flatListRef = useRef<FlatList>(null);
  const videoRefs = useRef<{ [key: string]: Video | null }>({});
  const isLoadingRef = useRef<boolean>(false);

  /**
   * Handling visibility changes of items in the FlatList.
   * Plays videos when they become visible in viewport and pauses when not visible
   */
  const onViewableItemsChanged = useCallback(
    ({ changed }: { changed: any[] }) => {
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
            setMutedVideos((prev) => new Set(prev).add(postId));
            videoRefs.current[postId]?.pauseAsync();
          }
        }
      });
    },
    []
  );

  // Configuration for the viewability of items in the FlatList
  const viewabilityConfig = { itemVisiblePercentThreshold: 50 };

  /**
   * Fetches posts from the API and updates the state.
   * @param shouldRefresh If true, replaces existing posts. If false, appends new posts.
   */
  const loadPosts = useCallback(async (shouldRefresh: boolean = false) => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      const response = await fetchPosts();
      setPosts((prevPosts) =>
        shouldRefresh
          ? response.postInfos
          : [...prevPosts, ...response.postInfos]
      );
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  }, []);

  // Load initial posts when the component mounts
  useEffect(() => {
    loadPosts(true);
  }, [loadPosts]);

  /**
   * Handles the pull-to-refresh action.
   * Resets posts list and fetches fresh data.
   */
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadPosts(true);
    setRefreshing(false);
  }, [loadPosts]);

  /**
   * Triggering when the user scrolls to the ending of the list.
   * Loads more posts if not currently loading.
   */
  const onEndReached = useCallback(() => {
    if (!isLoadingRef.current) {
      loadPosts();
    }
  }, [loadPosts]);

  /**
   * Toggles the mute state for videos.
   */
  const toggleMute = useCallback((postId: string | number, mute: boolean) => {
    const id = postId.toString();
    setMutedVideos((prev) => {
      const newSet = new Set(prev);
      mute ? newSet.add(id) : newSet.delete(id);
      return newSet;
    });
  }, []);

  /**
   * Rendering each post item in FlatList.
   */
  const renderPost = useCallback(
    ({ item }: { item: PostInfo }) => {
      const postId = item.postID.toString();
      return (
        <PostItem
          item={item}
          isPlaying={playingVideos.has(postId)}
          isMuted={mutedVideos.has(postId)}
          toggleMute={toggleMute}
          videoRef={(ref) => {
            if (ref) {
              videoRefs.current[postId] = ref;
            }
          }}
        />
      );
    },
    [playingVideos, mutedVideos, toggleMute]
  );

  return (
    <View style={styles.container}>
      {/* <Text style={{ padding: 8 }}>Total posts: {posts.length}</Text> */}
      <FlatList
        data={posts}
        ref={flatListRef}
        renderItem={renderPost}
        keyExtractor={(item) => item.postID.toString()}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={
          isLoading ? (
            <ActivityIndicator
              size="large"
              color={Colors.PRIMARY}
              style={styles.loader}
            />
          ) : null
        }
      />
    </View>
  );
};

export default HomeScreen;
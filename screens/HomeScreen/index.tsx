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
  // State declarations
  const [posts, setPosts] = useState<PostInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Ref declarations
  const flatListRef = useRef<FlatList>(null);
  const videoRefs = useRef<{ [key: string]: Video | null }>({});
  // Use a ref to track loading state across renders
  const isLoadingRef = useRef<boolean>(false);

  /**
   * Handles the visibility changes of items in the FlatList.
   * Plays videos when they become visible and pauses them when they're not.
   */
  const onViewableItemsChanged = useCallback(
    ({ changed }: { changed: any[] }) => {
      changed.forEach((change: any) => {
        const { key, isViewable } = change;
        if (videoRefs.current[key]) {
          if (isViewable) {
            videoRefs.current[key]?.playAsync();
          } else {
            videoRefs.current[key]?.pauseAsync();
          }
        }
      });
    },
    []
  );

  // Configuration for the viewability of items in the FlatList
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  /**
   * Fetches posts from the API and updates the state.
   * @param shouldRefresh If true, replaces existing posts. If false, appends new posts.
   */
  const loadPosts = useCallback(async (shouldRefresh: boolean = false) => {
    // Prevent multiple simultaneous calls to loadPosts
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      console.log("Fetching posts...");
      const response = await fetchPosts();

      // Update posts based on whether it's a refresh or append operation
      setPosts((prevPosts) =>
        shouldRefresh
          ? response.postInfos
          : [...prevPosts, ...response.postInfos]
      );

      console.log("Posts loaded:", response.postInfos.length);
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
  }, []);

  /**
   * Handles the pull-to-refresh action.
   * Resets the posts list and fetches fresh data.
   */
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadPosts(true);
    setRefreshing(false);
  }, [loadPosts]);

  /**
   * Triggered when the user scrolls to the end of the list.
   * Loads more posts if not currently loading.
   */
  const onEndReached = useCallback(() => {
    console.log("onEndReached triggered");
    if (!isLoadingRef.current) {
      loadPosts();
    }
  }, [loadPosts]);

  /**
   * Toggles the mute state for videos.
   */
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  /**
   * Renders individual post items in the FlatList.
   */
  const renderPost = useCallback(
    ({ item }: { item: PostInfo }) => (
      <PostItem
        item={item}
        isMuted={isMuted}
        toggleMute={toggleMute}
        videoRef={(ref) => (videoRefs.current[item.postID] = ref)}
      />
    ),
    [isMuted, toggleMute]
  );

  return (
    <View style={styles.container}>
      <Text style={{ marginHorizontal: 30 }}>Total posts: {posts.length}</Text>
      <FlatList
        data={posts}
        ref={flatListRef}
        renderItem={renderPost}
        keyExtractor={(item) => item.postID.toString()}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1} // Trigger onEndReached when 10% of the list is left
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

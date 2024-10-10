import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import uuid from "react-native-uuid";

interface PostInfo {
  postID: string;
  userID: string;
  title: string;
  totalUpvotes: number;
  totalDownvotes: number;
  totalComments: number;
  createTime: number;
  feed: number;
  mediaWidth: number;
  mediaHeight: number;
  media: string;
  mediaThumbnail: string | null;
  sensitive: boolean;
  mediaType: number;
  pinCommentID: string | null;
  hashtags: string[];
  totalCoins: number;
  ageTime: number;
  userUsername: string;
  userAvatar: string;
  userFrame: string | null;
  userPrivilege: number;
  userPlusTime: number;
}

interface FetchPostsResponse {
  postInfos: PostInfo[];
  nextPage: number;
  hasMore: boolean;
}

const HomeScreen: React.FC = () => {
  // State to store the list of posts
  const [posts, setPosts] = useState<PostInfo[]>([]);
  // State to track if new posts are being loaded
  const [loading, setLoading] = useState<boolean>(false);
  // State to track if the list is being refreshed
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [isMuted, setIsMuted] = useState<boolean>(true);
  const flatListRef = useRef<FlatList>(null);
  const videoRefs = useRef<{ [key: string]: Video | null }>({});

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

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const fetchPosts =
    useCallback(async (): Promise<FetchPostsResponse | null> => {
      setLoading(true);
      setPosts([]);
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const response: FetchPostsResponse = {
          postInfos: [
            {
              postID: uuid.v4().toString(),
              userID: uuid.v4().toString(),
              title: "Beautiful landscape",
              totalUpvotes: 100,
              totalDownvotes: 2,
              totalComments: 15,
              createTime: Date.now() - 3600000, // 1 hour ago
              feed: 1,
              mediaWidth: 1080,
              mediaHeight: 1350,
              media: "https://picsum.photos/1080/1350",
              mediaThumbnail: "https://picsum.photos/1080/1350",
              sensitive: false,
              mediaType: 0, // 0 for image
              pinCommentID: null,
              hashtags: ["nature", "landscape"],
              totalCoins: 5,
              ageTime: 1136073600000,
              userUsername: "nature_lover",
              userAvatar: "https://avatar.iran.liara.run/public/girl",
              userFrame: null,
              userPrivilege: 0,
              userPlusTime: 0,
            },
            {
              postID: uuid.v4().toString(),
              userID: uuid.v4().toString(),
              title: "Cute puppy playing",
              totalUpvotes: 200,
              totalDownvotes: 1,
              totalComments: 30,
              createTime: Date.now() - 7200000, // 2 hours ago
              feed: 1,
              mediaWidth: 1920,
              mediaHeight: 1080,
              media:
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
              mediaThumbnail: "https://picsum.photos/1920/1080",
              mediaType: 1, // 1 for video
              sensitive: false,
              pinCommentID: null,
              hashtags: ["puppy", "cute", "animals"],
              totalCoins: 10,
              ageTime: 1167609600000,
              userUsername: "pet_videos",
              userAvatar: "https://avatar.iran.liara.run/public/boy",
              userFrame: null,
              userPrivilege: 0,
              userPlusTime: 0,
            },
          ],
          nextPage: 1,
          hasMore: false, // Set to false since we're only returning two items
        };

        setPosts((prevPosts) =>
          refreshing
            ? response.postInfos
            : [...prevPosts, ...response.postInfos]
        );
        return response;
      } catch (error) {
        console.error("Error fetching posts:", error);
        return null;
      } finally {
        setLoading(false);
      }
    }, [refreshing]);

  // Fetch posts when component mounts
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Handle pull-to-refresh action
  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    await fetchPosts();
    setRefreshing(false);
  }, [fetchPosts]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  // Handle pinch zoom gesture (placeholder function)
  const handlePinch = (event: PinchGestureHandlerGestureEvent) => {
    console.log("Pinch scale:", event.nativeEvent.scale);
  };

  // Render individual post item
  const renderPost = useCallback(
    ({ item }: { item: PostInfo }) => {
      const screenWidth = Dimensions.get("window").width;
      const containerSize = screenWidth; // Square container size
      const mediaAspectRatio = item.mediaWidth / item.mediaHeight;

      let mediaWidth, mediaHeight;
      if (mediaAspectRatio > 1) {
        // Landscape orientation
        mediaWidth = containerSize;
        mediaHeight = containerSize / mediaAspectRatio;
      } else {
        // Portrait or square orientation
        mediaHeight = containerSize;
        mediaWidth = containerSize * mediaAspectRatio;
      }
      return (
        <View style={styles.post}>
          <View style={styles.postHeader}>
            <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
            <Text style={styles.username}>{item.userUsername}</Text>
            <Text style={styles.date}>
              {new Date(item.createTime).toLocaleDateString()}
            </Text>
          </View>
          <View
            style={[
              styles.mediaContainer,
              { width: containerSize, height: containerSize },
            ]}
          >
            <PinchGestureHandler onGestureEvent={handlePinch}>
              <View style={styles.mediaWrapper}>
                {item.mediaType === 0 ? (
                  <Image
                    source={{ uri: item.media }}
                    style={[
                      styles.media,
                      { width: mediaWidth, height: mediaHeight },
                    ]}
                    resizeMode="contain"
                  />
                ) : (
                  <View>
                    <Video
                      ref={(ref) => (videoRefs.current[item.postID] = ref)}
                      source={{ uri: item.media }}
                      style={[
                        styles.media,
                        { width: mediaWidth, height: mediaHeight },
                      ]}
                      resizeMode={ResizeMode.CONTAIN}
                      isLooping
                      isMuted={isMuted}
                      useNativeControls={false}
                    />
                    <TouchableOpacity
                      style={styles.muteButton}
                      onPress={toggleMute}
                    >
                      <Ionicons
                        name={isMuted ? "volume-mute" : "volume-medium"}
                        size={24}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </PinchGestureHandler>
          </View>
          <View style={styles.postFooter}>
            <Text style={styles.caption}>{item.title}</Text>
            <View style={styles.hashtags}>
              {item.hashtags.map((tag, index) => (
                <Text
                  key={`${item.postID}-${tag}-${index}`}
                  style={styles.hashtag}
                >
                  #{tag}
                </Text>
              ))}
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="heart-outline" size={24} color="black" />
                <Text>{item.totalUpvotes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="chatbubble-outline" size={24} color="black" />
                <Text>{item.totalComments}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="share-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    },
    [handlePinch]
  );
  // Render the main component
  return (
    <FlatList
      data={posts}
      ref={flatListRef}
      renderItem={renderPost}
      keyExtractor={(item) => item.postID}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      // onEndReached={fetchPosts} // Load more posts when reaching the end
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        loading ? <Text style={styles.loading}>Loading...</Text> : null
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

// Styles for the component
const styles = StyleSheet.create({
  post: {
    marginBottom: 15,
    backgroundColor: "white",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    marginRight: 10,
  },
  date: {
    color: "gray",
  },
  mediaContainer: {
    overflow: "hidden",
    backgroundColor: "#f0f0f0", // Light grey background for empty space
  },
  mediaWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  media: {
    width: "100%",
    height: undefined,
  },
  postFooter: {
    padding: 10,
  },
  caption: {
    marginBottom: 5,
  },
  hashtags: {
    flexDirection: "row",
    marginBottom: 10,
  },
  hashtag: {
    color: "blue",
    marginRight: 5,
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    marginRight: 15,
  },
  loading: {
    textAlign: "center",
    padding: 10,
  },
  muteButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 5,
  },
});

export default HomeScreen;

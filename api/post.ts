import { ApiResponse, FetchPostsResponse, PostInfo } from '@/types';
import responsePost from './response.json';
import uuid from 'react-native-uuid';

export const fetchPosts = async (page: number = 1): Promise<FetchPostsResponse> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Cast the response to ApiResponse type
  const response = responsePost as ApiResponse;

  // Create a new array with updated postIDs
  const updatedPostInfos: PostInfo[] = response.data.map((post) => ({
    ...post,
    postID: uuid.v4().toString(), // Generate a new UUID and convert to string
  }));

  return {
    postInfos: updatedPostInfos,
  };
};

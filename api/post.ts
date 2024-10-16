import uuid from 'react-native-uuid';
import { ApiResponse, FetchPostsResponse, PostInfo } from '@/types';
import responsePost from './response.json';

export const fetchPosts = async (): Promise<FetchPostsResponse> => {
  // Simulate delay
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 2000);
  });

  const response = responsePost as ApiResponse;

  // Create a new array with unique postIDs
  const updatedPostInfos: PostInfo[] = response.data.map((post) => ({
    ...post,
    postID: uuid.v4().toString(),
  }));

  return {
    postInfos: updatedPostInfos,
  };
};

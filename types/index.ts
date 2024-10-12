export type PostInfo = {
  postID: string | number; // Allow postID to be either string or number
  title: string;
  totalUpvotes: number;
  totalComments: number;
  createTime: string | number; // Allow createTime to be either string or number
  mediaWidth: number;
  mediaHeight: number;
  media: string;
  mediaType: number;
  hashtags: string[];
  userUsername: string;
  userAvatar: string;
};

export interface ApiResponse {
  status: string;
  message: string;
  data: PostInfo[]; // Changed to directly be an array of PostInfo
}

export interface FetchPostsResponse {
  postInfos: PostInfo[]; // Changed to match the structure expected by HomeScreen
}

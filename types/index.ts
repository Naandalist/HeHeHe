export type PostInfo = {
  postID: string | number;
  title: string;
  totalUpvotes: number;
  totalComments: number;
  createTime: string | number;
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
  data: PostInfo[];
}

export interface FetchPostsResponse {
  postInfos: PostInfo[];
}

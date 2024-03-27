import { privateApi } from "@/api/axiosConfig";

export interface UserPost {
  postCid: number;
  postTitle: string;
  createdAt: string;
}

export interface UserBoard {
  boardName: string;
  boardCid: number;
}

export const getUserBoardList = async () => {
  try {
    const response = await privateApi.get("/public/auth/user-info");
    if (response.data.success) {
      return response.data.getUserInfo.boardList as UserBoard[];
    }
    return [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserPosts = async (boardCid: number, page: number) => {
  try {
    const response = await privateApi.get(
      `/user/posts/user-posts/${boardCid}/${page}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUserPost = async (postCid: number) => {
  try {
    const response = await privateApi.delete(`/user/posts/${postCid}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

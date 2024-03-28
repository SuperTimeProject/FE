import { privateApi } from "@/api/axiosConfig";
export interface CommentList {
  author: string;
  content: string;
  createdAt: string;
}

export interface NewComment {
  content: string;
}

export const getComments = async (postCid: number, page: number) => {
  try {
    const response = await privateApi.get(`/user/comment/${postCid}/${page}`);
    return response.data.commentList;
  } catch (error) {
    throw error;
  }
};

export const createComment = async (postCid: number, content: string) => {
  try {
    const response = await privateApi.post("/user/comment/", {
      postCid: postCid,
      content: content,
    });

    if (response.data.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

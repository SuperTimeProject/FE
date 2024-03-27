export interface CommentList {
  author: string;
  content: string;
  createdAt: string;
}

export interface NewComment {
  content: string;
}

import { privateApi } from "@/api/axiosConfig";
import axios from "axios";

export const getComments = async (postCid: number, page: number) => {
  try {
    const response = await privateApi.get(`/user/comment/${postCid}/${page}`);
    return response.data.commentList;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      console.log(error.response?.status);
      console.log(error.response?.data);
    }
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
    console.error(error);
    alert("서버 오류로 댓글 작성에 실패했습니다.");
    throw error;
  }
};

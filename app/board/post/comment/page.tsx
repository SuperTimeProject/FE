"use client";

import { privateApi } from "@/api/axiosConfig";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PostInfo {
  postCid: number;
}

interface CommentInfo {
  author: string;
  content: string;
  createdAt: string; // timeStamp
}

export default function Comment() {
  const router = useRouter();
  const [postInfo, setPostInfo] = useState<PostInfo>();
  const [page, setPage] = useState<number>(1);
  const [commentData, setCommentData] = useState<CommentInfo[]>([]);
  const [currenPost, setCurrentPost] = useState<number>(1);

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    const getComment = async (postCid: number, page: number) => {
      const response = await privateApi.get(
        `/comment/getComment/${postCid}/${page}`
      );

      const commentData = response.data.commentList;
      console.log("댓글", commentData);
      setCommentData(commentData);
    };

    getComment(postInfo?.postCid ?? 0, page);
  }, []);

  return (
    <div className="flex flex-col justify-between border-1 rounded-lg border-gray-500 p-2 m-1 gap-2">
      {commentData?.map((comment, index) => (
        <div key={index} className="flex gap-2">
          <div className="flex gap-2">
            <p>{comment.author}</p>
            <p>{comment.createdAt}</p>
          </div>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
}

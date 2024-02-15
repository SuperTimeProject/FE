"use client";

import { privateApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button, Divider, Input, Textarea } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CommentInfo {
  author: string;
  content: string;
  createdAt: string; // timeStamp
}

interface CommentInfo1 {
  description: string;
}

export default function Comment({ postCid }: { postCid: number }) {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [commentData, setCommentData] = useState<CommentInfo[]>([]);
  const [comment, setComment] = useState<CommentInfo1>({ description: "" });

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    const getComment = async (page: number) => {
      try {
        const response = await privateApi.get(`/comment/getComment/${postCid}/${page}`);

        const commentData = response.data.commentList;
        console.log("댓글", commentData);
        setCommentData(commentData);
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          console.log(error.response?.status);
          console.log(error.response?.data);
        }
      }
    };

    getComment(page);
  }, []);

  const createComment = async () => {
    try {
      if (!comment.description) {
        alert("내용은 필수 입력 사항입니다.");
        return;
      }

      const response = await privateApi.post("/comment/create", {
        postCid: postCid,
        description: comment.description,
      });

      if (response.data.success) {
        alert("댓글이 작성되었습니다.");
        router.back();
      } else {
        alert("댓글 작성에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("서버 오류로 댓글 작성에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col justify-between border-t-1 border-gray-500 p-2 m-1 gap-2 mt-5">
      {commentData?.map((comment, index) => (
        <div key={index} className="flex gap-2">
          <div className="flex gap-2">
            <p>{comment.author}</p>
            <p>{comment.createdAt}</p>
          </div>
          <p>{comment.content}</p>
        </div>
      ))}
      <div className="flex justify-between">
        <input
          placeholder="내용"
          name="description"
          value={comment.description}
          onChange={(e) => setComment({ ...comment, description: e.target.value })}
        />
        <div className="flex justify-end mt-2">
          <Button size="sm" className="bg-sub_purple font-semibold text-white" onClick={createComment}>
            등록
          </Button>
        </div>
      </div>
    </div>
  );
}

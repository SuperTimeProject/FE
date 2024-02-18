"use client";

import { privateApi } from "@/api/axiosConfig";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CommentInfo {
  author: string;
  content: string;
  createdAt: string; // timeStamp
}

interface CommentAdd {
  content: string;
}

export default function Comment({ postCid }: { postCid: number }) {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [commentData, setCommentData] = useState<CommentInfo[]>([]);
  const [comment, setComment] = useState<CommentAdd>();

  useEffect(() => {
    const getComment = async (page: number) => {
      try {
        const response = await privateApi.get(
          `/comment/getComment/${postCid}/${page}`
        );

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
      if (!comment?.content) {
        alert("내용은 필수 입력 사항입니다.");
        return;
      }

      const response = await privateApi.post("/comment/create", {
        postCid: postCid,
        content: comment?.content,
      });

      if (response.data.success) {
        alert("댓글이 작성되었습니다.");
        router.refresh();
      } else {
        alert("댓글 작성에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("서버 오류로 댓글 작성에 실패했습니다.");
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const commentDate = new Date(timestamp);
    const currentDate = new Date();

    const timeDifferenceInSeconds = Math.floor(
      (currentDate.getTime() - commentDate.getTime()) / 1000
    );

    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds}초 전`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes}분 전`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours}시간 전`;
    } else {
      return formatDistanceToNow(commentDate, { addSuffix: true, locale: ko });
    }
  };

  return (
    <div className="flex flex-col justify-between border-t-1 border-gray-500 p-2 m-1 gap-2 mt-5">
      {commentData?.map((comment, index) => (
        <div key={index} className="flex flex-col itesm-center gap-1 p-2">
          <div className="flex justify-between items-center">
            <p className="text-sm">{comment.author}</p>
            <p className="text-xs">{formatTimestamp(comment.createdAt)}</p>
          </div>
          <p className="text-base">{comment.content}</p>
        </div>
      ))}
      <div className="flex justify-between items-center gap-2 p-2">
        <Input
          size="sm"
          placeholder="댓글"
          name="description"
          value={comment?.content}
          onChange={(e) => setComment({ ...comment, content: e.target.value })}
        />
        <Button
          size="sm"
          className="bg-sub_purple font-semibold text-white"
          onClick={createComment}
        >
          등록
        </Button>
      </div>
    </div>
  );
}

"use client";

import { privateApi } from "@/api/axiosConfig";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CommentInfo {
  description: string;
}

export default function CreateComment({
  params,
}: {
  params: { postCid: number };
}) {
  const router = useRouter();
  const [comment, setComment] = useState<CommentInfo>({ description: "" });

  const createComment = async () => {
    try {
      if (!comment.description) {
        alert("내용은 필수 입력 사항입니다.");
        return;
      }

      const response = await privateApi.post("/comment/create", {
        postCid: params.postCid,
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
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status);
      }
      alert("서버 오류로 댓글 작성에 실패했습니다.");
    }
  };

  return (
    <div className="flex justify-between items-center gap-2">
      <Input
        placeholder="내용"
        name="description"
        value={comment.description}
        onChange={(e) =>
          setComment({ ...comment, description: e.target.value })
        }
      />
      <Button
        className="bg-sub_purple font-semibold text-white"
        onClick={createComment}
      >
        등록
      </Button>
    </div>
  );
}

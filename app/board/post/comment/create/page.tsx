"use client";

import { privateApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button, Divider, Textarea } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CommentInfo {
  description: string;
}

export default function CreateComment({ params }: { params: { postCid: number } }) {
  const router = useRouter();
  const [comment, setComment] = useState<CommentInfo>({ description: "" });

  const goBack = () => {
    router.back();
  };

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
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          <main className="flex flex-col gap-2">
            <div className="flex justify-start items-center">
              <Button size="sm" variant="light" onClick={goBack}>
                {"<"}
              </Button>
              <p className="flex items-center">댓글 작성</p>
            </div>
            <Divider className="my-2" />
            <Textarea
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
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}

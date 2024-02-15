"use client";

import { privateApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button, Divider, Input } from "@nextui-org/react";
import Link from "next/link";
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
      try {
        const response = await privateApi.get(
          `/comment/getComment/${postCid}/${page}`
        );

        if (response.data.success) {
          const commentData = response.data.commentList;
          console.log("댓글", commentData);
          setCommentData(commentData);
          getComment(postInfo?.postCid ?? 0, page);
        } else {
          alert("댓글을 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.error(error);
        alert("서버 오류로 댓글을 불러오는데 실패했습니다.");
      }
    };

    getComment(postInfo?.postCid ?? 0, page);
  }, []);

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          <main className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Button size="sm" variant="light" onClick={goBack}>
                  {"<"}
                </Button>
                <p className="flex items-center text-l">댓글</p>
              </div>
              <Link href={`/board/comment/${currenPost}/create`}>
                <Button
                  isIconOnly
                  size="sm"
                  className="bg-sub_purple"
                  onClick={() => setCurrentPost(postInfo?.postCid ?? 0)}
                >
                  <img
                    src="/icons/post.png"
                    width="25"
                    height="25"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </Button>
              </Link>
            </div>
            <Divider className="my-2" />
            <div>
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
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}

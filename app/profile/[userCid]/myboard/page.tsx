"use client";

import { privateApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface UserPost {
  userPostList: {
    postCid: number;
    postTitle: string;
    createdAt: string;
  }[];
}

export default function MyBoard(boardCid: number) {
  const pathname = usePathname();
  const [userPost, setUserPost] = useState<UserPost | null>(null);

  const handleDelete = async (postCid: number) => {
    try {
      const response = await privateApi.delete(`/board/delete/${postCid}`);
      if (response.data.success) {
        alert("게시글이 삭제되었습니다.");
      } else {
        alert("게시글을 삭제할 수 없습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("서버 오류로 게시글을 삭제할 수 없습니다.");
    }
  };

  useEffect(() => {
    const getUserPost = async () => {
      try {
        const response = await privateApi.get(`/auth/getUserPost/${boardCid}`);

        if (response.data.success) {
          const userPostData = response.data.userPostList;
          setUserPost(userPostData);
        } else {
          alert("게시글 정보를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.error(error);
        alert("서버 오류로 게시글 정보를 불러오는데 실패했습니다.");
      }
    };

    getUserPost();
  }, []);

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          <div>게시판 리스트</div>

          {userPost?.userPostList.map((post) => (
            <div key={post.postCid}>
              <p>{post.postTitle}</p>
              <p>{post.createdAt}</p>
              <Link href={`${pathname}/edit/${post.postCid}`}>
                <Button>수정</Button>
              </Link>
              <Button onClick={() => handleDelete(post.postCid)}>삭제</Button>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

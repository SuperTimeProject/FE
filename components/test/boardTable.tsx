"use client";

import { useRecoilValue } from "recoil";
import { CurrentBoardCid } from "./atom";
import { useEffect, useState } from "react";
import { privateApi } from "@/api/axiosConfig";
import axios from "axios";
import Link from "next/link";
import { Button, Divider, Pagination } from "@nextui-org/react";
import { usePathname } from "next/navigation";

interface IUserPost {
  postCid: number;
  postTitle: string;
  createdAt: string;
}

interface IBoardInfo {
  page: number;
  totalElements: number;
  totalPages: number;
}

export default function TestBoardTable() {
  const currentBoardCid = useRecoilValue(CurrentBoardCid);
  const pathname = usePathname();

  const [userPosts, setUserPosts] = useState<IUserPost[]>([]);
  const [boardInfo, setBoardInfo] = useState<IBoardInfo>();

  // 초기 게시판 불러오기
  useEffect(() => {
    const getPostList = async () => {
      try {
        const res = await privateApi.get(`board/getUserPost/${currentBoardCid}/1`);
        setUserPosts(res.data.userPostList);
        setBoardInfo(res.data.boardInfo);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            setUserPosts([]);
            setBoardInfo({
              page: 1,
              totalElements: 0,
              totalPages: 0,
            });
          }
          console.log(error);
        }
      }
    };
    getPostList();
  }, [currentBoardCid]);

  // 페이지 선택 함수
  const getPostList = async (page: number) => {
    try {
      const res = await privateApi.get(`board/getUserPost/${currentBoardCid}/${page}`);
      setUserPosts(res.data.userPostList);
      setBoardInfo(res.data.boardInfo);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  // 삭제 함수
  const handleDelete = async (postCid: number) => {
    try {
      const res = await privateApi.delete(`/board/delete/${postCid}`);
      alert(res.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
        window.location.reload();
      }
    }
  };
  return (
    <div className=" border-t-1 border-black w-full">
      {userPosts?.map((post) => (
        <div
          key={post.postCid}
          className="flex flex-col h-[65px] justify-between border-b-1 border-gray-500 p-y-2 m-y-1"
        >
          <p className="text-sm">{post.postTitle}</p>
          <div className="flex justify-end items-center">
            <p className="text-xs mr-2">{post.createdAt}</p>
            <Link href={`${pathname}/edit/${currentBoardCid}/${post.postCid}`}>
              <Button size="sm" variant="light">
                수정
              </Button>
            </Link>
            <Divider orientation="vertical" />
            <Button size="sm" variant="light" className="text-red-500" onClick={() => handleDelete(post.postCid)}>
              삭제
            </Button>
          </div>
        </div>
      ))}
      <div className=" absolute bottom-0 w-full">
        <Pagination
          showControls
          total={boardInfo?.totalPages}
          initialPage={1}
          className="mt-3 flex justify-center"
          color="secondary"
          onChange={(page: number) => getPostList(page)}
        />
      </div>
    </div>
  );
}

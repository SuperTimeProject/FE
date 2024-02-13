"use client";

import { privateApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
import GetUserInfo from "@/hook/getUserInfo";
import { Button, Pagination } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Board {
  boardCid: number;
}

interface Post {
  postCid: number;
}

interface IPostInfo {
  author: string;
  createdAt: string;
  postCid: number;
  postTitle: string;
  postView: number;
}

interface IboardInfo {
  page: number;
  totalElements: number;
  totalPages: number;
}

export default function Community() {
  const [boardData, setBoardData] = useState<IPostInfo[] | null>([]);
  const [postData, setPostData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [boardInfo, setBoardInfo] = useState<IboardInfo>();
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  // 작업하고 나서 useState(2)로 바꿔놓기
  const [boardCid, setBoardCid] = useState(1);
  const [userBoardInfo, setuserBoardInfo] = useState<number[]>();
  useEffect(() => {
    const getUserinfo = async () => {
      const userInfo = await GetUserInfo();
      setuserBoardInfo(userInfo.boardList);
    };
    getUserinfo();
  }, []);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await privateApi.get(
          `/board/getBoard/${boardCid}/${page}`
        );
        // 응답 처리
        if (response.data.success) {
          setBoardData(response.data.postList);
          setErrorMessage("");
        } // 404면 에러메세지 뜨게끔
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response);
          setErrorMessage(error.response?.data.message);
        }
      }
    };
    fetchBoardData(); // 게시판 데이터 불러오기
  }, [page]);

  console.log(boardData);

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white overflow-y-auto">
          <main className="pb-2 flex justify-between text-xl tracking-widest items-center border-b-2 border-gray-700 pl-1 pr-1">
            커뮤니티 게시판
            <Link href="/board/post/create">
              <Button
                isIconOnly
                aria-label="post"
                className="bg-sub_purple float-right"
              >
                <img
                  src="/icons/post.png"
                  width="25"
                  height="25"
                  style={{ filter: "brightness(0) invert(1)" }} // 이미지 색 white로 변경
                />
              </Button>
            </Link>
          </main>
          {errorMessage && <p>{errorMessage}</p>}
          <div className="h-[450px] overflow-auto scrollbar-none">
            {boardData &&
              boardData.map((post) => (
                <Link
                  href={`/board/post/read/${post.postCid}`}
                  key={post.postCid}
                >
                  <div className="border-b-1 border-gray-400 pb-2 pt-2 cursor-pointer pl-1">
                    <div>
                      <span className="flex text-lg">{post.postTitle}</span>
                    </div>
                    <div className="flex gap-2 text-sm text-gray-500">
                      <span>{post.author} |</span>
                      <span>{post.createdAt} |</span>
                      <span>{post.postView}</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          <Pagination
            showControls
            total={totalPage}
            initialPage={page}
            className="mt-3 flex justify-center"
            color="secondary"
            onChange={(page: number) => setPage(page)}
          />
        </div>
        <Footer />
      </div>
    </div>
  );
}

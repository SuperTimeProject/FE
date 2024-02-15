"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button, Pagination } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { privateApi } from "@/api/axiosConfig";
import GetUserInfo from "@/hook/getUserInfo";
import axios from "axios";

interface Board {
  boardCid: number;
  boardName: string;
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

export default function Main() {
  const [boardData, setBoardData] = useState<IPostInfo[] | null>([]);
  const [postData, setPostData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  //추후에 사용 다른페이지에서
  const boardCid = 1;

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
          setTotalPage(response.data.boardInfo.totalPages);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data.message);
        }
      }
    };
    fetchBoardData(); // 게시판 데이터 불러오기
  }, [page]);

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          <main className="pb-2 flex justify-between text-xl tracking-widest items-center border-b-2 border-gray-700 pl-1 pr-1">
            전체 게시판
            <Link href="/board/post/write">
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
          <div className="h-[450px] overflow-auto scrollbar-none">
            {errorMessage && <p>{errorMessage}</p>}
            {boardData &&
              boardData.map((post) => (
                <Link
                  href={`/board/post/read/${post.postCid}`}
                  key={post.postCid}
                >
                  <div className="border-b-1 border-gray-400 pb-2 pt-2 cursor-pointer pl-1">
                    <div>
                      <span className="flex text-lg">
                        {post?.postTitle && post.postTitle.length > 20
                          ? post.postTitle.slice(0, 20) + "..."
                          : post?.postTitle}
                      </span>
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

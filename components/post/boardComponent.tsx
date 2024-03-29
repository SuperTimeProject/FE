"use client";

import { privateApi } from "@/api/axiosConfig";
import { Button, Pagination } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserBoard {
  boardName: string;
  boardCid: number;
}

interface IPostInfo {
  author: string;
  createdAt: string;
  postCid: number;
  postTitle: string;
  postView: number;
}

export default function BoardComponent({ boardName }: { boardName: string }) {
  const route = useRouter();

  const [boardData, setBoardData] = useState<IPostInfo[] | null>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [userBoard, setUserBoard] = useState<UserBoard | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await privateApi.get("/auth/getUserInfo");
      if (res.data.success) {
        const userBoardData = res.data.getUserInfo.boardList;
        setUserBoard(
          userBoardData[
            userBoardData.findIndex(
              (board: UserBoard) => board.boardName === boardName
            )
          ]
        );
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (userBoard === null) return;
    const fetchBoardData = async () => {
      try {
        const response = await privateApi.get(
          `/board/getBoard/${userBoard.boardCid}/${page}`
        );
        if (response.data.success) {
          setBoardData(response.data.postList);
          setErrorMessage("");
          setTotalPage(response.data.boardInfo.totalPages);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setBoardData([]);
          setErrorMessage(error.response?.data.message);
        }
      }
    };
    fetchBoardData(); // 게시판 데이터 불러오기
  }, [page, userBoard]);

  if (userBoard === null)
    return (
      <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
        로딩중..
      </div>
    );

  return (
    <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
      <main className="pb-2 text-xl tracking-widest border-b-2 border-gray-700 pl-1 pr-1">
        {/* {userBoard.boardName} */}
        {/* {boardName} */}
        <div className="flex justify-between items-center">
          {boardName !== "전체 게시판" && (
            <div
              className="flex-none cursor-pointer"
              onClick={() => route.back()}
            >
              <img
                src="/icons/back.png"
                width="30"
                height="30"
                className="flex-none"
              />
            </div>
          )}
          <div>{boardName}</div>
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
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Button>
          </Link>
        </div>
      </main>
      <div className="h-[450px] overflow-auto scrollbar-none mt-3">
        {errorMessage && <p>{errorMessage}</p>}
        {boardData &&
          boardData.map((post) => (
            <Link href={`/board/post/read/${post.postCid}`} key={post.postCid}>
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
                  <span>조회수 {post.postView}</span>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <Pagination
        showControls
        total={totalPage}
        initialPage={1}
        className="mt-3 flex justify-center"
        color="secondary"
        onChange={(page: number) => setPage(page)}
      />
    </div>
  );
}

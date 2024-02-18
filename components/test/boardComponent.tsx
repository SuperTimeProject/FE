"use client";

import { privateApi } from "@/api/axiosConfig";
import { Button, Pagination } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

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

// 코드 보면서 정리해서 폴더 옮겨주기 test폴더에서 추방
export default function BoardComponent({ boardName }: { boardName: string }) {
  // boardInfo = { boardName: "전체게시판", boardCid: 1}
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
        console.log("유저 게시판", userBoardData);
        setUserBoard(userBoardData[userBoardData.findIndex((board: UserBoard) => board.boardName === boardName)]);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (userBoard === null) return;
    const fetchBoardData = async () => {
      try {
        const response = await privateApi.get(`/board/getBoard/${userBoard.boardCid}/${page}`);
        // 응답 처리
        if (response.data.success) {
          setBoardData(response.data.postList);
          setErrorMessage("");
          setTotalPage(response.data.boardInfo.totalPages);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // 404에러 -> 리스트가 비어있을때
          setBoardData([]);
          // 빈화면, 게시판이 비어있습니다. (메세지를 대신 보여줌)
          setErrorMessage(error.response?.data.message);
        }
      }
    };
    fetchBoardData(); // 게시판 데이터 불러오기
  }, [page]);

  if (userBoard === null) return <div>로딩중...</div>;

  return (
    <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
      <main className="pb-2 flex justify-between text-xl tracking-widest items-center border-b-2 border-gray-700 pl-1 pr-1">
        {userBoard.boardName}
        <Link href="/board/post/create">
          <Button isIconOnly aria-label="post" className="bg-sub_purple float-right">
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
                  <span>{post.postView}</span>
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

// 메인페이지 코드 다시한번 보기
// 두번째 페이지 만들기
// 1. 게시판 리스트 불러오기
// 2. 더보기를 눌렀을때 다이나믹 라우팅을 이용해서 boardName전달해주기
// 3. parameter로 받아오 boardname을 사용해서 boardComponent에 전달하고 데이터 불러오기
// --- 게시판 관련 종료 -- 커밋 feat: 이름 정해주세요 --요기까지 필수
// 4. 시간표 컴포넌트 만들기
// 5. 두번째 페이지에 적용하기
// -- 커밋 feat: 시간표 기능 추가 -- 내일

// -> 채팅

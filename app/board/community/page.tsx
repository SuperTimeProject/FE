"use client";

import { privateApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
import PostExample from "@/components/post/postExample";
import GetUserInfo from "@/hook/getUserInfo";
import { Button, Pagination } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Board {
  boardCid: number;
  boardName: string;
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
  //const [boardData, setBoardData] = useState<Board[] | null>([]);
  const [postData, setPostData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [userBoardInfo, setuserBoardInfo] = useState<Board[]>();

  const [board1, setBoard1] = useState([]);
  const [board2, setBoard2] = useState([]);
  const [board3, setBoard3] = useState([]);
  useEffect(() => {
    const getUserinfo = async () => {
      const userInfo = await GetUserInfo();
      setuserBoardInfo(userInfo.boardList);
    };

    getUserinfo();
  }, []);

  useEffect(() => {
    const fetchBoardData = async () => {
      if (userBoardInfo !== undefined) {
        for (let i = 1; i < userBoardInfo?.length; i++) {
          console.log(userBoardInfo);
          try {
            const response = await privateApi.get(
              `/board/getBoard/${userBoardInfo[i].boardCid}/1`
            );
            // 응답 처리
            if (response.data.success) {
              if (i === 1) {
                setBoard1(response.data.postList);
              } else if (i === 2) {
                setBoard2(response.data.postList);
              } else {
                setBoard3(response.data.postList);
              }
            } // 404면 에러메세지 뜨게끔
          } catch (error) {
            if (axios.isAxiosError(error)) {
              setErrorMessage(error.response?.data.message);
            }
          }
        }
      }
    };
    fetchBoardData();
  }, [userBoardInfo]);

  // 각 게시판마다 3개씩 게시물 미리보기
  // 게시판의 갯수가 2개 or 3개

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        {/* 게시판 1 */}
        <div className=" h-[630px] space-y-5">
          {userBoardInfo && (
            <PostExample
              board={userBoardInfo[1]}
              boardData={board1}
              length={userBoardInfo.length}
            />
          )}
          {/* 게시판 2 */}
          {userBoardInfo && (
            <PostExample
              board={userBoardInfo[2]}
              boardData={board2}
              length={userBoardInfo.length}
            />
          )}
          {/* 게시판 3 */}
          {userBoardInfo?.length === 4 && (
            <PostExample
              board={userBoardInfo[3]}
              boardData={board3}
              length={userBoardInfo.length}
            />
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}

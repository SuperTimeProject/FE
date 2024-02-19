"use client";

import { privateApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
import PostExample from "@/components/post/postExample";
import { useEffect, useState } from "react";

interface UserBoard {
  boardName: string;
  boardCid: number;
}

export default function Community() {
  const [userBoard, setUserBoard] = useState<UserBoard[]>([]);

  useEffect(() => {
    const getUser = async () => {
      const res = await privateApi.get("/auth/getUserInfo");
      if (res.data.success) {
        const userBoardData = res.data.getUserInfo.boardList;
        setUserBoard(userBoardData);
      }
    };
    getUser();
  }, []);
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        {/* 게시판 리스트 -> UserBoard - 전체 게시판 제외 */}
        <div>
          {userBoard.map((board) => (
            <div className="flex justify-between items-center">
              <div>{board.boardName}</div>
              <div>+ 더보기</div>
            </div>
          ))}
        </div>
        {/* PostExample 호출  */}
        {/* 시간표 */}
        <Footer />
      </div>
    </div>
  );
}

"use client";

import { privateApi } from "@/api/axiosConfig";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { CurrentBoardCid } from "./atom";
import TestBoardTable from "./boardTable";

interface IUserBoard {
  boardName: string;
  boardCid: number;
}

export default function TestContent() {
  const route = useRouter();

  const [userBoardList, setUserBoardList] = useState<IUserBoard[]>([]);
  const [currentBoardCid, setCurrentBoardCid] = useRecoilState(CurrentBoardCid);

  // 유저 게시판 정보 불러오기
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await privateApi.get("/auth/getUserInfo");
        setUserBoardList(res.data.getUserInfo.boardList);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response);
        }
      }
    };
    getUser();
  }, []);

  return (
    <div>
      {/* 뒤로가기  & 게시판 리스트 */}
      {/* Wrapper */}
      <div className=" flex justify-around items-center">
        {/* 뒤로가기 */}
        <div className=" font-semibold text-2xl mb-1" onClick={() => route.back()}>
          {"<"}
        </div>
        {/* 게시판 리스트 */}
        {userBoardList.map((board) => (
          <div className=" text-sm" onClick={() => setCurrentBoardCid(board.boardCid)}>
            {board.boardName}
          </div>
        ))}
      </div>
      {/* 게시글 내용 */}
      <div className=" h-[710px] relative">
        <TestBoardTable />
      </div>
    </div>
  );
}

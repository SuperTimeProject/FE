"use client";

import { privateApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
import PostExample from "@/components/post/postExample";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface UserBoard {
  boardName: string;
  boardCid: number;
}

interface ScheduleImageData {
  scheduleImageCid: number;
  scheduleImageFileName: string;
  scheduleImageFilePath: string;
}

export default function Community() {
  const [userBoard, setUserBoard] = useState<UserBoard[]>([]);
  const [scheduleImages, setScheduleImages] = useState<ScheduleImageData>();
  const [errorMessage, setErrorMessage] = useState("");
  const [part, setPart] = useState<string>("");
  const [isFull, setIsFull] = useState<string>("");

  /*   useEffect(() => {
    const getUser = async () => {
      const res = await privateApi.get("/auth/getUserInfo");
      if (res.data.success) {
        const userBoardData = res.data.getUserInfo.boardList;
        setUserBoard(userBoardData);
      }
    };
    getUser();
  }, []); */

  useEffect(() => {
    const getUser = async () => {
      const res = await privateApi.get("/auth/getUserInfo");
      if (res.data.success) {
        const userBoardData: UserBoard[] = res.data.getUserInfo.boardList;
        const filteredUserBoardData = userBoardData.filter(
          (board) => board.boardCid !== 1
        );
        setUserBoard(filteredUserBoardData);
        setPart(res.data.getUserInfo.part);
        setIsFull(res.data.getUserInfo.semester.isFull);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const fetchScheduleImages = async () => {
      try {
        console.log(part, isFull);
        const scheduleResponse = await privateApi.get("/schedule/view", {
          params: {
            part,
            isFull,
            week: 1,
          },
        });
        if (scheduleResponse.data.success) {
          setScheduleImages(scheduleResponse.data.image);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.status === 400) {
            setScheduleImages(undefined);
          }
          setErrorMessage(error.response?.data.message);
        }
      }
    };

    fetchScheduleImages();
  }, [part, isFull]);

  return (
    <div className="flex h-screen justify-center items-center ">
      <div className=" max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-2 border-1 border-[#d1d5db] flex flex-col items-center">
          {/* 게시판 리스트 -> UserBoard - 전체 게시판 제외 */}
          <div className="h-[300px]">
            {userBoard.map((board) => (
              <div
                className="w-96 flex m-2 p-2 pr-4 pl-4 justify-between items-center border-b-2"
                key={board.boardCid}
              >
                <div>{board.boardName}</div>
                <Link href={`/board/community/${board.boardName}`}>
                  <div>+ 더보기</div>
                </Link>
              </div>
            ))}
          </div>
          {/* PostExample 호출  */}

          {/* 시간표 */}
          <div className=" h-[0.2px] border-t-1 border-[#d1d5db] w-full my-1"></div>
          <h2 className=" font-semibold">시간표</h2>
          <div className=" h-[0.2px] border-t-1 border-[#d1d5db] w-full my-1"></div>
          <div
            className=" h-[250px] w-[380px] bg-cover bg-center"
            style={{
              backgroundImage: `url(${scheduleImages?.scheduleImageFilePath})`,
            }}
          />
        </div>
        <Footer />
      </div>
    </div>
  );
}

"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { privateApi } from "@/api/axiosConfig";

export default function Main() {
  const [boardData, setBoardData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await privateApi.get("/board/getBoard/{boardCid}");
        // 응답 처리
        if (response.data.success) {
          setBoardData(response.data.board);
          setErrorMessage("");
        } else {
          setErrorMessage("게시판을 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("서버 오류로 게시판을 불러오는데 실패했습니다.");
      }
    };

    fetchBoardData(); // 게시판 데이터 불러오기
  }, []);

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          <main>전체 게시판 메인</main>
          <Link href="/board/post/create">
            <Button isIconOnly aria-label="post" className="bg-sub_purple">
              <img
                src="/icons/post.png"
                width="30"
                height="30"
                style={{ filter: "brightness(0) invert(1)" }} // 이미지 색 white로 변경
              />
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    </div>
  );
}

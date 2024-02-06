"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@nextui-org/react";

export default function MyBoard() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          <div>게시판 리스트</div>
          <Button>게시글 수정</Button>
          <Button>게시글 삭제</Button>
        </div>
        <Footer />
      </div>
    </div>
  );
}

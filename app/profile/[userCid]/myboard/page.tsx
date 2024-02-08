"use client";

import { privateApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MyBoard() {
  const pathname = usePathname();
  const handleDelete = async (/*postCid*/) => {
    try {
      // const response = await privateApi.delete(`/Board/delete/${postCid}`);
      // if (response.data.success) {
      //   alert("게시글이 삭제되었습니다.");
      // } else {
      //   alert("게시글을 삭제할 수 없습니다.");
      // }
    } catch (error) {
      console.error(error);
      alert("서버 오류로 게시글을 삭제할 수 없습니다.");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          <div>게시판 리스트</div>
          <Link href={`${pathname}/edit`}>
            <Button>게시글 수정</Button>
          </Link>
          <Button /*onClick={() => handleDelete(postCid)}*/>게시글 삭제</Button>
        </div>
        <Footer />
      </div>
    </div>
  );
}

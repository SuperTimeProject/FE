"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";

// 다이나믹 라우팅 사용 -> 폴더 위치 수정
// community -> [boardName]
export default function BoardDetail() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <Footer />
      </div>
    </div>
  );
}

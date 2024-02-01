"use client";

import { useRouter } from "next/navigation";

export default function Success() {
  // "/auth/verify/success" 인증 성공 페이지
  // "/board/main" 전체 게시판으로 이동 - router.push("/board/main");
  const router = useRouter();

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-96 p-8 border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <header className="flex flex-col items-center">
          <p className="text-3xl font-mono m-8">SUPER TIME</p>
          <p className="font-medium text-emerald-600 text-xl m-4">
            기수 인증을 완료하였습니다.
          </p>
        </header>
      </div>
    </div>
  );
}

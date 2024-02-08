"use client";

import { useRouter } from "next/navigation";

export default function Success() {
  // "/auth/verify/success" 인증 성공 페이지
  // "/board/main" 전체 게시판으로 이동 - router.push("/board/main");
  const textStyling = {
    WebkitTextStroke: "1px black",
  };

  const router = useRouter();

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-96 p-8 border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <header className="flex flex-col items-center">
          <div className="flex justify-center items-center m-4 gap-2">
            <p style={textStyling} className="text-4xl font-mono text-white">
              SUPER
            </p>
            <p style={textStyling} className="text-4xl font-mono text-white">
              TIME
            </p>
          </div>
          <p className="font-medium text-emerald-600 text-xl m-4">
            기수 인증을 완료하였습니다.
          </p>
        </header>
      </div>
    </div>
  );
}

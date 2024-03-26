"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { getCookie } from "@/components/utils/setCookie";

export default function Header() {
  const router = useRouter();

  const handleLogoClick = () => {
    const token = getCookie(); // 쿠키에서 토큰 가져오기
    if (token) {
      router.push("/board/main"); // 토큰이 있으면 board/main으로 이동
    } else {
      router.push("/"); // 토큰이 없으면 root로 이동
    }
  };

  return (
    <div
      onClick={handleLogoClick}
      className="flex flex-col sm:flex-row justify-center items-center m-8 gap-2"
    >
      <p className="text-4xl font-mono">SUPER</p>
      <p className="text-4xl font-mono">TIME</p>
    </div>
  );
}

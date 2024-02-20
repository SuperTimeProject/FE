"use client";

import { Button } from "@nextui-org/react";
import { deleteCookie } from "@/components/utils/setCookie";
import { useRouter } from "next/navigation";

export default function Pending() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      deleteCookie(); // 로컬스토리지에 토큰값 삭제
      alert("로그아웃이 성공적으로 완료되었습니다.");
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <header className="flex flex-col items-center">
        <div className="flex justify-center items-center m-4 gap-2">
          <p className="text-4xl font-mono">SUPER</p>
          <p className="text-4xl font-mono">TIME</p>
        </div>
        <img src="/icons/info.png" width="64" height="64" />
        <p className="font-medium text-xl m-4">인증 처리가 진행 중입니다.</p>
      </header>
      <main className="max-w-md mb-8">
        인증 처리에는 최대 72시간 (토, 일, 공휴일 제외)이 소요될 수 있습니다.
        인증 처리가 완료되면 슈퍼타임을 사용하실 수 있습니다.
      </main>
      <Button variant="light" onClick={() => handleLogout()}>
        로그아웃
      </Button>
    </div>
  );
}

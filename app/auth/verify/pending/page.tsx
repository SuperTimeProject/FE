"use client";

import { useRouter } from "next/navigation";

export default function Pending() {
  const router = useRouter();

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
      <main className="px-10">
        인증 처리에는 최대 72시간 (토, 일, 공휴일 제외)이 소요될 수 있습니다.
        인증 처리가 완료되면 슈퍼타임을 사용하실 수 있습니다.
      </main>
    </div>
  );
}

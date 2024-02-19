"use client";

import { useRouter } from "next/navigation";

export default function Completed() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <header className="flex flex-col items-center">
        <div className="flex justify-center items-center m-4 gap-2">
          <p className="text-4xl font-mono">SUPER</p>
          <p className="text-4xl font-mono">TIME</p>
        </div>
        <p className="font-medium text-emerald-600 text-xl m-4">
          기수 인증이 완료되었습니다.
        </p>
      </header>
    </div>
  );
}

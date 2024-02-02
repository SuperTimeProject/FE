"use client";

import { useRouter } from "next/navigation";

export default function Wait() {
  // "/auth/verify/wait" - 요청 보낸 후 대기 상태
  // "/auth/verify/fail" 실패 - router.push("/auth/verify/fail");
  // "/auth/verify/success" 성공 - router.push("/auth/verify/success");
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
          <img src="/icons/info.png" width="64" height="64" />
          <p className="font-medium text-xl m-4">인증 처리가 진행 중입니다.</p>
        </header>
        <main>
          인증 처리에는 최대 72시간 (토, 일, 공휴일 제외)이 소요될 수 있습니다.
          인증 처리가 완료되면 슈퍼타임을 사용하실 수 있습니다.
        </main>
      </div>
    </div>
  );
}

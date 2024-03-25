"use client";

<<<<<<< HEAD
import Header from "@/components/shared/header";
=======
>>>>>>> e9b0302 (feat: 인증페이지 로그아웃 버튼 수정)
import LogoutButton from "@/components/shared/logoutButton";
import { useRouter } from "next/navigation";

export default function Pending() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <header className="flex flex-col items-center">
        <Header />
        <img src="/icons/info.png" width="64" height="64" />
        <p className="font-medium text-xl m-4">인증 처리가 진행 중입니다.</p>
      </header>

      <main className="max-w-md mb-8">
        인증 처리에는 최대 72시간 (토, 일, 공휴일 제외)이 소요될 수 있습니다.
        인증 처리가 완료되면 슈퍼타임을 사용하실 수 있습니다.
      </main>

      <LogoutButton />
    </div>
  );
}

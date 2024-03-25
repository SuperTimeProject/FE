"use client";

import LogoTitle from "@/components/shared/logoTitle";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center px-4">
      <header className="flex flex-col items-center gap-8">
        <img src="/favicon.ico" width="128" height="128" />
        <LogoTitle />
      </header>
      <section className="flex flex-col items-center gap-8 mt-8">
        <Button
          size="lg"
          onClick={() => router.push("/auth/login")}
          className="bg-white border-1.5 border-main_blue font-semibold text-main_blue min-w-[200px] max-w-[400px]"
        >
          로그인
        </Button>
        <Button
          size="lg"
          onClick={() => router.push("/auth/signup")}
          className="bg-white border-1.5 border-main_blue font-semibold text-main_blue min-w-[200px] max-w-[400px]"
        >
          회원가입
        </Button>
      </section>
    </div>
  );
}

"use client";

import Header from "@/components/shared/header";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center px-4">
      <header className="flex flex-col items-center gap-8">
        <img src="/favicon.ico" width="128" height="128" />
        <Header />
      </header>
      <section className="flex flex-col md:flex-row items-center gap-8 mt-8">
        <Button
          size="lg"
          onClick={() => router.push("/auth/login")}
          variant="bordered"
          className="font-semibold border-main_blue text-main_blue min-w-[300px]"
        >
          로그인
        </Button>
        <Button
          size="lg"
          onClick={() => router.push("/auth/signup")}
          variant="bordered"
          className="font-semibold border-main_blue text-main_blue min-w-[300px]"
        >
          회원가입
        </Button>
      </section>
    </div>
  );
}

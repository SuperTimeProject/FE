"use client";

import React from "react";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { privateApi } from "@/api/axiosConfig";

export default function Login() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-96 p-8 border-1 border-[#d1d5db] bg-white shadow-md rounded-md">
        <header className="flex justify-center text-3xl m-8">로그인</header>
        <main className="flex flex-col gap-4">
          <section className="flex flex-col gap-4">
            <form className="flex flex-col gap-4">
              <Input type="email" label="이메일" />
              <Input type="password" label="비밀번호" />
            </form>
            <Button className="bg-main_blue text-white">로그인</Button>
            <Button className="bg-sub_purple text-white">소셜 로그인</Button>
          </section>
        </main>
        <footer className="flex justify-center m-10">
          <Link href="/auth/signup">
            <Button className="bg-[#ffffff] border-solid border-1.5 border-main_blue text-main_blue">
              회원가입
            </Button>
          </Link>
        </footer>
      </div>
    </div>
  );
}

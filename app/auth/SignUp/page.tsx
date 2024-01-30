"use client";

import React from "react";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";

interface DropdownItem {
  key: string;
  label: string;
}

export default function SignUp() {
  return (
    <div className="flex flex-col justify-center items-center">
      <header>회원가입</header>
      <main className="flex flex-col justify-center gap-4">
        <form className="flex flex-col gap-4">
          <Input type="email" label="이메일" />
          <Input type="text" label="이름" />
          <Input type="text" label="닉네임" />
          <span className="flex justify-center">닉네임 중복 메세지</span>
          <Button className="bg-[#f5f5f5]">기수 선택</Button>
          <Input type="password" label="비밀번호" />
          <Input type="password" label="비밀번호 확인" />
        </form>
        <section className="flex flex-col gap-4">
          <Button className="bg-main_blue text-white">회원가입</Button>
        </section>
        <Link href="/auth/login">
          <Button className="bg-[#ffffff] border-solid border-1.5 border-main_blue text-main_blue">
            로그인
          </Button>
        </Link>
      </main>
    </div>
  );
}

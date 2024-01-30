"use client";

import React from "react";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <header>로그인</header>
      <main>
        <section className="flex flex-col gap-4">
          <form className="flex flex-col gap-4">
            <Input type="email" label="이메일" />
            <Input type="password" label="비밀번호" />
          </form>
          <Button className="bg-button_color text-white">로그인</Button>
          <Button className="bg-button_color text-white">소셜 로그인</Button>
        </section>
        <Link href="/auth/signup">
          <Button className="bg-button_color text-white">회원가입</Button>
        </Link>
      </main>
    </>
  );
}

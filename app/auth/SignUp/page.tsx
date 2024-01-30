"use client";

import React from "react";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import "../../../styles/signup.module.css";

interface DropdownItem {
  key: string;
  label: string;
}

export default function SignUp() {
  return (
    <>
      <header>회원가입</header>
      <main>
        <section>
          <form>
            <Input type="email" label="이메일" />
            <Input type="text" label="이름" />
            <Input type="text" label="닉네임" />
            <p>닉네임 중복 메세지</p>
            <Button>기수 선택</Button>
            <Input type="password" label="비밀번호" />
            <Input type="password" label="비밀번호 확인" />
          </form>
          <Button className="bg-button_color text-white">회원가입</Button>
        </section>
        <Link href="/auth/login">
          <Button className="bg-button_color text-white">로그인</Button>
        </Link>
      </main>
    </>
  );
}

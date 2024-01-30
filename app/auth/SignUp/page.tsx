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
    <>
      <main>
        <section>
          <h1>SignUp</h1>
          <form>
            <article>
              <Input type="email" label="이메일" />
              <Input type="text" label="이름" />
              <Input type="text" label="닉네임" />
              <span>닉네임 중복 메세지</span>
              <Button>기수 선택</Button>

              <Input type="password" label="비밀번호" />
              <Input type="password" label="비밀번호 확인" />
            </article>
            <Button>회원가입</Button>
          </form>
          <Link href="/auth/login">
            <Button>로그인</Button>
          </Link>
        </section>
      </main>
    </>
  );
}

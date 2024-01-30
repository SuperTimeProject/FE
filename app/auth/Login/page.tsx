"use client";

import React from "react";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";

export default function Login() {
  return (
    <main>
      <section>
        <h1>로그인</h1>
        <form>
          <article>
            <Input type="email" label="이메일" />
            <Input type="password" label="비밀번호" />
          </article>
          <article>
            <Button className="bg-button_color text-white">로그인</Button>
            <Button className="bg-button_color text-white">소셜 로그인</Button>
          </article>
        </form>
        <Link href="/auth/signup">
          <Button className="bg-button_color text-white">회원가입</Button>
        </Link>
      </section>
    </main>
  );
}

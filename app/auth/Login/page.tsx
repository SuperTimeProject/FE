"use client";

import React from "react";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <main>
        <section>
          <h1>Login</h1>
          <form>
            <article>
              <Input type="email" label="이메일" />

              <Input type="password" label="비밀번호" />
            </article>
            <Button>로그인</Button>
            <Button>소셜 로그인</Button>
          </form>
          <Link href="/auth/signup">
            <Button>회원가입</Button>
          </Link>
        </section>
      </main>
    </>
  );
}

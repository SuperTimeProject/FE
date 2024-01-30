"use client"; // csr로 돌려줘야 사용 가능

import React from "react";
import { Input } from "@nextui-org/react";

export default function Login() {
  return (
    <>
      <main>
        <section>
          <h1>Login</h1>
          <form>
            <article>
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
              />
            </article>
            <article>
              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
              />
            </article>
            <button>로그인</button>
            <button>소셜 로그인</button>
          </form>
          <button>회원가입</button>
        </section>
      </main>
    </>
  );
}

"use client";

import React from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import Link from "next/link";

interface SemesterItem {
  key: string;
  label: string;
}

export default function SignUp() {
  const items: SemesterItem[] = [
    { key: "1", label: "기수 1" },
    { key: "2", label: "기수 2" },
  ];

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <header className="m-8">회원가입</header>
      <main className="flex flex-col justify-center items-center gap-4">
        <section className="flex flex-col gap-4">
          <form className="flex flex-col gap-4">
            <Input type="email" label="이메일" />
            <Input type="text" label="이름" />
            <Input type="text" label="닉네임" />
            {/* <p className="flex justify-center">닉네임 중복</p> */}
            <Dropdown>
              <DropdownTrigger>
                <Button className="bg-[#f5f5f5]">기수 선택</Button>
              </DropdownTrigger>
              <DropdownMenu items={items}>
                {(item) => (
                  <DropdownItem key={item.key}>{item.label}</DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
            <Input type="password" label="비밀번호" />
            <Input type="password" label="비밀번호 확인" />
            {/* <p className="flex justify-center">비밀번호 일치</p> */}
          </form>
          <Button className="bg-main_blue text-white">회원가입</Button>
        </section>
      </main>
      <footer className="m-10">
        <Link href="/auth/login">
          <Button className="bg-[#ffffff] border-solid border-1.5 border-main_blue text-main_blue">
            로그인
          </Button>
        </Link>
      </footer>
    </div>
  );
}

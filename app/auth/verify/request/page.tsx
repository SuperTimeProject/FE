"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

export default function Request() {
  // "/auth/verify/request" - 로그인 후 처음 인증 요청
  // "/auth/verify/wait" - 대기 페이지로 이동

  // const [uploadFile, setUploadFile] = useState(null);
  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   setUploadFile(file);
  // };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-96 p-8 border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <header className="flex flex-col justify-center items-center">
          <p className="text-3xl font-mono m-8">SUPER TIME</p>
          <p className="font-medium text-xl m-4">기수 인증</p>
        </header>
        <main className="flex flex-col items-center gap-4">
          <section className="flex flex-col items-center gap-4">
            <p className="text-tiny">이미지 미리보기</p>
            <label htmlFor="imageUpload">
              <Button
                size="sm"
                className="bg-[#ffffff] border-solid border-1.5 border-main_blue text-main_blue"
              >
                이미지 업로드
                <input
                  type="file"
                  accept="image/*"
                  // onChange={handleImageUpload}
                />
              </Button>
            </label>
          </section>

          <Link href="/auth/verify/wait">
            <Button
              size="sm"
              className="bg-[#ffffff] border-solid border-1.5 border-main_blue text-main_blue"
            >
              인증하기
            </Button>
          </Link>
        </main>
      </div>
    </div>
  );
}

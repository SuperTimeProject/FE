"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

export default function Fail() {
  // "/auth/verify/fail" - 실패 처리 후 이미지 업로드로 재인증 요청
  // "/auth/verify/wait" - 대기 페이지로 이동
  const textStyling = {
    WebkitTextStroke: "1px black",
  };

  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      setUploadFile(file);
    } else {
      setUploadFile(null);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-96 p-8 border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <header className="flex flex-col items-center">
          <div className="flex justify-center items-center m-4 gap-2">
            <p style={textStyling} className="text-4xl font-mono text-white">
              SUPER
            </p>
            <p style={textStyling} className="text-4xl font-mono text-white">
              TIME
            </p>
          </div>
          <p className="font-medium text-rose-600 text-xl m-4">
            기수 인증에 실패하였습니다.
          </p>
        </header>
        <main className="flex flex-col items-center gap-4">
          <section className="flex flex-col items-center gap-4">
            {uploadFile && (
              <img
                src={URL.createObjectURL(uploadFile)}
                alt="Uploaded Preview"
                width="350"
                height="350"
                className="m-2 max-w-full"
              />
            )}
            <Button
              size="sm"
              className="bg-[#ffffff] border-solid border-1.5 border-main_blue text-main_blue"
            >
              이미지 업로드
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{
                  opacity: 0,
                  position: "absolute",
                }}
              />
            </Button>
          </section>
          <Link href="/auth/verify/wait">
            <Button
              size="sm"
              className="bg-[#ffffff] border-solid border-1.5 border-main_blue text-main_blue"
            >
              인증 다시하기
            </Button>
          </Link>
        </main>
      </div>
    </div>
  );
}

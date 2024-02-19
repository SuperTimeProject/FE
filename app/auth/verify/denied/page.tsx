"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

export default function Denied() {
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
    <div className="flex flex-col h-screen justify-center items-center">
      <header className="flex flex-col items-center">
        <div className="flex justify-center items-center m-4 gap-2">
          <p className="text-4xl font-mono">SUPER</p>
          <p className="text-4xl font-mono">TIME</p>
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
              className="m-2"
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
              className="opacity-0 absolute"
            />
          </Button>
        </section>
        <Link href="/auth/verify/pending">
          <Button
            size="sm"
            className="bg-[#ffffff] border-solid border-1.5 border-main_blue text-main_blue"
          >
            인증 다시하기
          </Button>
        </Link>
      </main>
    </div>
  );
}

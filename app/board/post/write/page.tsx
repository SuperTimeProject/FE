"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

export default function Write() {
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
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          <main>
            <section>
              <p>게시물 작성</p>
              <form>
                <Input type="text" label="제목"></Input>
                <Input type="text" label="게시판 선택? main/community"></Input>
                {uploadFile && (
                  <img
                    src={URL.createObjectURL(uploadFile)}
                    alt="Uploaded Preview"
                    width="50"
                    height="50"
                    className="m-2 max-w-full"
                  />
                )}
                <Button
                  size="sm"
                  className="bg-sub_purple font-semibold text-white"
                >
                  이미지 업로드
                  <input
                    type="file"
                    accept="image/*"
                    multiple // 이미지 multiple 선택
                    onChange={handleImageUpload}
                    style={{
                      opacity: 0,
                      position: "absolute",
                    }}
                  />
                </Button>
                <Input type="text" label="내용"></Input>
              </form>
              <Button
                size="sm"
                className="bg-sub_purple font-semibold text-white"
              >
                게시
              </Button>
            </section>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}

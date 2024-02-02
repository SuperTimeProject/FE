"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button, Divider, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";

export default function Write() {
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(0, 5);
      if (newFiles.length + uploadFiles.length > 5) {
        alert("이미지는 최대 5개까지 선택 가능합니다.");
      } else {
        setUploadFiles((prevFiles) => [...prevFiles, ...newFiles]);
      }
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          <main className="flex flex-col gap-4">
            <p className="flex justify-center">게시물 작성</p>
            <form className="flex flex-col gap-4">
              <Input type="text" label="제목"></Input>
              <Divider className="my-2" />
              <Textarea placeholder="내용" className="h-[178px]" />
            </form>
            <div className="flex justify-end">
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
                  className="opacity-0 absolute"
                />
              </Button>
            </div>
            <section className="h-[120px] flex justify-center items-center">
              {uploadFiles.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Uploaded Preview ${index + 1}`}
                  className="m-1 w-16 h-16 object-cover"
                />
              ))}
            </section>
            <div className="flex justify-end">
              <Button
                size="sm"
                className="bg-sub_purple font-semibold text-white"
              >
                게시
              </Button>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}

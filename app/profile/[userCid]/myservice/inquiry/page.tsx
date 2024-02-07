"use client";

import { publicApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button, Divider, Input, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface postInfo {
  userCid: number;
  postTitle: string;
  postContent: string;
  postImage: File[];
}

export default function Inquiry() {
  const router = useRouter();

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          <main className="flex flex-col gap-4">
            <p className="flex justify-center">문의하기</p>
            <form className="flex flex-col gap-4">
              <Input
                type="text"
                label="제목"
                // name="postTitle"
                // value={postInfo.postTitle}
                // onChange={handleInputChange}
              />
              <Divider className="my-2" />
              <Textarea
                placeholder="내용"
                // name="postContent"
                // value={postInfo.postContent}
                // onChange={handleInputChange}
                className="h-[178px]"
              />
            </form>
            {/* <div className="flex justify-end">
              <Button
                size="sm"
                className="bg-sub_purple font-semibold text-white"
              >
                이미지 선택
                <input
                  type="file"
                  accept="image/*"
                  multiple // 이미지 multiple 선택
                  onChange={handleImageUpload}
                  className="opacity-0 absolute"
                />
              </Button>
            </div>
            <section className="h-[120px] flex justify-start items-center">
              {postInfo.postImage.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`미리보기 ${index + 1}`}
                  className="m-1 w-16 h-16 object-cover"
                />
              ))}
            </section> */}
            <div className="flex justify-end">
              <Button
                size="sm"
                className="bg-sub_purple font-semibold text-white"
                // onClick={handlePostSubmit} router.push("/profile/users/myservice")
              >
                제출
              </Button>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}

"use client";

import { InquiryBody, submitInquiry } from "@/api/user/userInquiry";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Button, Divider, Input, Textarea } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InquiryRequest() {
  const router = useRouter();

  const [inquiryBody, setInquiryBody] = useState<InquiryBody>({
    inquiryTitle: "",
    inquiryContent: "",
    inquiryImage: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInquiryBody((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(0, 5);
      if (newFiles.length + inquiryBody.inquiryImage.length > 5) {
        alert("이미지는 최대 5개까지 선택 가능합니다.");
      } else {
        setInquiryBody((prevInfo) => ({
          ...prevInfo,
          inquiryImage: [...prevInfo.inquiryImage, ...newFiles],
        }));
      }
    }
  };

  const handleInquirySubmit = async () => {
    try {
      if (!inquiryBody.inquiryTitle || !inquiryBody.inquiryContent) {
        alert("제목과 내용은 필수 입력 사항입니다.");
        return;
      }

      const inquiryInfoData = {
        inquiryTitle: inquiryBody.inquiryTitle,
        inquiryContent: inquiryBody.inquiryContent,
      };

      const inquiryInfoJson = JSON.stringify(inquiryInfoData);
      const inquiryInfoBlob = new Blob([inquiryInfoJson], {
        type: "application/json",
      });

      const formData = new FormData();
      formData.append("inquiryInfo", inquiryInfoBlob);
      for (let i = 0; i < inquiryBody.inquiryImage.length; i++) {
        formData.append("inquiryImage", inquiryBody.inquiryImage[i]);
      }

      const success = await submitInquiry(formData);

      if (success) {
        alert("문의가 제출되었습니다.");
        router.back();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
      }
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-full max-w-[767px] p-4 bg-white">
        <Header />
        <div className="w-full min-h-[600px] p-4 bg-white">
          <main className="flex flex-col gap-4">
            <div className="flex items-center pl-1 pr-1 mt-3 mb-2">
              <div
                className="flex-none cursor-pointer"
                onClick={() => router.back()}
              >
                <img
                  src="/icons/back.png"
                  width="30"
                  height="30"
                  className="flex-none"
                />
              </div>
              <div className="w-[100%] text-xl flex justify-center pl-3 pr-3">
                문의하기
              </div>
            </div>
            <div className="h-[500px] overflow-y-auto scrollbar-none">
              <form className="flex flex-col gap-4">
                <Input
                  type="text"
                  label="제목"
                  name="inquiryTitle"
                  value={inquiryBody.inquiryTitle}
                  onChange={handleInputChange}
                />
                <Divider className="my-2" />
                <Textarea
                  placeholder="내용"
                  name="inquiryContent"
                  value={inquiryBody.inquiryContent}
                  onChange={handleInputChange}
                  className="h-[178px]"
                />
              </form>

              <div className="flex justify-end">
                <Button
                  size="sm"
                  className="bg-sub_purple font-semibold text-white"
                >
                  이미지 선택
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="opacity-0 absolute"
                  />
                </Button>
              </div>

              <section className="min-h-[120px] flex flex-col justify-start items-center">
                {inquiryBody.inquiryImage.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`미리보기 ${index + 1}`}
                    className="m-1 object-cover"
                  />
                ))}
              </section>

              <div className="flex justify-end">
                <Button
                  size="sm"
                  className="bg-sub_purple font-semibold text-white"
                  onClick={handleInquirySubmit}
                >
                  제출
                </Button>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}

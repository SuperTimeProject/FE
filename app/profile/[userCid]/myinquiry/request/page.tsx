"use client";

import { privateApi, publicApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button, Divider, Input, Textarea } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface InquiryInfo {
  inquiryTitle: string;
  inquiryContent: string;
  inquiryImage: File[];
}

// interface UserInfo {
//   userCid: number;
//   userId: string;
//   userName: string;
//   userNickname: string;
// }

export default function InquiryRequest() {
  // { userId }: { userId: string }
  const router = useRouter();
  // const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [inquiryInfo, setInquiryInfo] = useState<InquiryInfo>({
    inquiryTitle: "",
    inquiryContent: "",
    inquiryImage: [],
  });

  // useEffect(() => {
  //   const getUserInfo = async () => {
  //     const response = await privateApi.get("/auth/getUserInfo");

  //     if (response.data.success) {
  //       const userInfoData = response.data.getUserInfo;
  //       setUserInfo(userInfoData);
  //     }
  //   };

  //   getUserInfo();
  // }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInquiryInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(0, 5);
      if (newFiles.length + inquiryInfo.inquiryImage.length > 5) {
        alert("이미지는 최대 5개까지 선택 가능합니다.");
      } else {
        setInquiryInfo((prevInfo) => ({
          ...prevInfo,
          inquiryImage: [...prevInfo.inquiryImage, ...newFiles],
        }));
      }
    }
  };

  const handleInquirySubmit = async () => {
    try {
      if (!inquiryInfo.inquiryTitle || !inquiryInfo.inquiryContent) {
        alert("제목과 내용은 필수 입력 사항입니다.");
        return;
      }

      const inquiryInfoData = {
        inquiryTitle: inquiryInfo.inquiryTitle,
        inquiryContent: inquiryInfo.inquiryContent,
      };

      const inquiryInfoJson = JSON.stringify(inquiryInfoData);
      const inquiryInfoBlob = new Blob([inquiryInfoJson], {
        type: "application/json",
      });

      const formData = new FormData();
      formData.append("inquiryInfo", inquiryInfoBlob);
      for (let i = 0; i < inquiryInfo.inquiryImage.length; i++) {
        formData.append("inquiryImage", inquiryInfo.inquiryImage[i]);
      }

      const response = await privateApi.post("/user/inquiry", formData);

      if (response.data.success) {
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
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          <main className="flex flex-col gap-4">
            <div className="flex items-center">
              <Button
                size="sm"
                variant="light"
                onClick={() => router.back()}
                className="text-xl"
              >
                {"<"}
              </Button>
              <p className="text-l">문의하기</p>
            </div>
            <div className="h-[520px] overflow-y-auto scrollbar-none">
              <form className="flex flex-col gap-4">
                <Input
                  type="text"
                  label="제목"
                  name="inquiryTitle"
                  value={inquiryInfo.inquiryTitle}
                  onChange={handleInputChange}
                />
                <Divider className="my-2" />
                <Textarea
                  placeholder="내용"
                  name="inquiryContent"
                  value={inquiryInfo.inquiryContent}
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
                {inquiryInfo.inquiryImage.map((file, index) => (
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

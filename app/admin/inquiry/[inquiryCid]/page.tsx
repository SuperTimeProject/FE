"use client";

import { privateApi } from "@/api/axiosConfig";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Button, Divider, Textarea } from "@nextui-org/react";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface InquiryInfo {
  inquiryCid: number;
  userId: string;
  inquiryTitle: string;
  inquiryContent: string;
  imageList: InquiryImage[];
  answer: string;
  isClosed: string;
}

interface InquiryImage {
  postImageCid: number;
  postImageFileName: string;
  postImageFilePath: string;
}

export default function AdminAnswer({
  params,
}: {
  params: { inquiryCid: number };
}) {
  const router = useRouter();
  const [inquiryInfo, setInquiryInfo] = useState<InquiryInfo>(); // 기존 문의 내용

  useEffect(() => {
    console.log(inquiryInfo);
    const getInquiry = async () => {
      try {
        const res = await privateApi.get(
          `/user/inquiry/get/${params.inquiryCid}`
        );
        if (res.data.success) {
          setInquiryInfo(res.data.inquiryInfo);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data);
        }
      }
    };
    getInquiry();
  }, []);

  const answerSubmit = async () => {
    if (inquiryInfo === undefined) return;
    try {
      const res = await privateApi.put(
        `/admin/inquiry/answer/${params.inquiryCid}`,
        null,
        {
          params: {
            inquiryContent: inquiryInfo.answer,
          },
        }
      );
      if (res.data.success) {
        alert("답변이 완료되었습니다.");
        router.back();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      }
    }
  };

  if (inquiryInfo === undefined) return <div>로딩중...</div>;

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
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
              <p className="text-xl">{inquiryInfo?.inquiryTitle}</p>
            </div>
          </div>

          <Divider className="my-2" />
          <div>
            <div className="flex flex-col p-2 m-1 gap-2">
              <div className="h-[440px] overflow-auto scrollbar-none">
                <div className="min-h-40"> {inquiryInfo?.inquiryContent}</div>
                {inquiryInfo?.imageList?.length !== 0 &&
                  inquiryInfo?.imageList?.map((image) => (
                    <div className="flex justify-center pt-2 pb-2">
                      <img src={image.postImageFilePath} />
                    </div>
                  ))}
                <Divider className="my-2" />
                <Textarea
                  placeholder="답변을 입력하세요."
                  value={inquiryInfo?.answer || ""}
                  onChange={(e) =>
                    setInquiryInfo({ ...inquiryInfo, answer: e.target.value })
                  }
                  className="h-[178px] mb-2"
                />
                <div className="flex justify-end items-center">
                  <p className="text-xs text-red-500 pr-4">
                    *답변은 한 번만 제출할 수 있습니다.
                  </p>
                  <Button
                    size="sm"
                    className="bg-sub_purple font-semibold text-white"
                    onClick={answerSubmit}
                  >
                    제출
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

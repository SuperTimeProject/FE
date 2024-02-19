"use client";

import { privateApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  const [inquiryInfo, setInquiryInfo] = useState<InquiryInfo>();
  const [inquiryAnswer, setInquiryAnswer] = useState<string>("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getInquiry = async () => {
      try {
        const res = await privateApi.get(`/admin/inquiry/get/${page}`);

        if (res.data.success) {
          setInquiryInfo(res.data.inquiryList);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data.message);
        }
      }
    };
    getInquiry();
  }, []);

  const answerSubmit = async () => {
    try {
      const res = await privateApi.get(
        `/admin/inquiry/answer/${params.inquiryCid}`,
        { params: { inquiryAnswer } }
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

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Button
                size="sm"
                variant="light"
                onClick={() => router.back()}
                className="text-xl"
              >
                {"<"}
              </Button>
              <p className="text-xl">{inquiryInfo?.inquiryTitle}</p>
            </div>
          </div>
          <Divider className="my-2" />
          <div>
            <div className="flex flex-col p-2 m-1 gap-2">
              <div className="h-[440px] overflow-auto scrollbar-none">
                <div> {inquiryInfo?.inquiryContent}</div>
                {inquiryInfo?.imageList?.length !== 0 &&
                  inquiryInfo?.imageList?.map((image) => (
                    <div className="flex justify-center pt-2 pb-2">
                      <img src={image.postImageFilePath} />
                    </div>
                  ))}
                <Divider className="my-2" />
                <Textarea
                  placeholder="답변을 입력하세요."
                  value={inquiryAnswer}
                  onChange={(event) => setInquiryAnswer(event.target.value)}
                  className="h-[178px] mb-2"
                />
                <div className="flex justify-end">
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

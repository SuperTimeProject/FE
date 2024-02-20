"use client";

import { privateApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button, Pagination } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface InquiryList {
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

interface PageInfo {
  page: number;
  totalElements: number;
  totalPages: number;
}

export default function MyInquiry() {
  const router = useRouter();
  const pathname = usePathname();
  const [inquiryData, setInquiryData] = useState<InquiryList[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    const getInquiry = async () => {
      try {
        const res = await privateApi.get("/user/inquiry/get", {
          params: { page: page },
        });

        if (res.data.success) {
          const userInquiryData = res.data.inquiryList;
          // console.log("유저 문의", userInquiryData);
          setInquiryData(userInquiryData);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response);
        }
      }
    };
    getInquiry();
  }, []);

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
              문의 내역
            </div>
            <Link href={`${pathname}/request`}>
              <Button isIconOnly className="bg-sub_purple">
                <img
                  src="/icons/post.png"
                  width="30"
                  height="30"
                  style={{ filter: "brightness(0) invert(1)" }} // 이미지 색 white로 변경
                />
              </Button>
            </Link>
          </div>
          <div>
            <div className="flex flex-col p-2 m-1 gap-2">
              <div className="h-[430px] overflow-auto scrollbar-none">
                {inquiryData.length === 0 ? (
                  <p className="text-center text-gray-500">
                    문의 내역이 없습니다.
                  </p>
                ) : (
                  inquiryData.map((inquiry) => (
                    <div className="flex flex-col" key={inquiry.inquiryCid}>
                      <button
                        className="border-1.5 rounded-md border-gray-300 p-2 m-1"
                        onClick={() =>
                          router.push(
                            `${pathname}/detail/${inquiry.inquiryCid}`
                          )
                        }
                      >
                        <div className="flex justify-between items-center">
                          <p className="text-md">{inquiry.inquiryTitle}</p>
                          <p
                            className={`grid flex-end text-xs ${
                              inquiry.answer !== null
                                ? "text-main_blue"
                                : "text-sub_purple"
                            }`}
                          >
                            {inquiry.answer == null ? "답변대기" : "답변완료"}
                          </p>
                        </div>
                      </button>
                    </div>
                  ))
                )}
              </div>
              <Pagination
                showControls
                total={totalPage}
                initialPage={page}
                className="mt-3 flex justify-center"
                color="secondary"
                onChange={(page: number) => setPage(page)} // 수정
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

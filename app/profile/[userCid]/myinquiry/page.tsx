"use client";

import { getUserInquiry, InquiryList } from "@/api/user/userInquiry";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Button, Pagination } from "@nextui-org/react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyInquiry() {
  const router = useRouter();
  const pathname = usePathname();
  const [inquiryData, setInquiryData] = useState<InquiryList[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    const fetchUserInquiry = async () => {
      try {
        const inquiryList = await getUserInquiry(page);
        setInquiryData(inquiryList);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data.message);
        }
      }
    };
    fetchUserInquiry();
  }, []);

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-full max-w-[767px] p-4 bg-white">
        <Header />
        <div className="w-full min-h-[600px] p-4 bg-white">
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

            <Button
              isIconOnly
              className="bg-sub_purple 
              "
              onClick={() => router.push(`${pathname}/request`)}
            >
              <img
                src="/icons/post.png"
                width="30"
                height="30"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Button>
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

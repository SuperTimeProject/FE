"use client";

import {
  InquiryList,
  deleteInquiry,
  getAdminInquiry,
} from "@/api/admin/adminInquiry";

import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Button, Pagination } from "@nextui-org/react";
import axios from "axios";

import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminInquiry() {
  const router = useRouter();
  const pathname = usePathname();
  const [inquiryData, setInquiryData] = useState<InquiryList[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    const fetchInquiryList = async () => {
      try {
        const inquiryList = await getAdminInquiry(page);
        setInquiryData(inquiryList);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            console.log(error.response?.data.message);
          }
        }
      }
    };
    fetchInquiryList();
  }, []);

  const handleDeleteInquiry = async (inquiryCid: number) => {
    try {
      const success = await deleteInquiry(inquiryCid);
      if (success) {
        alert("삭제되었습니다.");
        window.location.reload();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const commentDate = new Date(timestamp);
    const currentDate = new Date();

    const timeDifferenceInSeconds = Math.floor(
      (currentDate.getTime() - commentDate.getTime()) / 1000
    );

    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds}초 전`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes}분 전`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours}시간 전`;
    } else {
      return formatDistanceToNow(commentDate, { addSuffix: true, locale: ko });
    }
  };

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
              문의 관리
            </div>
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
                    <div
                      key={inquiry.inquiryCid}
                      className="flex flex-col border-1.5 rounded-md border-gray-300 p-2 m-1 relative"
                    >
                      <button
                        onClick={() =>
                          router.push(`${pathname}/${inquiry.inquiryCid}`)
                        }
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <p>{inquiry.inquiryTitle}</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-xs">{inquiry.author}</p>
                            <p className="text-xs text-gray-500">
                              {formatTimestamp(inquiry.createdAt)}
                            </p>
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
                        </div>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="absolute top-0 right-0 text-lg text-red-500"
                          onClick={() =>
                            handleDeleteInquiry(inquiry.inquiryCid)
                          }
                        >
                          x
                        </Button>
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

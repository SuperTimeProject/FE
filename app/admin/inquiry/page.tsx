"use client";

import { privateApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button, Divider, Pagination } from "@nextui-org/react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface InquiryList {
  inquiryCid: number;
  author: string;
  inquiryTitle: string;
  inquiryContent: string;
  answer: string;
  createdAt: string;
}

interface PageInfo {
  page: number;
  totalElements: number;
  totalPages: number;
}

export default function AdminInquiry() {
  const router = useRouter();
  const pathname = usePathname();
  const [inquiryData, setInquiryData] = useState<InquiryList[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    const getInquiry = async () => {
      try {
        const res = await privateApi.get(`/admin/inquiry/get/${page}`);

        if (res.data.success) {
          setInquiryData(res.data.inquiryList);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response);
        }
      }
    };
    getInquiry();
  }, []);

  const deleteInquiry = async (inquiryCid: number) => {
    try {
      const res = await privateApi.delete(
        `/admin/inquiry/delete/${inquiryCid}`
      );
      if (res.data.success) {
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
              <p className="text-l">문의 관리</p>
            </div>
          </div>
          <Divider className="my-2" />
          <div>
            <div className="flex flex-col p-2 m-1 gap-2">
              <div className="h-[430px] overflow-auto scrollbar-none">
                {inquiryData?.map((inquiry) => (
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
                        onClick={() => deleteInquiry(inquiry.inquiryCid)}
                      >
                        x
                      </Button>
                    </button>
                  </div>
                ))}
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

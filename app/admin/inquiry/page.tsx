"use client";

import { privateApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button, Divider, Pagination } from "@nextui-org/react";
import axios from "axios";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface InquiryList {
  inquiryCid: number;
  author: string;
  inquiryTitle: string;
  inquiryContent: string;
  createdAt: string;
}

interface PageInfo {
  page: number;
  totalElements: number;
  totalPages: number;
}

export default function AdminInquiry({
  params,
}: {
  params: { inquiryCid: number };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [inquiryData, setInquiryData] = useState<InquiryList[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    const getInquiry = async () => {
      try {
        const res = await privateApi.get("/admin/inquiry/get");

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

  const deleteInquiry = async () => {
    const res = await privateApi.delete(
      `/admin/inquiry/delete/${params.inquiryCid}`
    );
    if (res.data.success) {
      alert("삭제되었습니다.");
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
                  <div className="flex flex-col">
                    <button
                      key={inquiry.inquiryCid}
                      className="border-1.5 rounded-md border-gray-300 p-2 m-1"
                      onClick={() =>
                        router.push(`${pathname}/answer/${inquiry.inquiryCid}`)
                      }
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-2">
                          <p className="text-sm">{inquiry.author}</p>
                          <p className="text-sm">{inquiry.inquiryTitle}</p>
                        </div>
                        <p
                          className={`grid flex-end text-xs ${inquiry.createdAt}`}
                        ></p>
                      </div>
                      <button className="text-red-500" onClick={deleteInquiry}>
                        삭제
                      </button>
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

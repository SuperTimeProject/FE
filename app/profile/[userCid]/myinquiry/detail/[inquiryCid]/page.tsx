"use client";

import { InquiryDetail, getInquiryDetail } from "@/api/user/userInquiry";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Divider } from "@nextui-org/react";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function InquiryDetail({
  params,
}: {
  params: { inquiryCid: number };
}) {
  const router = useRouter();
  const [inquiryDetail, setInquiryDetail] = useState<InquiryDetail>();

  useEffect(() => {
    const getInquiry = async () => {
      try {
        const inquiryDetail = await getInquiryDetail(params.inquiryCid);
        if (inquiryDetail) {
          setInquiryDetail(inquiryDetail);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data);
        }
      }
    };
    getInquiry();
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
              <p className="text-xl">{inquiryDetail?.inquiryTitle}</p>
            </div>
          </div>

          <Divider className="my-2" />
          <div>
            <div className="flex flex-col p-2 m-1 gap-2">
              <div className="h-[440px] overflow-auto scrollbar-none">
                <div className="min-h-40"> {inquiryDetail?.inquiryContent}</div>
                {inquiryDetail?.imageList?.length !== 0 &&
                  inquiryDetail?.imageList?.map((image) => (
                    <div className="flex justify-center pt-2 pb-2">
                      <img src={image.postImageFilePath} />
                    </div>
                  ))}
                <Divider className="my-2" />
                <div>{inquiryDetail?.answer}</div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

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
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface InquiryList {
  inquiryCid: number;
  userId: string;
  inquiryTitle: string;
  inquiryContent: string;
  // imageList: [
  //   {
  //     postImageCid: number;
  //     postImageFileName: string;
  //     postImageFilePath: string;
  //   }
  // ];
  answer: string;
  isClosed: string;
}

export default function MyInquiry() {
  const router = useRouter();
  const pathname = usePathname();
  const [inquiryData, setInquiryData] = useState<InquiryList[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
              <p className="text-l">문의 내역</p>
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
          <Divider className="my-2" />
          <div>
            <div className="flex flex-col p-2 m-1 gap-2">
              <div className="h-[430px] overflow-auto scrollbar-none">
                {inquiryData?.map((inquiry, index) => (
                  <div key={index} className="flex flex-col">
                    <button
                      className="border-1.5 rounded-md border-gray-300 p-2 m-1"
                      onClick={onOpen}
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-sm">{inquiry.inquiryTitle}</p>
                        <p
                          className={`grid flex-end text-xs ${
                            inquiry.answer !== null
                              ? "text-main_blue"
                              : "text-sub_purple"
                          }`}
                        >
                          {inquiry.isClosed}
                        </p>
                      </div>
                    </button>

                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                      <ModalContent>
                        {(onClose) => (
                          <>
                            <ModalHeader className="flex flex-col gap-1">
                              문의 내용
                            </ModalHeader>
                            <ModalBody>
                              <p>{inquiry.inquiryContent}</p>
                              {/* {inquiry?.imageList.map((image) => (
                              <div className="flex justify-center pt-2 pb-2">
                                <img
                                  src={image.postImageFilePath}
                                  alt=""
                                  width={250}
                                />
                              </div>
                            ))} */}
                              <Divider className="my-2" />
                              <p>{inquiry.answer}</p>
                            </ModalBody>
                            <ModalFooter>
                              <Button variant="light" onPress={onClose}>
                                닫기
                              </Button>
                            </ModalFooter>
                          </>
                        )}
                      </ModalContent>
                    </Modal>
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

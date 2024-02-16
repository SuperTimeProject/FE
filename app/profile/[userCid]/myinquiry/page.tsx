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
  useDisclosure,
} from "@nextui-org/react";
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
  isClosed: number;
}

export default function MyInquiry() {
  const router = useRouter();
  const pathname = usePathname();
  const [inquiryData, setInquiryData] = useState<InquiryList[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const getInquiry = async () => {
      const res = await privateApi.get("/user/inquiry/get");
      if (res.data.success) {
        const userInquiryData = res.data.inquiryList;
        console.log("유저 문의", userInquiryData);
        setInquiryData(userInquiryData);
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
            <Button variant="light" onClick={() => router.back()}>
              {"<"}
            </Button>
            <p className="text-l">문의 내역</p>
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
              {inquiryData?.map((inquiry, index) => (
                <Button
                  variant="light"
                  className="border-1.5 border-gray-500"
                  onPress={onOpen}
                >
                  <div
                    key={index}
                    className="flex justify-between items-center space-x-10"
                  >
                    <p className="text-sm">{inquiry.inquiryTitle}</p>
                    <p className="text-xs">
                      {inquiry.answer !== null ? "답변완료" : "답변대기"}
                    </p>

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
                </Button>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MyInquiry() {
  const pathname = usePathname();
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          <div>문의 리스트</div>
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
        <Footer />
      </div>
    </div>
  );
}

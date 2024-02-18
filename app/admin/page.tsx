"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          <main>
            <p className="flex justify-center text-xl font-mono font-semibold m-4">
              관리자페이지
            </p>
            <ul>
              <li>
                <p>인증관리</p>
              </li>
              <li>
                <p>게시판관리</p>
              </li>
              <li>
                <Button onClick={() => router.push(`${pathname}/inquiry`)}>
                  문의 관리
                </Button>
              </li>
              <li>
                <p>학생 / 기수관리</p>
              </li>
            </ul>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}

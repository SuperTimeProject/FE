"use client";

import { createSemester } from "@/api/semester";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminCreateSemester() {
  const router = useRouter();
  const [semesterName, setSemesterName] = useState("");

  const handleSubmit = async () => {
    const currentDate = new Date().toISOString().slice(0, 10);
    try {
      const success = await createSemester({
        semesterName,
        startDate: currentDate,
      });
      if (success) {
        alert("기수가 생성되었습니다.");
        router.back();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message);
      }
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
              <p className="text-xl">기수 생성</p>
            </div>
          </div>

          <div className="flex flex-col p-2 m-1 gap-2">
            <div className="h-[440px] overflow-auto scrollbar-none">
              <Input
                placeholder="ex) '2401' 형식으로 기수명을 입력하세요."
                value={semesterName}
                onChange={(e) => setSemesterName(e.target.value)}
              />
              <div className="flex justify-end items-center mt-2">
                <p className="text-xs text-red-500 pr-4">
                  *기수는 Full, Half time으로 생성됩니다.
                </p>
                <Button
                  size="sm"
                  className="bg-sub_purple font-semibold text-white"
                  onClick={handleSubmit}
                >
                  생성
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

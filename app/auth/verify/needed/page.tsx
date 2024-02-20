"use client";

import { privateApi } from "@/api/axiosConfig";
import { deleteCookie } from "@/components/utils/setCookie";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Needed() {
  const router = useRouter();
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      setUploadFile(file);
    } else {
      setUploadFile(null);
    }
  };

  const verifyReq = async () => {
    const formData = new FormData();
    if (uploadFile !== null) {
      formData.append("userProfileImage", uploadFile);
    }
    const response = await privateApi.post("/verification/apply", formData);
    if (response.data.success) {
      alert("인증을 요청하였습니다.");
      router.push("/auth/verify/pending");
    }
  };

  const handleLogout = async () => {
    try {
      deleteCookie(); // 로컬스토리지에 토큰값 삭제
      alert("로그아웃이 성공적으로 완료되었습니다.");
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <header className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center m-4 gap-2">
          <p className="text-4xl font-mono">SUPER</p>
          <p className="text-4xl font-mono">TIME</p>
        </div>
        <p className="font-medium text-xl m-4">슈퍼타임 인증</p>
      </header>
      <main className="flex flex-col items-center gap-4">
        <section className="flex flex-col items-center gap-4">
          {uploadFile && (
            <img
              src={URL.createObjectURL(uploadFile)}
              alt="Uploaded Preview"
              className="min-h-16 m-2"
            />
          )}
          <Button
            size="sm"
            className="bg-[#ffffff] border-solid border-1.5 border-main_blue text-main_blue"
          >
            이미지 업로드
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="opacity-0 absolute"
            />
          </Button>
        </section>

        <Button
          size="sm"
          className="bg-[#ffffff] border-solid border-1.5 border-main_blue text-main_blue"
          onClick={verifyReq}
        >
          인증하기
        </Button>
        <Button variant="light" onClick={() => handleLogout()}>
          로그아웃
        </Button>
      </main>
    </div>
  );
}

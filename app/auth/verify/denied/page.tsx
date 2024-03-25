"use client";

import { privateApi } from "@/api/axiosConfig";
import Header from "@/components/shared/header";
import LogoutButton from "@/components/shared/logoutButton";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Denied() {
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
    const response = await privateApi.put("/verification/reapply", formData);
    if (response.data.success) {
      alert("인증을 재요청하였습니다.");
      router.push("/auth/verify/pending");
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <header className="flex flex-col items-center">
        <Header />
        <p className="font-medium text-rose-600 text-xl m-4">
          기수 인증에 실패하였습니다.
        </p>
      </header>
      <main className="flex flex-col items-center gap-4">
        <section className="flex flex-col items-center gap-4">
          {uploadFile && (
            <img
              src={URL.createObjectURL(uploadFile)}
              alt="Uploaded Preview"
              className="m-2"
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
          인증 다시하기
        </Button>

        <LogoutButton />
      </main>
    </div>
  );
}
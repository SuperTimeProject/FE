"use client";

import { applyVerification } from "@/api/auth/verification";
import Header from "@/components/shared/header";
import LogoutButton from "@/components/shared/logoutButton";
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
    const success = await applyVerification(formData);
    if (success) {
      alert("인증을 요청하였습니다.");
      router.push("/auth/verify/pending");
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <header className="flex flex-col justify-center items-center">
        <Header />
      </header>
      <main className="flex flex-col items-center gap-4">
        <section className="flex flex-col items-center gap-4">
          <Button
            size="sm"
            variant="bordered"
            className="font-semibold border-main_blue text-main_blue min-w-[200px]"
          >
            이미지 업로드
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="opacity-0 absolute"
            />
          </Button>
          {uploadFile && (
            <img
              src={URL.createObjectURL(uploadFile)}
              alt="Uploaded Preview"
              className="m-2"
            />
          )}
        </section>

        <Button
          size="sm"
          variant="bordered"
          className="font-semibold border-main_blue text-main_blue min-w-[200px]"
          onClick={verifyReq}
        >
          인증하기
        </Button>

        <LogoutButton />
      </main>
    </div>
  );
}

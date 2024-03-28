"use client";

import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { privateApi } from "@/api/axiosConfig";
import { useRouter } from "next/navigation";
import { setCookie } from "@/components/utils/setCookie";
import axios from "axios";
import Header from "@/components/shared/header";
import { LoginData } from "@/api/auth/authUser";

export default function Login() {
  const router = useRouter();
  const [loginData, setLoginData] = useState<LoginData>({
    userId: "",
    userPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      // 유효성 검사
      if (!Object.values(loginData).every(Boolean)) {
        setErrorMessage("모든 필드를 입력해주세요.");
        return;
      }

      // Email 형식 검사
      const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailFormat.test(loginData.userId)) {
        setErrorMessage("올바른 이메일 주소를 입력해주세요.");
        return;
      }

      // const response = await loginUser(loginData);

      const response = await privateApi.post("/public/auth/login", loginData, {
        data: loginData, // JSON 형식으로 데이터 전송
      });

      if (response.data.success) {
        setCookie(response.headers.authorization);
        router.push("/board/main");
      } else {
        setErrorMessage("로그인에 실패했습니다.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setErrorMessage("이메일 또는 비밀번호를 확인해주세요.");
        } else {
          setErrorMessage(
            error.response?.data.message || "로그인에 실패했습니다."
          );
        }
      }
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-full p-8">
        <Header />
        {/* <header className="flex justify-center text-3xl font-mono m-8">
          로그인
        </header> */}
        <main className="flex flex-col gap-4">
          <form className="flex flex-col gap-4">
            <Input
              type="email"
              label="이메일"
              onChange={(e) =>
                setLoginData({ ...loginData, userId: e.target.value })
              }
            />
            <Input
              type="password"
              label="비밀번호"
              onChange={(e) =>
                setLoginData({ ...loginData, userPassword: e.target.value })
              }
            />
          </form>

          {errorMessage && (
            <p className="flex justify-center text-red-500">{errorMessage}</p>
          )}

          <Button
            className="bg-main_blue font-semibold text-white"
            onClick={handleLogin}
          >
            로그인
          </Button>
          <Button className="bg-sub_purple font-semibold text-white">
            소셜 로그인
          </Button>
        </main>
        <footer className="m-10">
          <Button
            onClick={() => router.push("/auth/signup")}
            className="w-full bg-white border-solid border-1.5 border-main_blue text-main_blue"
          >
            회원가입
          </Button>
        </footer>
      </div>
    </div>
  );
}

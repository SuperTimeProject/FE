"use client";

import React, { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { privateApi, setToken } from "@/api/axiosConfig";
import { useRouter } from "next/navigation";

interface LoginData {
  userId: string;
  userPassword: string;
}

export default function Login() {
  const router = useRouter();
  const [loginData, setLoginData] = useState<LoginData>({
    userId: "",
    userPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  //   // 회원가입 시 저장된 데이터 불러오기
  //   const storedSignupData = sessionStorage.getItem("signupData");
  //   if (storedSignupData) {
  //     const parsedSignupData = JSON.parse(storedSignupData);
  //     setLoginData({
  //       userId: parsedSignupData.userId,
  //       userPassword: parsedSignupData.userPassword,
  //     });
  //     // 저장된 데이터 지우기
  //     sessionStorage.removeItem("signupData");
  //   }
  // }, []);

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

      const response = await privateApi.post("/auth/login", loginData, {
        data: loginData, // JSON 형식으로 데이터 전송
      });
      // 응답 처리
      if (response.data.success) {
        setToken(response.data.token);
        setErrorMessage("로그인이 성공적으로 완료되었습니다.");
        router.push("/board/main");
        // /board/main -> 인증페이지
      } else {
        setErrorMessage("로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("서버 오류로 로그인에 실패했습니다.");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-96 p-8 border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <header className="flex justify-center text-3xl font-mono m-8">
          로그인
        </header>
        <main className="flex flex-col gap-4">
          <section className="flex flex-col gap-4">
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
          </section>
        </main>
        <footer className="flex justify-center m-10">
          <Link href="/auth/signup">
            <Button className="bg-[#ffffff] border-solid border-1.5 border-main_blue text-main_blue">
              회원가입
            </Button>
          </Link>
        </footer>
      </div>
    </div>
  );
}

"use client";

import { setToken } from "@/api/axiosConfig";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthCheck() {
  //url 정보 뽑기
  const pathname = usePathname(); // 로컬3000/auth/login
  const router = useRouter();

  // 상태체크
  // 1. 토큰 가져오기
  // 2. 토큰 없으면 리다이렉트
  // 3. 토큰 있으면 그 url 유지
  // 4. pathname이 회원가입이나 로그인 페이지 예외처리
  // 유즈이펙트 사용해서 언제언제 사용되게 할지 생각,,

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    const exceptions = ["/auth/login", "/auth/signup"];
    const isException = exceptions.includes(pathname);

    if (token && token !== "") {
      setToken(token);
    }

    if (!token && !isException) {
      // 토큰이 없으면 로그인 페이지로 리다이렉트
      router.push("/auth/login");
    } else if (token && isException) {
      // 로그인상태에서 강제로 유저가 url입력해서 로그인창이나 회원가입 창으로갔을때 main페이지로 리다이렉트 시키는 코드
      router.push("/");
    }
  }, [pathname, router]);

  return null;
}

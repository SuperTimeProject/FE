"use client";

import { setToken } from "@/api/axiosConfig";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { getCookie } from "../utils/setCookie";
import axios from "axios";
import GetUserInfo from "@/hook/getUserInfo";

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
    const token = getCookie();
    const exceptions = [
      "/auth/login",
      "/auth/signup",
      "/auth/verify/needed",
      "/auth/verify/pending",
      "/auth/verify/denied",
    ];
    const isException = exceptions.includes(pathname);

    const chechValified = async () => {
      const userInfo = await GetUserInfo();
      console.log(userInfo.valified);

      if (userInfo.role === "ROLE_USER") {
        switch (userInfo.valified) {
          case "NEEDED":
            const neededUrl = "/auth/verify/needed";
            !pathname.includes(neededUrl) && router.push(neededUrl);
            break;
          case "PENDING":
            const pendingUrl = "/auth/verify/pending";
            !pathname.includes(pendingUrl) && router.push(pendingUrl);
            break;
          case "COMPLETED":
            const completedUrl = "/board/main";
            isException && router.push(completedUrl);
            break;
          case "DENIED":
            const edniedUrl = "/auth/verify/denied";
            !pathname.includes(edniedUrl) && router.push(edniedUrl);
            break;
        }
      }
    };

    if (token && token !== "") {
      setToken(token);
      chechValified();
    } else if (!isException) {
      router.push("/");
    }
  }, [router, pathname]);

  return null;
}

"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { deleteCookie } from "../utils/setCookie";

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      deleteCookie(); // 로컬스토리지에 토큰값 삭제
      alert("로그아웃이 성공적으로 완료되었습니다.");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button variant="light" onClick={() => handleLogout()}>
      로그아웃
    </Button>
  );
}

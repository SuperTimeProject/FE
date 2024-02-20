"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie } from "@/components/utils/setCookie";

export default function Admin() {
  const router = useRouter();
  const pathname = usePathname();

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
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          <main>
            <p className="flex justify-center text-xl font-mono font-semibold m-4">
              관리자
            </p>
            <ul className="flex flex-col gap-4">
              <li className="flex flex-col">
                <Button
                  variant="bordered"
                  onClick={() => router.push(`${pathname}/verify`)}
                  className="flex justify-between font-semibold "
                >
                  <p>인증 관리</p>
                  <p> {">"}</p>
                </Button>
              </li>
              {/* <li className="flex flex-col">
                <Button
                  variant="bordered"
                  // onClick={() => router.push(`${pathname}/`)}
                  className="flex justify-between font-semibold "
                >
                  <p>게시판 관리</p>
                  <p> {">"}</p>
                </Button>
              </li> */}
              <li className="flex flex-col">
                <Button
                  variant="bordered"
                  onClick={() => router.push(`${pathname}/inquiry`)}
                  className="flex justify-between font-semibold "
                >
                  <p>문의 관리</p>
                  <p> {">"}</p>
                </Button>
              </li>

              <li className="flex justify-end">
                <Button variant="light" onClick={() => handleLogout()}>
                  로그아웃
                </Button>
              </li>
            </ul>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}

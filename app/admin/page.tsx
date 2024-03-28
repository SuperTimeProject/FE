"use client";

import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Button } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import LogoutButton from "@/components/shared/logoutButton";

export default function Admin() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-full max-w-[767px] p-4 bg-white">
        <Header />
        <div className="w-full min-h-[600px] p-4 bg-white">
          <main>
            <p className="flex justify-center text-xl font-mono font-semibold m-4">
              관리자
            </p>
            <ul className="flex flex-col gap-4">
              <li className="flex flex-col">
                <Button
                  onClick={() => router.push(`${pathname}/semester`)}
                  variant="bordered"
                  className="flex justify-between font-semibold border-main_blue text-main_blue"
                >
                  <p>기수 관리</p>
                  <p> {">"}</p>
                </Button>
              </li>
              <li className="flex flex-col">
                <Button
                  onClick={() => router.push(`${pathname}/verify`)}
                  variant="bordered"
                  className="flex justify-between font-semibold border-main_blue text-main_blue"
                >
                  <p>인증 관리</p>
                  <p> {">"}</p>
                </Button>
              </li>
              <li className="flex flex-col">
                <Button
                  onClick={() => router.push(`${pathname}/timetable`)}
                  variant="bordered"
                  className="flex justify-between font-semibold border-main_blue text-main_blue"
                >
                  <p>시간표 관리</p>
                  <p> {">"}</p>
                </Button>
              </li>
              <li className="flex flex-col">
                <Button
                  onClick={() => router.push(`${pathname}/inquiry`)}
                  variant="bordered"
                  className="flex justify-between font-semibold border-main_blue text-main_blue"
                >
                  <p>문의 관리</p>
                  <p> {">"}</p>
                </Button>
              </li>

              <li className="flex justify-end">
                <LogoutButton />
              </li>
            </ul>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}

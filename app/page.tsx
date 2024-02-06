import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-96 p-8 border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <header className="flex flex-col items-center gap-8">
          <img src="/favicon.ico" width="128" height="128" />
          <p className="text-5xl font-mono">SUPER TIME</p>
        </header>
        <section className="flex flex-col items-center gap-8 mt-16">
          <Link href="/auth/login">
            <Button
              size="lg"
              style={{ width: "250px" }}
              className="bg-[#ffffff] border-solid border-2 border-main_blue font-semibold text-main_blue"
            >
              로그인
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button
              size="lg"
              style={{ width: "250px" }}
              className="bg-[#ffffff] border-solid border-2 border-main_blue font-semibold text-main_blue"
            >
              회원가입
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}

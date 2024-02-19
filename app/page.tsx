import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <header className="flex flex-col items-center gap-8">
        <img src="/favicon.ico" width="128" height="128" />
        <div className="flex justify-center items-center m-4 gap-2">
          <p className="text-4xl font-mono">SUPER</p>
          <p className="text-4xl font-mono">TIME</p>
        </div>
      </header>
      <section className="flex flex-col items-center gap-8 mt-8">
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
  );
}

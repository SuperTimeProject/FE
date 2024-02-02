import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  const textStyling = {
    WebkitTextStroke: "1px black",
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-96 p-8 border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <header className="flex flex-col items-center gap-8">
          <img src="/favicon.ico" width="128" height="128" />
          <div className="flex justify-center items-center m-4 gap-2">
            <p style={textStyling} className="text-4xl font-mono text-white">
              SUPER
            </p>
            <p style={textStyling} className="text-4xl font-mono text-white">
              TIME
            </p>
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
    </div>
  );
}

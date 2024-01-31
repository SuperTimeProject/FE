import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <main>Super Time Home</main>
      <Link href="/auth/login">
        <Button className="bg-[#ffffff] border-solid border-1.5 border-main_blue text-main_blue">
          로그인
        </Button>
      </Link>
      <Link href="/auth/signup">
        <Button className="bg-[#ffffff] border-solid border-1.5 border-main_blue text-main_blue">
          슈퍼타임 회원가입
        </Button>
      </Link>
    </div>
  );
}

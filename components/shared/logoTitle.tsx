import { useRouter } from "next/navigation";
import React from "react";

export default function LogoTitle() {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      className="flex justify-center items-center m-8 gap-2"
    >
      <p className="text-4xl font-mono">SUPER</p>
      <p className="text-4xl font-mono">TIME</p>
    </div>
  );
}

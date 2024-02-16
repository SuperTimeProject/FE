import OverSize from "@/components/test/overSize";
import React from "react";

export default function TestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" w-full">
      <div className=" hidden min-[600px]:block">
        <OverSize />
      </div>
      <div className=" block h-[900px] min-[600px]:hidden">{children}</div>
    </div>
  );
}

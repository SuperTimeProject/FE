"use client";

import { Button, Code } from "@nextui-org/react";

export default function TestUi() {
  return (
    <div>
      <div>testcode</div>
      <Code color="success">testcode</Code>
      <div className=" w-10 bg-black">테스트용 div</div>
    </div>
  );
}

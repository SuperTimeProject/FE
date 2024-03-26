"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Textarea, Button } from "@nextui-org/react";

export default function room() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-full max-w-[767px] p-4 bg-white">
        <div className="w-full min-h-[600px] p-4 bg-white">
          <main className="flex justify-between items-center mt-3 pb-6 border-b-2">
            <Link href="/chat/list">
              <img src="/icons/back.png" width="35" height="35" />
            </Link>
            <p className="text-xl tracking-wide">그룹 채팅방</p>
            <img src="/icons/menu_icon.png" width="35" height="35" />
          </main>
          <section className="max-w-100 h-[580px] bg-gray-900"></section>
          <div className="mt-3 flex items-center justify-between">
            <input type="text" className="w-72 h-[50px] border-2"></input>
            <img src="/icons/chat_send_icon.png" width="30" height="30" />
          </div>
        </div>
      </div>
    </div>
  );
}

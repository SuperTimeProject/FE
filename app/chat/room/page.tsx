"use client";

import { useEffect, useRef } from "react";
/* import SockJS from "sockjs-client";
import Stomp from "stompjs"; */
import Link from "next/link";
import { Textarea, Button } from "@nextui-org/react";

export default function room() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <div className="w-96 h-[748px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
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

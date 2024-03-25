"use client";

import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import Link from "next/link";
import { useState } from "react";

export default function List() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          <main className="pb-3 flex justify-center text-xl tracking-widest">
            채팅
          </main>
          <p className="border-b-2 pb-2">모든 메세지</p>
          <Link href="/chat/room">
            <div className="flex border-b-2 pb-4 pt-4 items-center cursor-pointer">
              <img
                className="pr-4"
                src="/icons/chatlist_icon.png"
                width="60"
                height="60"
              />
              <div>
                <p className="font-semibold">동아리 채팅</p>
                <p className="text-gray-400">메세지</p>
              </div>
            </div>
          </Link>
          <div className="flex border-b-2 pb-4 pt-4 items-center cursor-pointer">
            <img
              className="pr-4"
              src="/icons/chatlist_icon.png"
              width="60"
              height="60"
            />
            <div>
              <p className="font-semibold">그룹 채팅</p>
              <p className="text-gray-400">메세지</p>
            </div>
          </div>
          <div className="flex border-b-2 pb-4 pt-4 items-center cursor-pointer">
            <img
              className="pr-4"
              src="/icons/chatlist_icon.png"
              width="60"
              height="60"
            />
            <div>
              <p className="font-semibold">기수 채팅</p>
              <p className="text-gray-400">메세지</p>
            </div>
          </div>
          <div className="flex border-b-2 pb-4 pt-4 items-center cursor-pointer">
            <img
              className="pr-4"
              src="/icons/chatlist_icon.png"
              width="60"
              height="60"
            />
            <div>
              <p className="font-semibold">프로젝트 채팅</p>
              <p className="text-gray-400">메세지</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

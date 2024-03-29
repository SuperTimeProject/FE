"use client";

import { ChatMessage } from "@/app/chat/page";
import { useEffect, useState } from "react";

export default function ChatRoom({ messages }: { messages: ChatMessage[] | [] }) {
  const displayTime = (timestamp: string) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours < 12 ? "오전" : "오후";
    // 오후일 경우 12시간 형식으로 변경
    hours = hours % 12 || 12;
    return `${period} ${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  };

  if (messages.length === 0) return <div>로딩중</div>;
  return (
    <div>
      {messages.map((messages, index) => (
        <div className="" key={index}>
          <div className="flex flex-col justify-between items-center my-2 w-[100%] pr-2">
            {/* 작성자 */}
            <div className="w-[100%] pl-2 text-gray-700 mb-1 flex items-center">
              {messages.sender}
              {/* 현재 시간 */}
              <div className="text-gray-500 text-sm pl-3">{displayTime(messages.createdAt)}</div>
            </div>

            {/* 채팅내용 */}
            <div className="w-[100%] bg-gray-100/60 rounded-xl mb-3 p-4">{messages.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

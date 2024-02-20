"use client";

import { ChatMessage } from "@/app/chat/page";
import { useEffect, useState } from "react";

export default function ChatRoom({
  messages,
}: {
  messages: ChatMessage[] | [];
}) {
  const [currentHour, setCurrentHour] = useState<number>(new Date().getHours());
  const [currentMinute, setCurrentMinute] = useState<number>(
    new Date().getMinutes()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentHour(now.getHours());
      setCurrentMinute(now.getMinutes());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (messages.length === 0) return <div>로딩중</div>;
  return (
    <div>
      {messages.map((messages, index) => (
        <div className="">
          <div
            className="flex flex-col justify-between items-center my-2 w-[100%] pr-2"
            key={index}
          >
            {/* 작성자 */}
            <div className="w-[100%] pl-2 text-gray-700 mb-1 flex items-center">
              {messages.sender}
              {/* 현재 시간 */}
              <div className="text-gray-500 text-sm pl-3">
                {currentHour < 10 ? "0" + currentHour : currentHour}:
                {currentMinute < 10 ? "0" + currentMinute : currentMinute}
              </div>
            </div>

            {/* 채팅내용 */}
            <div className="w-[100%] bg-gray-100/60 rounded-xl mb-3 p-4">
              {messages.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

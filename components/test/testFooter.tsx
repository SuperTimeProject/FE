"use client";

import { privateApi } from "@/api/axiosConfig";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TestFooter() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [userCid, setUserCid] = useState<number>();

  useEffect(() => {
    const getUser = async () => {
      const res = await privateApi.get("/auth/getUserInfo");
      if (res.data) {
        setUserCid(res.data.getUserInfo.userCid);
      }
    };
    getUser();
  }, []);

  const handleIconHover = (icon: string | null) => {
    setHoveredIcon(icon);
  };

  return (
    <footer className=" absolute w-full bottom-0 border-t-1 border-black">
      <nav className="flex justify-center items-center">
        <ul className="flex space-x-16 p-4">
          <li>
            <Link href="/board/main">
              <img
                src={hoveredIcon === "coding" ? "/icons/coding_color.png" : "/icons/coding.png"}
                width="40"
                height="40"
                alt="전체 게시판"
                onMouseEnter={() => handleIconHover("coding")}
                onMouseLeave={() => handleIconHover(null)}
              />
            </Link>
          </li>
          <li>
            <Link href="/board/community">
              <img
                src={hoveredIcon === "list" ? "/icons/list_color.png" : "/icons/list.png"}
                width="40"
                height="40"
                alt="커뮤니티 게시판"
                onMouseEnter={() => handleIconHover("list")}
                onMouseLeave={() => handleIconHover(null)}
              />
            </Link>
          </li>
          <li>
            <Link href="/chat/list">
              <img
                src={hoveredIcon === "chat" ? "/icons/chat_color.png" : "/icons/chat.png"}
                width="40"
                height="40"
                alt="채팅"
                onMouseEnter={() => handleIconHover("chat")}
                onMouseLeave={() => handleIconHover(null)}
              />
            </Link>
          </li>
          <li>
            <Link href={`/profile/${userCid}`}>
              <img
                src={hoveredIcon === "user" ? "/icons/user_color.png" : "/icons/user.png"}
                width="40"
                height="40"
                alt="프로필"
                onMouseEnter={() => handleIconHover("user")}
                onMouseLeave={() => handleIconHover(null)}
              />
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

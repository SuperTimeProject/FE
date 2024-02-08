"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const handleIconHover = (icon: string | null) => {
    setHoveredIcon(icon);
  };

  return (
    <footer>
      <nav className="flex justify-center items-center">
        <ul className="flex space-x-16 p-4">
          <li>
            <Link href="/board/main">
              <img
                src={
                  hoveredIcon === "coding"
                    ? "/icons/coding_color.png"
                    : "/icons/coding.png"
                }
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
                src={
                  hoveredIcon === "list"
                    ? "/icons/list_color.png"
                    : "/icons/list.png"
                }
                width="40"
                height="40"
                alt="커뮤니티 게시판"
                onMouseEnter={() => handleIconHover("list")}
                onMouseLeave={() => handleIconHover(null)}
              />
            </Link>
          </li>
          <li>
            <Link href="/chat">
              <img
                src={
                  hoveredIcon === "chat"
                    ? "/icons/chat_color.png"
                    : "/icons/chat.png"
                }
                width="40"
                height="40"
                alt="채팅"
                onMouseEnter={() => handleIconHover("chat")}
                onMouseLeave={() => handleIconHover(null)}
              />
            </Link>
          </li>
          <li>
            <Link href="/profile/users">
              <img
                src={
                  hoveredIcon === "user"
                    ? "/icons/user_color.png"
                    : "/icons/user.png"
                }
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

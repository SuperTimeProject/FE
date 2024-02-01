"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  const isActive = (link: string) => link === activeLink;

  return (
    <footer>
      <nav className="flex justify-center items-center">
        <ul className="flex space-x-16 p-4">
          <li>
            <Link
              href="/board/main"
              onClick={() => handleLinkClick("/board/main")}
            >
              <img
                src={
                  isActive("/board/main")
                    ? "/icons/coding_color.png"
                    : "/icons/coding.png"
                }
                width="45"
                height="45"
                alt="전체 게시판"
              />
            </Link>
          </li>
          <li>
            <Link
              href="/board/community"
              onClick={() => handleLinkClick("/board/community")}
            >
              <img
                src={
                  isActive("/board/community")
                    ? "/icons/list_color.png"
                    : "/icons/list.png"
                }
                width="45"
                height="45"
                alt="커뮤니티 게시판"
              />
            </Link>
          </li>
          <li>
            <Link href="/chat" onClick={() => handleLinkClick("/chat")}>
              <img
                src={
                  isActive("/chat")
                    ? "/icons/chat_color.png"
                    : "/icons/chat.png"
                }
                width="45"
                height="45"
                alt="채팅"
              />
            </Link>
          </li>
          <li>
            <Link
              href="/profile/user"
              onClick={() => handleLinkClick("/profile/user")}
            >
              <img
                src={
                  isActive("/profile/user")
                    ? "/icons/_color.png"
                    : "/icons/user.png"
                }
                width="45"
                height="45"
                alt="프로필"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

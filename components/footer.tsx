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
                width="40"
                height="40"
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
                width="40"
                height="40"
                alt="커뮤니티 게시판"
              />
            </Link>
          </li>
          <li>
            <Link
              href="/chat/list"
              onClick={() => handleLinkClick("/chat/list")}
            >
              <img
                src={
                  isActive("/chat/list")
                    ? "/icons/chat_color.png"
                    : "/icons/chat.png"
                }
                width="40"
                height="40"
                alt="채팅"
              />
            </Link>
          </li>
          <li>
            <Link
              href="/profile/users"
              onClick={() => handleLinkClick("/profile/users")}
            >
              <img
                src={
                  isActive("/profile/users")
                    ? "/icons/_color.png"
                    : "/icons/user.png"
                }
                width="40"
                height="40"
                alt="프로필"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

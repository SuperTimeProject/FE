"use client";

import GetUserInfo from "@/hook/getUserInfo";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [userCid, setUserCid] = useState<number>();
  const [role, setRole] = useState<string>();

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const userInfo = await GetUserInfo();
        setUserCid(userInfo.userCid);
        setRole(userInfo.role);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserInfo();
  }, []);

  const handleIconHover = (icon: string | null) => {
    setHoveredIcon(icon);
  };

  return (
    <footer>
      <nav className="flex justify-center items-center">
        <ul className="flex justify-between w-full p-8">
          <li>
            <Link href="/board/main">
              <div
                className="flex flex-col justify-center items-center gap-0.5"
                onMouseEnter={() => handleIconHover("main")}
                onMouseLeave={() => handleIconHover(null)}
              >
                <img
                  src={
                    hoveredIcon === "main"
                      ? "/icons/1_color.png"
                      : "/icons/1.png"
                  }
                  width="40"
                  height="40"
                  alt="전체 게시판"
                />
                <p className="text-xs">홈</p>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/board/community">
              <div
                className="flex flex-col justify-center items-center gap-0.5"
                onMouseEnter={() => handleIconHover("community")}
                onMouseLeave={() => handleIconHover(null)}
              >
                <img
                  src={
                    hoveredIcon === "community"
                      ? "/icons/2_color.png"
                      : "/icons/2.png"
                  }
                  width="40"
                  height="40"
                  alt="커뮤니티 게시판"
                />
                <p className="text-xs">커뮤니티</p>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/chat">
              <div
                className="flex flex-col justify-center items-center gap-0.5"
                onMouseEnter={() => handleIconHover("chat")}
                onMouseLeave={() => handleIconHover(null)}
              >
                <img
                  src={
                    hoveredIcon === "chat"
                      ? "/icons/3_color.png"
                      : "/icons/3.png"
                  }
                  width="40"
                  height="40"
                  alt="채팅"
                />
                <p className="text-xs">채팅</p>
              </div>
            </Link>
          </li>
          <li>
            {role === "ROLE_ADMIN" ? (
              <Link href="/admin">
                <div
                  className="flex flex-col justify-center items-center gap-0.5"
                  onMouseEnter={() => handleIconHover("user")}
                  onMouseLeave={() => handleIconHover(null)}
                >
                  <img
                    src={
                      hoveredIcon === "user"
                        ? "/icons/4_color.png"
                        : "/icons/4.png"
                    }
                    width="40"
                    height="40"
                    alt="프로필"
                  />
                  <p className="text-xs">관리자</p>
                </div>
              </Link>
            ) : (
              <Link href={`/profile/${userCid}`}>
                <div
                  className="flex flex-col justify-center items-center gap-0.5"
                  onMouseEnter={() => handleIconHover("user")}
                  onMouseLeave={() => handleIconHover(null)}
                >
                  <img
                    src={
                      hoveredIcon === "user"
                        ? "/icons/4_color.png"
                        : "/icons/4.png"
                    }
                    width="40"
                    height="40"
                    alt="프로필"
                  />
                  <p className="text-xs">프로필</p>
                </div>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </footer>
  );
}

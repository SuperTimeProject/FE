import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <nav className="flex justify-center items-center">
        <Link href="/board/main">
          <img
            src="/icons/coding.png"
            width="45"
            height="45"
            alt="전체 게시판"
          />
          {/* "/icons/coding_color.png" */}
        </Link>
        <Link href="/board/community">
          <img
            src="/icons/list.png"
            width="45"
            height="45"
            alt="커뮤니티 게시판"
          />
          {/* "/icons/list_color.png" */}
        </Link>
        <Link href="/chat">
          <img src="/icons/chat.png" width="45" height="45" alt="채팅" />
          {/* "/icons/chat_color.png" */}
        </Link>
        <Link href="/profile/user">
          <img src="/icons/user.png" width="45" height="45" alt="프로필" />
          {/* "/icons/_color.png" */}
        </Link>
      </nav>
    </footer>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <nav className="flex justify-center items-center">
        <Link href="/board/info">
          <img src="./icons/coding.png" alt="정보" />
        </Link>
        <Link href="/board/community">
          <img src="./icons/list.png" alt="게시판" />
        </Link>
        <Link href="/chat">
          <img src="./icons/chat.png" alt="채팅" />
        </Link>
        <Link href="/profile/user">
          <img src="./icons/user.png" alt="프로필" />
        </Link>
      </nav>
    </footer>
  );
}

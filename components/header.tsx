import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-center items-center">
      <Link href="/board/main">
        <p className="text-3xl font-mono m-8">SUPER TIME</p>
      </Link>
    </header>
  );
}

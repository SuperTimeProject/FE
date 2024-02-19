import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-center items-center">
      <Link href="/board/main">
        <div className="flex justify-center items-center m-4 gap-2">
          <p className="text-4xl font-mono">SUPER</p>
          <p className="text-4xl font-mono">TIME</p>
        </div>
      </Link>
    </header>
  );
}

import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-center items-center">
      <Link href="/">
        <h1 className="p-4">Super Time</h1>
      </Link>
    </header>
  );
}

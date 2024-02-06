import Link from "next/link";

export default function Header() {
  const textStyling = {
    WebkitTextStroke: "1px black",
  };
  return (
    <header className="flex justify-center items-center">
      <Link href="/board/main">
        <div className="flex justify-center items-center m-4 gap-2">
          <p style={textStyling} className="text-4xl font-mono text-white">
            SUPER
          </p>
          <p style={textStyling} className="text-4xl font-mono text-white">
            TIME
          </p>
        </div>
      </Link>
    </header>
  );
}

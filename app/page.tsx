import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <main>Super Time Home</main>
      <Link href="/auth/Login">
        <button>login</button>
      </Link>
      <Link href="/auth/SignUp">
        <button>signUp</button>
      </Link>
    </div>
  );
}

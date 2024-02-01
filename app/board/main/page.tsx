import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Main() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-96 p-8 border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <main>전체 게시판 메인</main>
        <Footer />
      </div>
    </div>
  );
}

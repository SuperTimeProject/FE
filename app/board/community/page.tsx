import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Community() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        {/* 게시판 리스트 -> UserBoard - 전체 게시판 제외 */}
        {/* PostExample 호출  */}
        {/* 시간표 */}
        <Footer />
      </div>
    </div>
  );
}

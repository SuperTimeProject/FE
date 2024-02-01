import Footer from "@/components/footer";
import Header from "@/components/header";

export default function List() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      <div className="w-96 h-[600px] m-4 p-8 border-1 border-[#d1d5db] bg-white">
        <main>채팅 리스트</main>
      </div>
      <Footer />
    </div>
  );
}

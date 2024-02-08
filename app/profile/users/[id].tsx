import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Users() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          <main>프로필</main>
        </div>
        <Footer />
      </div>
    </div>
  );
}
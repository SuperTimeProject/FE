import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button, Input } from "@nextui-org/react";

export default function Write() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          <main>
            <section>
              <p>게시물 작성</p>
              <form>
                <Input type="text" label="제목"></Input>
                <Input type="text" label="카테고리"></Input>
                <Input type="text" label="내용"></Input>
                <Input type="file" accept="image/*" />
              </form>
              <Button>게시</Button>
            </section>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}

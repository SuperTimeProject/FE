"use client";

import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import BoardComponent from "@/components/post/boardComponent";

interface UserBoard {
  boardName: string;
  boardCid: number;
}

interface IPostInfo {
  author: string;
  createdAt: string;
  postCid: number;
  postTitle: string;
  postView: number;
}

// 다이나믹 라우팅 사용 -> 폴더 위치 수정
// community -> [boardName]
export default function BoardDetail({
  params,
}: {
  params: { boardName: string };
}) {
  console.log(params.boardName);
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-full max-w-[767px] p-4 bg-white">
        <Header />
        <BoardComponent boardName={decodeURIComponent(params.boardName)} />
        <Footer />
      </div>
    </div>
  );
}

"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { privateApi } from "@/api/axiosConfig";
import GetUserInfo from "@/hook/getUserInfo";

interface Board {
  boardCid: number;
}

interface Post {
  postCid: number;
}

interface IPostInfo {
  author: string;
  createdAt: string;
  postCid: number;
  postTitle: string;
  postView: number;
}

export default function Main() {
  const [boardData, setBoardData] = useState<IPostInfo[] | null>([]);
  const [postData, setPostData] = useState(null);
  /*   const [boardData, setBoardData] = useState<Board>({ boardCid: 0 });
  const [postData, setPostData] = useState<Post>({ postCid: 0 }); */
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(1);

  // 추후에 사용 다른페이지에서
  // const [boardCid, setBoardCid] = useState(1);
  // const [userBoardInfo, setuserBoardInfo] = useState();
  // useEffect(() => {
  //   const getUserinfo = async () => {
  //     const userInfo = await GetUserInfo();
  //     setuserBoardInfo(userInfo.boardList);
  //   };
  //   getUserinfo();
  // }, []);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await privateApi.get(`/board/getBoard/1/${page}`);
        // 응답 처리
        if (response.data.success) {
          setBoardData(response.data.postList);
          setErrorMessage("");
        } else {
          setErrorMessage("게시판을 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("서버 오류로 게시판을 불러오는데 실패했습니다.");
      }
    };
    fetchBoardData(); // 게시판 데이터 불러오기
  }, [page]);

  console.log(boardData);

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          <main>전체 게시판 메인</main>
          {errorMessage && <p>{errorMessage}</p>}
          {boardData &&
            boardData.map((post) => (
              <div className=" flex justify-between border-1 border-black">
                <span>{post.author}</span>
                <span>{post.postTitle}</span>
                <span>{post.postView}</span>
                <span>{post.createdAt}</span>
              </div>
            ))}
          <Link href="/board/post/create">
            <Button isIconOnly aria-label="post" className="bg-sub_purple">
              <img
                src="/icons/post.png"
                width="30"
                height="30"
                style={{ filter: "brightness(0) invert(1)" }} // 이미지 색 white로 변경
              />
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    </div>
  );
}

// 전체 페이지 ui
// 위에 제가 작성해 드린부분 이해해오기
// TODO
// 각 개시판별 데이터 불러오기
// 잠 자기
// 혼자 울지 않기 -> 울기 전에 같이 공유해보기

"use client";

import { privateApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button, Divider, Tab, Tabs } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface UserPost {
  postCid: number;
  postTitle: string;
  createdAt: string;
}

interface UserBoard {
  boardName: string;
  boardCid: number;
}

export default function MyBoard() {
  const pathname = usePathname();
  const [userPost, setUserPost] = useState<UserPost[] | null>([]);
  const [userBoard, setUserBoard] = useState<UserBoard[]>([]);
  const [page, setPage] = useState<number>(1);
  const [currentBoard, setCurrentBoard] = useState<String>("전체 게시판");

  useEffect(() => {
    const getUser = async () => {
      const res = await privateApi.get("/auth/getUserInfo");
      if (res.data.success) {
        const userBoardData = res.data.getUserInfo.boardList;
        console.log("유저 게시판", userBoardData);
        setUserBoard(userBoardData);
      }
    };

    const getUserPost = async () => {
      if (userBoard) {
        try {
          const response = await privateApi.get(`/board/getUserPost/1/1`);

          if (response.data.success) {
            const userPostData = response.data.userPostList;
            console.log("유저 포스트", userPostData);
            setUserPost(userPostData);
          } else {
            alert("게시글을 불러오는데 실패했습니다.");
          }
        } catch (error) {
          console.error(error);
          alert("서버 오류로 게시글을 불러오는데 실패했습니다.");
        }
      }
    };
    getUser();
    getUserPost();
  }, []);

  // useEffect(() => {
  //   const getUserPost = async () => {
  //     try {
  //       const response = await privateApi.get(
  //         `/board/getUserPost/${boardCid}/${page}`
  //       );

  //       if (response.data.success) {
  //         const userPostData = response.data.userPostList;
  //         console.log("유저 포스트", userPostData);
  //         setUserPost(userPostData);
  //       } else {
  //         alert("게시글을 불러오는데 실패했습니다.");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       alert("서버 오류로 게시글을 불러오는데 실패했습니다.");
  //     }
  //   };
  //   getUserPost();
  // }, []);

  const getBoardPost = async (boardCid: number, page: number) => {
    try {
      const response = await privateApi.get(
        `/board/getUserPost/${boardCid}/${page}`
      );

      if (response.data.success) {
        const userPostData = response.data.userPostList;
        console.log("유저 포스트", userPostData);
        setUserPost(userPostData);
      } else {
        alert("게시글을 불러오는데 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("서버 오류로 게시글을 불러오는데 실패했습니다.");
    }
  };

  const handleDelete = async (postCid: number) => {
    try {
      const response = await privateApi.delete(`/board/delete/${postCid}`);
      if (response.data.success) {
        alert("게시글이 삭제되었습니다.");
      } else {
        alert("게시글을 삭제할 수 없습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("서버 오류로 게시글을 삭제할 수 없습니다.");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          {/* <Tabs
            variant="underlined"
            selectedKey={boardCid}
            onSelect={(key) => setBoardCid(Number(key))}
          >
            {userBoard?.map((board) => (
              <Tab
                key={board.boardCid}
                title={board.boardName}
                onClick={() => getBoardPost(board.boardCid, 1)}
              >
                <div></div>
              </Tab>
            ))}
          </Tabs> */}
          <div className="flex flex-col gap-4 p-2">
            <div className="flex justify-between">
              {userBoard?.map((board) => (
                <div
                  onClick={() => {
                    getBoardPost(board.boardCid, 1);
                    setCurrentBoard(board.boardName);
                  }}
                >
                  {board.boardName}
                </div>
              ))}
            </div>
            <div>
              {userPost?.map((post) => (
                <div
                  key={post.postCid}
                  className="flex flex-col justify-between border-1 rounded-lg border-gray-500 p-2 m-1"
                >
                  <p className="text-sm">{post.postTitle}</p>
                  <div className="flex justify-end items-center">
                    <p className="text-xs mr-2">{post.createdAt}</p>
                    <Link
                      href={`${pathname}/edit/${currentBoard}/${post.postCid}`}
                    >
                      <Button size="sm" variant="light">
                        수정
                      </Button>
                    </Link>
                    <Divider orientation="vertical" />
                    <Button
                      size="sm"
                      variant="light"
                      className="text-red-500"
                      onClick={() => handleDelete(post.postCid)}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

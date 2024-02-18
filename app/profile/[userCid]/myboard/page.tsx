"use client";

import { privateApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button, Divider, Pagination, Tab, Tabs } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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

interface PageInfo {
  page: number;
  totalElements: number;
  totalPages: number;
}

export default function MyBoard() {
  const router = useRouter();
  const pathname = usePathname();
  const [userPost, setUserPost] = useState<UserPost[]>([]);
  const [userBoard, setUserBoard] = useState<UserBoard[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [currentBoardCid, setCurrentBoardCid] = useState<number>(1);
  const [currentBoard, setCurrentBoard] = useState<string>("전체 게시판");

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await privateApi.get("/auth/getUserInfo");
        if (response.data.success) {
          setUserBoard(response.data.getUserInfo.boardList);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data.message);
        }
      }
    };

    // 초기 게시판
    const getUserPost = async () => {
      try {
        const response = await privateApi.get(
          `/board/getUserPost/${currentBoardCid}/1`
        );

        if (response.data.success) {
          setUserPost(response.data.userPostList);
          setUserBoard(response.data.boardInfo);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            setUserPost([]);
            setPageInfo({
              page: 1,
              totalElements: 0,
              totalPages: 0,
            });
          }
          console.log(error.response?.data.message);
        }
      }
    };

    getUser();
    getUserPost();
  }, []);

  const handleBack = () => {
    router.back();
  };

  const postPage = async (page: number) => {
    try {
      const response = await privateApi.get(
        `board/getUserPost/${currentBoardCid}/${page}`
      );
      setUserPost(response.data.userPostList);
      setUserBoard(response.data.boardInfo);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  const getBoardPost = async (boardCid: number, page: number) => {
    try {
      const response = await privateApi.get(
        `/board/getUserPost/${boardCid}/${page}`
      );

      if (response.data.success) {
        setUserPost(response.data.userPostList);
        // setUserBoard(response.data.boardInfo);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setUserPost([]);
        }
        console.log(error.response?.data.message);
      }
    }
  };

  const handleDelete = async (postCid: number) => {
    try {
      const response = await privateApi.delete(`/board/delete/${postCid}`);
      if (response.data.success) {
        alert("게시글이 삭제되었습니다.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
        window.location.reload();
      }
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          <div className="flex items-center">
            <Button
              size="sm"
              variant="light"
              onClick={handleBack}
              className="text-xl"
            >
              {"<"}
            </Button>
            <p className="text-l">내 게시글</p>
          </div>

          <Tabs
            variant="underlined"
            onSelectionChange={(key: React.Key) => {
              getBoardPost(key as number, 1);
              setCurrentBoardCid(currentBoardCid);
              setCurrentBoard(userBoard[(key as number) - 1].boardName);
            }}
          >
            {Array.isArray(userBoard) &&
              userBoard.map((board) => (
                <Tab key={board.boardCid} title={board.boardName}>
                  <div className="h-[430px] overflow-auto scrollbar-none">
                    {userPost.map((post) => (
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
                  <Pagination
                    showControls
                    total={pageInfo?.totalPages || 1}
                    initialPage={1}
                    className="mt-3 flex justify-center"
                    color="secondary"
                    onChange={(page: number) => postPage(page)}
                  />
                </Tab>
              ))}
          </Tabs>
        </div>
        <Footer />
      </div>
    </div>
  );
}

"use client";

import { privateApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Board {
  boardCid: number;
}
interface PostImage {
  postImageCid: number;
  postImageFileName: string;
  postImageFilePath: string;
}

interface PostInfo {
  postCid: number;
  author: string;
  imageList: PostImage[];
  postTitle: string;
  postContent: string;
  createdAt: string;
  postView: number;
}

export default function DetailPage({
  params,
}: {
  params: { postCid: number };
}) {
  const [postInfo, setPostInfo] = useState<PostInfo>();
  useEffect(() => {
    const getPostInfo = async () => {
      try {
        const res = await privateApi.get(`board/getPost/${params.postCid}`);
        setPostInfo(res.data.PostInfo);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data);
        }
      }
    };

    getPostInfo();
  }, []);

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white overflow-y-auto">
          <main className="pb-2 flex items-center  pl-1 pr-1">
            <Link href="/board/main" className="flex-none">
              <img
                src="/icons/back.png"
                width="35"
                height="35"
                className="flex-none"
              />
            </Link>
            {/* <p className="text-xl tracking-widest flex justify-center w-[100%] mr-5">
              커뮤니티 게시판
            </p> */}
            <div className="text-xl tracking-widest flex justify-center w-64 overflow-hidde">
              제목 :
              {postInfo?.postTitle && postInfo.postTitle.length > 10
                ? postInfo.postTitle.slice(0, 10) + "..."
                : postInfo?.postTitle}
            </div>
            {/* 게시판 */}
          </main>
          <div>
            <div className="flex gap-2 justify-end border-b-2 pb-2 mb-3">
              {/* <div>{params.postCid}</div> */}
              <div className="text-gray-500 text-sm">
                작성자 : {postInfo?.author} |
              </div>
              <div className="text-gray-500 text-sm">
                작성일 : {postInfo?.createdAt} |
              </div>
              {/* <div>제목 : {postInfo?.postTitle}</div> */}
              <div className="text-gray-500 text-sm">
                조회수 : {postInfo?.postView}
              </div>
            </div>
            <div className="h-[450px]">
              <div>내용 : {postInfo?.postContent}</div>
              {postInfo?.imageList.length !== 0 &&
                postInfo?.imageList.map((image) => (
                  <div>
                    <img
                      src={image.postImageFilePath}
                      alt=""
                      width={500}
                      height={500}
                    />
                    <div>{image.postImageFileName}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
  {
    /* <div>
      <div>{params.postCid}</div>
      <div>작성자 : {postInfo?.author}</div>
      <div>작성일 : {postInfo?.createdAt}</div>
      <div>제목 : {postInfo?.postTitle}</div>
      <div>내용 : {postInfo?.postContent}</div>
      <div>조회수 : {postInfo?.postView}</div>
      {postInfo?.imageList.length !== 0 &&
        postInfo?.imageList.map((image) => (
          <div>
            <img
              src={image.postImageFilePath}
              alt=""
              width={500}
              height={500}
            />
            <div>{image.postImageFileName}</div>
          </div>
        ))}
    </div> */
  }
}

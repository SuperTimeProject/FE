"use client";

import { privateApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    /* <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white overflow-y-auto"></div>
        <Footer />
      </div>
    </div> */

    <div>
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
    </div>
  );
}

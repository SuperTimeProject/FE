"use client";

import { privateApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface Board {
  boardCid: number;
  boardName: string;
}
interface PostImage {
  postImageCid: number;
  postImageFileName: string;
  postImageFilePath: string;
}

interface postInfo {
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
  const route = useRouter();
  const pathName = usePathname();
  const [postInfo, setPostInfo] = useState<postInfo>();
  useEffect(() => {
    const getPostInfo = async () => {
      try {
        const res = await privateApi.get(`board/getPost/${params.postCid}`);
        setPostInfo(res.data.postInfo);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data);
        }
      }
    };

    getPostInfo();
  }, []);

  const handleBack = () => {
    route.back();
  };

  const goComment = () => {
    route.push(`${pathName}/comment`);
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white overflow-y-auto">
          <main className=" pb-2 flex items-center pl-1 pr-1">
            {/* <div className="flex-none cursor-pointer" onClick={handleBack}>
              <img
                src="/icons/back.png"
                width="35"
                height="35"
                className="flex-none"
              />
            </div> */}
            <div className="w-[100%] text-xl flex justify-center pl-3 pr-3">
              {postInfo?.postTitle}
            </div>
          </main>
          <div>
            <div className="flex gap-2 justify-end border-b-2 pb-2 mb-3 pr-2">
              <div className="text-gray-500 text-sm">{postInfo?.author} |</div>
              <div className="text-gray-500 text-sm">
                {postInfo?.createdAt} |
              </div>
              <div className="text-gray-500 text-sm">{postInfo?.postView}</div>
            </div>
            <div className="h-[440px] overflow-y-auto  scrollbar-none">
              <div> {postInfo?.postContent}</div>
              {postInfo?.imageList.length !== 0 &&
                postInfo?.imageList.map((image) => (
                  <div className="flex justify-center pt-2 pb-2">
                    <img
                      src={image.postImageFilePath}
                      alt=""
                      width={250}
                      //height={300}
                    />
                    {/* <div>{image.postImageFileName}</div> */}
                  </div>
                ))}
            </div>
            <div className="flex justify-between">
              <Button
                isIconOnly
                className="bg-sub_purple float-right w-20 mt-3"
                onClick={handleBack}
              >
                <span className="text-white text-medium">글 목록</span>
              </Button>
              <Button
                isIconOnly
                className="bg-sub_purple float-right w-20 mt-3"
                onClick={goComment}
              >
                <span className="text-white text-medium">댓글</span>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

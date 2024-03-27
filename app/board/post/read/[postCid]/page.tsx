"use client";

import { privateApi } from "@/api/axiosConfig";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Comment from "@/components/post/comment";

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
        const res = await privateApi.get(`user/posts/${params.postCid}`);
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
      <div className="w-full max-w-[767px] p-4 bg-white">
        <Header />
        <div className="w-full min-h-[600px] p-4 bg-white overflow-y-auto">
          <main className="flex items-center pl-1 pr-1 mt-3 mb-2">
            <div className="flex-none cursor-pointer" onClick={handleBack}>
              <img
                src="/icons/back.png"
                width="30"
                height="30"
                className="flex-none"
              />
            </div>
            {/* <div>
              <div className="flex-none">
                <Button
                  size="sm"
                  variant="light"
                  onClick={handleBack}
                  className="text-xl"
                >
                  <img src="/icons/back.png" width="25" />
                </Button>
              </div>
            </div> */}
            <div className="w-[100%] text-xl flex justify-center pl-3 pr-3">
              {postInfo?.postTitle}
            </div>
            <div>
              <img src="/icons/transparent_box.png" width="30" height="30" />
            </div>
          </main>
          <div className="">
            <div className="flex gap-2 justify-end border-b-2 pb-2 pr-2">
              <div className="text-gray-500 text-sm">{postInfo?.author} |</div>
              <div className="text-gray-500 text-sm">
                {postInfo?.createdAt} |
              </div>
              <div className="text-gray-500 text-sm">
                조회수 {postInfo?.postView}
              </div>
            </div>
            <div className=" overflow-y-auto  scrollbar-none">
              <div className="min-h-[200px] pt-2 px-2">
                <div> {postInfo?.postContent}</div>
                {postInfo?.imageList.length !== 0 &&
                  postInfo?.imageList.map((image) => (
                    <div className="flex justify-center pt-2 pb-2">
                      <img
                        src={image.postImageFilePath}
                        alt=""
                        // width={250}
                        //height={300}
                      />
                      {/* <div>{image.postImageFileName}</div> */}
                    </div>
                  ))}
              </div>
              <Comment postCid={params.postCid} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

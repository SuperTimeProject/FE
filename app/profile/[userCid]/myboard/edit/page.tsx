"use client";

import { privateApi, publicApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button, Divider, Input, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PostInfo {
  postTitle: string;
  postContent: string;
  deleteImageList: number[];
  postImage: File[];
}
interface EditPostProps {
  params: {
    postCid: number;
  };
}

export default function EditPost({ params }: EditPostProps) {
  const router = useRouter();

  const [postInfo, setPostInfo] = useState<PostInfo>({
    postTitle: "",
    postContent: "",
    deleteImageList: [],
    postImage: [],
  });

  useEffect(() => {
    const getPostData = async () => {
      try {
        const response = await privateApi.get(
          `/board/getPost/${params.postCid}`
        );

        if (response.data.success) {
          const getPostInfo = response.data.post;
          setPostInfo(getPostInfo);
        } else {
          alert("게시글을 불러올 수 없습니다.");
        }
      } catch (error) {
        console.error(error);
        alert("서버 오류로 게시글을 불러올 수 없습니다.");
      }
    };

    getPostData();
  }, [params.postCid]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPostInfo((prevPostInfo) => ({
      ...prevPostInfo,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(0, 5);
      if (newFiles.length + postInfo.postImage.length > 5) {
        alert("이미지는 최대 5개까지 선택 가능합니다.");
      } else {
        setPostInfo((prevPostInfo) => ({
          ...prevPostInfo,
          postImages: [...prevPostInfo.postImage, ...newFiles],
        }));
      }
    }
  };

  const handlePostEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("postTitle", postInfo.postTitle);
      formData.append("postContent", postInfo.postContent);

      postInfo.postImage.forEach((image, index) => {
        formData.append(`postImage[${index}]`, image);
      });

      const response = await publicApi.put(
        `/board/edit/${params.postCid}`,
        formData
      );

      if (response.data.success) {
        alert("게시글이 수정되었습니다.");
        router.push("../myboard");
      } else {
        alert("게시글 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("서버 오류로 수정에 실패했습니다.");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          <main className="flex flex-col gap-4">
            <p className="flex justify-center">게시글 수정</p>
            <form className="flex flex-col gap-4">
              <Input
                type="text"
                label="제목"
                name="postTitle"
                value={postInfo.postTitle}
                onChange={handleInputChange}
              />
              <Divider className="my-2" />
              <Textarea
                placeholder="내용"
                name="postContent"
                value={postInfo.postContent}
                onChange={handleInputChange}
                className="h-[178px]"
              />
            </form>
            <div className="flex justify-end">
              <Button
                size="sm"
                className="bg-sub_purple font-semibold text-white"
              >
                이미지 선택
                <input
                  type="file"
                  accept="image/*"
                  multiple // 이미지 multiple 선택
                  onChange={handleImageUpload}
                  className="opacity-0 absolute"
                />
              </Button>
            </div>
            <section className="h-[120px] flex justify-start items-center">
              {postInfo.postImage.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`미리보기 ${index + 1}`}
                  className="m-1 w-16 h-16 object-cover"
                />
              ))}
            </section>
            <div className="flex justify-end">
              <Button
                size="sm"
                className="bg-sub_purple font-semibold text-white"
                onClick={handlePostEdit}
              >
                수정
              </Button>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}

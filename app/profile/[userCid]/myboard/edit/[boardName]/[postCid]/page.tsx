"use client";

import { privateApi, publicApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button, Divider, Input, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

// 불러오는 게시물 정보
interface PostInfoRes {
  postCid: number;
  author: string;
  postTitle: string;
  postContent: string;
  imageList: (IPostImage | null)[];
}

// 수정 요청 게시물 정보
interface PostInfoReq {
  postTitle: string;
  postContent: string;
  deleteImageList: number[];
  imageList: File[];
}

interface IPostImage {
  postImageCid: number;
  postImageFileName: string;
  postImageFilePath: string;
}

export default function EditPost({
  params,
}: {
  params: { postCid: number; boardCid: number; boardName: string };
}) {
  const router = useRouter();

  // 기존 게시물 정보
  const [postInfo, setPostInfo] = useState<PostInfoRes>();
  // 수정 게시물 정보
  const [editPost, setEditPost] = useState<PostInfoReq>({
    postTitle: "",
    postContent: "",
    deleteImageList: [],
    imageList: [],
  });

  useEffect(() => {
    const getPostData = async () => {
      try {
        const response = await privateApi.get(
          `/board/getPost/${params.postCid}`
        );

        if (response.data.success) {
          const getPostInfo = response.data.postInfo;
          setPostInfo(getPostInfo);

          setEditPost({
            postTitle: getPostInfo?.postTitle || "",
            postContent: getPostInfo?.postContent || "",
            deleteImageList: [],
            imageList: [],
          });
        } else {
          alert("게시글을 불러올 수 없습니다.");
        }
      } catch (error) {
        console.error(error);
        alert("서버 오류로 게시글을 불러올 수 없습니다.");
      }
    };
    getPostData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditPost((prevEditPost) => ({
      ...prevEditPost,
      [name]: value,
    }));
  };

  // 기존 이미지 리스트
  // 이미지 삭제 -> 삭제할 이미지 cid전달
  // 이미지 추가 -> 추가할 이미지 파일 전달
  // editPostInfo, postImage
  // formdata - postTitle, postContent, deleteImageList, imageList(fileType)
  //  이미올라가있는 이미지 1, 2, 3  새로운 이미지 4, 5, 6 삭제할 이미지 2, 3

  const deleteImage = (postImageCid: number) => {
    if (postImageCid !== undefined) {
      const isSelected = editPost.deleteImageList.includes(postImageCid);
      const updatedDeleteImageList = isSelected
        ? editPost.deleteImageList.filter((id) => id !== postImageCid)
        : [...editPost.deleteImageList, postImageCid];

      setEditPost((prevEditPost) => ({
        ...prevEditPost,
        deleteImageList: updatedDeleteImageList,
      }));
    }
  };

  const editNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(0, 5);
      if (
        newFiles.length + (editPost.imageList ? editPost.imageList.length : 0) >
        5
      ) {
        alert("이미지는 최대 5개까지 선택 가능합니다.");
      } else {
        setEditPost({
          ...editPost,
          imageList: [...editPost.imageList, ...newFiles],
        });
      }
    }
  };

  const editPostInfo = async () => {
    try {
      console.log(editPost);
      const editData = {
        postTitle: editPost.postTitle,
        postContent: editPost.postContent,
        deleteImageList: editPost.deleteImageList,
      };
      const editPostJson = JSON.stringify(editData);
      const editPostBlob = new Blob([editPostJson], {
        type: "application/json",
      });

      const formData = new FormData();
      formData.append("editPostInfo", editPostBlob);
      if (editPost.imageList !== null) {
        for (let i = 0; i < editPost.imageList.length; i++) {
          formData.append("postImage", editPost.imageList[i]);
        }
      }

      console.log(editData);

      const response = await privateApi.put(
        `/board/edit/${postInfo?.postCid}`,
        formData
      );

      if (response.data.success) {
        alert("게시글이 수정되었습니다.");
        router.back();
      } else {
        alert("게시글 수정에 실패했습니다.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
      }
      alert("서버 오류로 수정에 실패했습니다.");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          <main className="flex flex-col gap-2">
            <div className="flex items-center">
              <Button
                size="sm"
                variant="light"
                onClick={() => router.back()}
                className="text-xl"
              >
                {"<"}
              </Button>
              <p className="text-l">게시글 수정</p>
            </div>
            <Button size="sm" variant="ghost" isDisabled>
              {decodeURIComponent(params.boardName)}
            </Button>
            <div className="h-[480px] overflow-y-auto  scrollbar-none">
              <form className="flex flex-col gap-4">
                <Input
                  type="text"
                  label="제목"
                  name="postTitle"
                  value={editPost.postTitle || ""}
                  onChange={handleInputChange}
                />
                <Divider className="my-2" />
                <Textarea
                  placeholder="내용"
                  name="postContent"
                  value={editPost.postContent || ""}
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
                    onChange={editNewImage}
                    className="opacity-0 absolute"
                  />
                </Button>
              </div>
              <section className="min-h-[120px] flex flex-col justify-center items-center gap-2">
                <p className="text-xs">
                  기존 이미지 (삭제할 이미지를 선택해주세요.)
                </p>
                <div className="flex flex-col">
                  {/* 기존 이미지 배열 */}
                  {postInfo?.imageList !== null &&
                    postInfo?.imageList?.map((file, index) => (
                      <div
                        key={index}
                        className={"relative m-1 cursor-pointer"}
                        onClick={() => {
                          deleteImage(file?.postImageCid || 0);
                        }}
                      >
                        <img
                          src={file?.postImageFilePath}
                          alt={`미리보기 ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {editPost.deleteImageList.includes(
                          file?.postImageCid || 0
                        ) && (
                          <div className="absolute inset-0 border-2 rounded-lg border-red-500"></div>
                        )}
                      </div>
                    ))}
                </div>
                <Divider className="my-2" />
                <p className="text-xs">새로운 이미지</p>
                <div className="flex flex-col justify-start items-center">
                  {/* 새로운 이미지 배열 */}
                  {editPost?.imageList?.map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt={`미리보기 ${index + 1}`}
                      className="m-1 object-cover"
                    />
                  ))}
                </div>
              </section>
              <div className="flex justify-end">
                <Button
                  size="sm"
                  className="bg-sub_purple font-semibold text-white"
                  onClick={editPostInfo}
                >
                  수정
                </Button>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}

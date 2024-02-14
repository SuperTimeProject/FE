"use client";

import { privateApi, publicApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button, Divider, Input, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  postTitle: string | null;
  postContent: string | null;
  deleteImageList: (number | null)[];
  imageList: (IPostImage | null)[];
}

interface IPostImage {
  postImageCid: number;
  postImageFileName: string;
  postImageFilePath: string;
}

interface EditPostProps {
  params: {
    postCid: number;
  };
}

export default function EditPost({ params }: EditPostProps) {
  const router = useRouter();

  // 기존 게시물 정보
  const [postInfo, setPostInfo] = useState<PostInfoRes | undefined>(undefined);
  // 수정 게시물 정보
  const [editPost, setEditPost] = useState<PostInfoReq>({
    postTitle: null,
    postContent: null,
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
    setEditPost((prevEditPost) => ({
      ...prevEditPost,
      deleteImageList: [...prevEditPost.deleteImageList, postImageCid],
      imageList:
        prevEditPost.imageList?.filter(
          (image) => image?.postImageCid !== postImageCid
        ) || [],
    }));
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
          // imageList: [...newFiles],
        });
      }
    }
  };

  const editPostInfo = async () => {
    try {
      const formData = new FormData();
      formData.append("postTitle", editPost.postTitle || "");
      formData.append("postContent", editPost.postContent || "");
      formData.append(
        "deleteImageList",
        JSON.stringify(editPost.deleteImageList)
      );

      for (let i = 0; i < editPost.imageList.length; i++) {
        // formData.append("newImages", editPost.imageList[i]);
      }

      const response = await privateApi.put(
        `/board/edit/${params.postCid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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
          <main className="flex flex-col gap-2">
            <p className="flex justify-center">게시글 수정</p>
            <form className="flex flex-col gap-4">
              <Input
                type="text"
                label="제목"
                name="postTitle"
                // defaultValue={postInfo?.postTitle ? postInfo.postTitle : ""}
                defaultValue={postInfo?.postTitle ?? ""}
                onChange={handleInputChange}
              />
              <Divider className="my-2" />
              <Textarea
                placeholder="내용"
                name="postContent"
                // defaultValue={postInfo?.postContent ? postInfo.postContent : ""}
                defaultValue={postInfo?.postContent ?? ""}
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
            <section className="h-[120px] flex justify-start items-center">
              {/* 기존 이미지 배열 */}
              {postInfo?.imageList !== null &&
                postInfo?.imageList?.map((file, index) => (
                  <img
                    key={index}
                    src={file?.postImageFilePath}
                    alt={`미리보기 ${index + 1}`}
                    className="m-1 w-16 h-16 object-cover"
                    onClick={() => {
                      // PostInfoReq.deleteImageList에 삭제 클릭된 imageCid추가
                      deleteImage(file?.postImageCid || 0);
                      // postInfo.postImage에서 해당하는 cid를 가진 이미지 삭제
                    }}
                  />
                ))}
              {/* 새로운 이미지 배열 */}
              {/* 
                새로운 이미지 map함수 postInfoReq.imageList에 file타입으로 추가가
                */}
              {editPost?.imageList?.map(
                (file, index) =>
                  file && (
                    <img
                      key={index}
                      // src={URL.createObjectURL(file)}
                      alt={`미리보기 ${index + 1}`}
                      className="m-1 w-16 h-16 object-cover"
                    />
                  )
              )}
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
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}

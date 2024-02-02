"use client";

import { publicApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button, Divider, Input, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface editPostInfo {
  postTitle: string;
  postContent: string;
  deleteImageList: number[];
  postImage: File[];
}

export default function EditPost() {
  const router = useRouter();
  //   const { postCid } = router.query;

  const [editPostInfo, setEditPostInfo] = useState<editPostInfo>({
    postTitle: "",
    postContent: "",
    deleteImageList: [],
    postImage: [],
  });

  //   useEffect(() => {
  //     const fetchPostData = async () => {
  //       try {
  //         const response = await publicApi.get(`/Board/get/${postCid}`);

  //         if (response.data.success) {
  //           const editPostInfo = response.data.editPostInfo;
  //           setEditPostInfo({
  //             postTitle: editPostInfo.postTitle,
  //             postContent: editPostInfo.postContent,
  //             postImage: [],
  //           });
  //         } else {
  //           alert("게시글을 불러올 수 없습니다.");
  //         }
  //       } catch (error) {
  //         console.error(error);
  //         alert("서버 오류로 게시글을 불러올 수 없습니다.");
  //       }
  //     };

  //     fetchPostData();
  //   }, [postCid]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditPostInfo((prevEditInfo) => ({
      ...prevEditInfo,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(0, 5);
      if (newFiles.length + editPostInfo.postImage.length > 5) {
        alert("이미지는 최대 5개까지 선택 가능합니다.");
      } else {
        setEditPostInfo((prevEditInfo) => ({
          ...prevEditInfo,
          postImages: [...prevEditInfo.postImage, ...newFiles],
        }));
      }
    }
  };

  const handlePostEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("postTitle", editPostInfo.postTitle);
      formData.append("postContent", editPostInfo.postContent);

      editPostInfo.postImage.forEach((image, index) => {
        formData.append(`postImage[${index}]`, image);
      });

      //   const response = await publicApi.put(
      //     `/Board/update/${postCid}`,
      //     formData,
      //     {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //       },
      //     }
      //   );

      //   if (response.data.success) {
      //     alert("게시글 수정이 완료되었습니다.");
      //     // 페이지 이돌
      //   } else {
      //     alert("게시글 수정에 실패했습니다.");
      //   }
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
                value={editPostInfo.postTitle}
                onChange={handleInputChange}
              />
              <Divider className="my-2" />
              <Textarea
                placeholder="내용"
                name="postContent"
                value={editPostInfo.postContent}
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
              {editPostInfo.postImage.map((file, index) => (
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

"use client";

import { privateApi } from "@/api/axiosConfig";
import { UserBoard } from "@/api/user/post";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PostInfo {
  userCid: number;
  postTitle: string;
  postContent: string;
  postImage: File[];
}

export default function CreatePost() {
  const router = useRouter();
  const [boardInfo, setBoardInfo] = useState<UserBoard[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<UserBoard | null>(null);
  const [postInfo, setPostInfo] = useState<PostInfo>({
    userCid: 0,
    postTitle: "",
    postContent: "",
    postImage: [],
  });

  useEffect(() => {
    const getBoard = async () => {
      const res = await privateApi.get("/public/auth/user-info");
      if (res.data.success) {
        const userBoardData = res.data.getUserInfo.boardList;
        setBoardInfo(userBoardData);
      }
    };
    getBoard();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPostInfo((prevInfo) => ({
      ...prevInfo,
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
        setPostInfo((prevInfo) => ({
          ...prevInfo,
          postImage: [...prevInfo.postImage, ...newFiles],
        }));
      }
    }
  };

  const boardSelect = (selectedBoard: UserBoard) => {
    setSelectedBoard(selectedBoard);
  };

  const handlePostSubmit = async () => {
    try {
      if (!selectedBoard) {
        alert("카테고리를 선택하세요.");
        return;
      }

      if (!postInfo.postTitle || !postInfo.postContent) {
        alert("제목과 내용은 필수 입력 사항입니다.");
        return;
      }

      const postInfoData = {
        postTitle: postInfo.postTitle,
        postContent: postInfo.postContent,
      };

      const postInfoJson = JSON.stringify(postInfoData);
      const postInfoBlob = new Blob([postInfoJson], {
        type: "application/json",
      });

      const formData = new FormData();
      formData.append("postInfo", postInfoBlob);
      for (let i = 0; i < postInfo.postImage.length; i++) {
        formData.append("postImage", postInfo.postImage[i]);
      }

      const response = await privateApi.post(
        `/user/posts/${selectedBoard.boardCid}`,
        formData
      );
      if (response.data.success) {
        alert("게시글이 작성되었습니다.");
        if (selectedBoard.boardCid === 1) {
          router.push("/board/main");
        } else {
          router.push("/board/community");
        }
      } else {
        alert("게시글 작성에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("서버 오류로 작성에 실패했습니다.");
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-full max-w-[767px] p-4 bg-white">
        <Header />
        <div className="w-full min-h-[600px] p-4 bg-white">
          <main className="flex flex-col gap-2">
            <div className="flex items-center pl-1 pr-1 mt-3 mb-2">
              <div
                className="flex-none cursor-pointer"
                onClick={() => router.back()}
              >
                <img
                  src="/icons/back.png"
                  width="30"
                  height="30"
                  className="flex-none"
                />
              </div>
              <div className="w-[100%] text-xl flex justify-center pl-3 pr-3">
                게시글 작성
              </div>
            </div>

            <Dropdown>
              <DropdownTrigger>
                <Button size="sm" variant="ghost">
                  {selectedBoard?.boardName || "카테고리"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                {boardInfo.map((board) => (
                  <DropdownItem
                    key={board.boardCid}
                    onClick={() => boardSelect(board)}
                  >
                    {board.boardName}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <div className="h-[480px] overflow-y-auto scrollbar-none">
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
                    onChange={handleImageUpload}
                    className="opacity-0 absolute"
                  />
                </Button>
              </div>

              <section className="min-h-[120px] flex flex-col justify-start items-center">
                {postInfo.postImage.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`미리보기 ${index + 1}`}
                    className="m-1 object-cover"
                  />
                ))}
              </section>
              <div className="flex justify-end">
                <Button
                  size="sm"
                  className="bg-sub_purple font-semibold text-white"
                  onClick={handlePostSubmit}
                >
                  게시
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

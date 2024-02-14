"use client";

import { privateApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
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
interface BoardInfo {
  boardName: string;
  boardCid: number;
}

export default function CreatePost() {
  const router = useRouter();
  const [boardInfo, setBoardInfo] = useState<BoardInfo[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<BoardInfo | null>(null);
  const [postInfo, setPostInfo] = useState<PostInfo>({
    userCid: 0,
    postTitle: "",
    postContent: "",
    postImage: [],
  });

  useEffect(() => {
    const getBoard = async () => {
      const res = await privateApi.get("/auth/getUserInfo");
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

  const boardSelect = (selectedBoard: BoardInfo) => {
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

      const formData = new FormData();
      formData.append("postInfo", JSON.stringify(postInfoData));

      for (let i = 0; i < postInfo.postImage.length; i++) {
        formData.append("postImages", postInfo.postImage[i]);
      }

      const response = await privateApi.post(
        `/board/create/${selectedBoard.boardCid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        alert("게시글 작성되었습니다.");
        router.back();
      } else {
        alert("게시글 작성에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("서버 오류로 작성에 실패했습니다.");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          <main className="flex flex-col gap-2">
            <p className="flex justify-center">게시글 작성</p>
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
                onClick={handlePostSubmit}
              >
                게시
              </Button>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}

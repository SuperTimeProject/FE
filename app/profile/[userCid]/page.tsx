"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import { privateApi, setToken } from "@/api/axiosConfig";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import { useRouter } from "next/navigation";

interface UserInfo {
  userCid: number;
  userId: string;
  userName: string;
  userNickname: string;
  part: string | null;
  role: string | null;
  boardList: number[];
  semester: Semester;
  userProfile: UserProfile;
}

interface Semester {
  semesterCid: number;
  semesterDetailName: string;
  isFull: string;
}

interface UserProfile {
  userProfileCid: number;
  userProfileFileName: string;
  userProfileFilePath: string;
}

interface ProfileProps {
  params: {
    userCid: number;
  };
}

// localhost:3000

export default function Users({ params }: ProfileProps) {
  // console.log({ params });
  const router = useRouter();
  // const pathname = usePathname();
  // const { userCid } = pathname.query;
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isProfileEditMode, setProfileEditMode] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // modal

  const handleProfileEditMode = () => {
    setProfileEditMode(true);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await privateApi.get("/auth/getUserInfo");

        if (response.data.success) {
          const userInfoData = response.data.userInfo;
          setToken(response.data.token);
          setUserInfo(userInfoData);
        } else {
          setErrorMessage("유저 정보를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("서버 오류로 유저 정보를 불러오는데 실패했습니다.");
      }
    };

    fetchUserInfo();
  }, [[params.userCid]]);

  const handleProfileSave = () => {
    // 프로필 update 요청
    setProfileEditMode(false);
    setUploadFile(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      setUploadFile(file);
    } else {
      setUploadFile(null);
    }
  };
  const handleLogout = async () => {
    try {
      const response = await privateApi.post("api");
      if (response.data.success) {
        // const logoutUser = response.data.;
        // setUserInfo(logoutUser);
        // setToken(null);
        setErrorMessage("로그아웃이 완료되었습니다.");
        router.push("/auth/login");
      } else {
        setErrorMessage("로그아웃에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("서버 오류로 로그아웃에 실패했습니다.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await privateApi.delete("api");
      if (response.data.success) {
        // const deleteUser = response.data.;
        // setUserInfo(deleteUser);
        // setToken(null);
        setErrorMessage("회원 탈퇴가 완료되었습니다.");
        router.push("/auth/login");
      } else {
        setErrorMessage("회원 탈퇴에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("서버 오류로 회원 탈퇴에 실패했습니다.");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          <main>
            <p className="flex justify-center text-xl font-semibold m-2">
              마이페이지
            </p>
            <ul className="flex flex-col gap-4">
              <li className="flex justify-evenly p-2">
                <div className="relative">
                  <Avatar
                    className="w-24 h-24 bg-white"
                    src={
                      uploadFile
                        ? URL.createObjectURL(uploadFile)
                        : userInfo?.userProfile.userProfileFilePath
                    }
                  />
                  {isProfileEditMode && (
                    <Button
                      isIconOnly
                      size="sm"
                      className="absolute bottom-0 right-0 bg-white"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="opacity-0 absolute"
                      />
                      <img src="/icons/photo.png" className="w-6 h-6" />
                    </Button>
                  )}
                </div>
                <div className="flex flex-col justify-center gap-2">
                  <p>이메일{userInfo?.userId}</p>
                  <p>이름{userInfo?.userName}</p>
                  <p>닉네임{userInfo?.userNickname}</p>
                </div>
              </li>

              <div className="flex justify-end">
                {isProfileEditMode ? (
                  <Button
                    size="sm"
                    onClick={handleProfileSave}
                    className="bg-[#ffffff] border-solid border-1.5 border-main_blue text-main_blue"
                  >
                    저장
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={handleProfileEditMode}
                    className="bg-[#ffffff] border-solid border-1.5 border-main_blue text-main_blue"
                  >
                    프로필 수정
                  </Button>
                )}
              </div>

              <li className="flex flex-col gap-2 p-2">
                <div className="flex justify-evenly gap-2">
                  <p>기수 {userInfo?.semester.semesterDetailName}</p>
                  <p>FULL or HALF {userInfo?.semester.isFull} TIME</p>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="bordered">
                        {userInfo?.part || "FE / BE / FULL"}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem></DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <p className="text-xs text-red-500">
                    *2일 동안 자유롭게 선택 가능합니다.
                  </p>
                </div>
              </li>
              <li className="flex flex-col">
                <Button
                  onClick={() => router.push("/profile/users/myboard")}
                  className="flex justify-between font-semibold bg-[#ffffff] border-solid border-1.5 border-main_blue text-main_blue"
                >
                  <p>내가 쓴 게시글</p>
                  <p> {">"}</p>
                </Button>
              </li>
              <li className="flex flex-col">
                <Button
                  onClick={() => router.push("/profile/users/myservice")}
                  className="flex justify-between font-semibold bg-[#ffffff] border-solid border-1.5 border-main_blue text-main_blue"
                >
                  <p>문의하기</p>
                  <p> {">"}</p>
                </Button>
              </li>
              <li className="flex justify-between">
                <Button color="danger" variant="light" onPress={onOpen}>
                  회원탈퇴
                </Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          회원탈퇴
                        </ModalHeader>
                        <ModalBody>
                          <p>회원탈퇴하시겠습니까?</p>
                          <p>탈퇴시, 계정은 삭제되며 복구되지 않습니다.</p>
                        </ModalBody>
                        <ModalFooter>
                          <Button variant="light" onPress={onClose}>
                            취소
                          </Button>
                          <Button
                            color="danger"
                            onPress={onClose}
                            onClick={() => handleDeleteAccount()}
                          >
                            탈퇴
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
                <Button variant="light" onClick={() => handleLogout()}>
                  로그아웃
                </Button>
              </li>
            </ul>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}

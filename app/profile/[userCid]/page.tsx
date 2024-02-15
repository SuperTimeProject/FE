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
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import { usePathname, useRouter } from "next/navigation";

interface UserInfo {
  userCid: number;
  userId: string;
  userName: string;
  userNickname: string;
  part: string;
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

export default function Users() {
  const router = useRouter();
  const pathname = usePathname();

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const [isProfileEditMode, setProfileEditMode] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // modal

  const partOptions = ["PART_FE", "PART_BE", "PART_FULL"];

  const handleProfileEditMode = () => {
    setProfileEditMode(true);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await privateApi.get("/auth/getUserInfo");

        if (response.data.success) {
          const userInfoData = response.data.getUserInfo;
          setUserInfo(userInfoData);
          // console.log(userInfoData);
        } else {
          alert("로그인한 유저 정보를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.error(error);
        alert("서버 오류로 로그인한 유저 정보를 불러오는데 실패했습니다.");
      }
    };

    getUserInfo();
  }, []);

  useEffect(() => {
    const getUserPart = async () => {
      try {
        const response = await privateApi.get("/user/part");

        if (response.data.success) {
          const partData = response.data.getUserInfo.part;
          setPartOptions(partData);
        } else {
          alert("유저 파트를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.error(error);
        alert("서버 오류로 유저 파트를 불러오는데 실패했습니다.");
      }
    };

    getUserPart();
  }, []);

  const partSelect = async () => {

    try {
      const response = await privateApi.put(`/user/part/${selectedPart}`);
      if (response.data.success) {
        // setUserInfo(response.data.getUserInfo.part);
        alert("주특기가 선택되었습니다.");
      } else {
        alert("주특기 선택에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("서버 오류로 주특기 선택에 실패했습니다.");
    }
  };

  const handleInfoEdit = async () => {
    try {
      const formData = new FormData();

      // if (uploadFile) {
      //   formData.append("userImage", uploadFile);
      // }
      formData.append("userNickname", userInfo?.userNickname || "");

      const response = await privateApi.put("/user/info/edit", formData);

      if (response.data.success) {
        const updatedUserInfo = response.data.getUserInfo;
        setUserInfo(updatedUserInfo);
        alert("프로필 수정이 완료되었습니다.");
        setProfileEditMode(false);
      } else {
        alert("프로필 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("서버 오류로 프로필 수정에 실패했습니다.");
    }
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
      localStorage.removeItem("TOKEN"); // 로컬스토리지에 토큰값 삭제
      alert("로그아웃이 성공적으로 완료되었습니다.");
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await privateApi.delete("api");
      if (response.data.success) {
        // const deleteUser = response.data.;
        // setUserInfo(deleteUser);
        // setToken(null);
        alert("회원 탈퇴가 완료되었습니다.");
        router.push("/auth/login");
      } else {
        alert("회원 탈퇴에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("서버 오류로 회원 탈퇴에 실패했습니다.");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          <main>
            <p className="flex justify-center text-xl font-mono font-semibold m-4">
              마이페이지
            </p>
            <ul className="flex flex-col gap-4">
              <li className="flex justify-evenly items-center p-2">
                <div className="relative">
                  <Avatar
                    className="w-16 h-16 bg-white"
                    src={
                      uploadFile
                        ? URL.createObjectURL(uploadFile)
                        : userInfo?.userProfile?.userProfileFilePath
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
                <div className="flex flex-col justify-center items-center gap-2">
                  <div className="flex justify-center items-center gap-2">
                    <p className="font-mono">
                      {userInfo?.semester.semesterDetailName}
                    </p>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button size="sm" variant="ghost">
                          {userInfo?.part || "주특기 선택"}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        {partOptions.map((part) => (
                          <DropdownItem key={part} onClick={() => partSelect()}>
                            {part}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <p className="text-xs text-red-500">
                    *주특기를 선택해주세요.
                  </p>
                </div>
              </li>
              <li>
                <div className="flex flex-col justify-center gap-2">
                  <Input
                    isDisabled={isProfileEditMode}
                    isReadOnly={!isProfileEditMode}
                    size="sm"
                    type="email"
                    label="이메일"
                    variant="underlined"
                    value={userInfo?.userId}
                  />
                  <Input
                    isDisabled={isProfileEditMode}
                    isReadOnly={!isProfileEditMode}
                    size="sm"
                    type="text"
                    label="이름"
                    variant="underlined"
                    value={userInfo?.userName}
                  />
                  <Input
                    isReadOnly={!isProfileEditMode}
                    size="sm"
                    type="text"
                    label="닉네임"
                    variant="underlined"
                    value={userInfo?.userNickname}
                  />
                </div>
              </li>

              <div className="flex justify-end items-center mb-4">
                {isProfileEditMode ? (
                  <>
                    <p className="text-xs text-red-500 pr-4">
                      *프로필 사진과 닉네임만 변경 가능합니다.
                    </p>
                    <Button
                      size="sm"
                      onClick={handleInfoEdit}
                      className="bg-sub_purple text-white"
                    >
                      저장
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    onClick={handleProfileEditMode}
                    className="bg-sub_purple text-white"
                  >
                    프로필 수정
                  </Button>
                )}
              </div>

              <li className="flex flex-col">
                <Button
                  onClick={() => router.push(`${pathname}/myboard`)}
                  className="flex justify-between font-semibold bg-[#ffffff] border-1.5 border-sub_purple text-sub_purple"
                >
                  <p>내가 쓴 게시글</p>
                  <p> {">"}</p>
                </Button>
              </li>
              <li className="flex flex-col">
                <Button
                  onClick={() => router.push(`${pathname}/myinquiry`)}
                  className="flex justify-between font-semibold bg-[#ffffff] border-1.5 border-sub_purple text-sub_purple"
                >
                  <p>문의하기</p>
                  <p> {">"}</p>
                </Button>
              </li>
              <li className="flex justify-between mt-4">
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

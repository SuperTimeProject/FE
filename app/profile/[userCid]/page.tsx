"use client";

import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Checkbox,
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
import axios from "axios";
import {
  deleteProfileImage,
  deleteUserAccount,
  editUserProfile,
  getUserInfo,
  selectPart,
  confirmUserPart,
  UserInfo,
  EditUserInfo,
  UserProfile,
} from "@/api/user/profile";

import LogoutButton from "@/components/shared/logoutButton";
import { publicApi } from "@/api/axiosConfig";

export default function Users() {
  const router = useRouter();
  const pathname = usePathname();

  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [isProfileEdit, setProfileEdit] = useState(false);
  const [isNickNameEdit, setNickNameEdit] = useState(false);
  const [editInfo, setEditInfo] = useState<EditUserInfo>({
    userNickname: "",
    userProfileImage: null,
  });
  const [userImage, setUserImage] = useState<UserProfile>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // modal
  const partOptions = ["PART_FE", "PART_BE", "PART_FULL"];

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userInfo = await getUserInfo();
        setUserInfo(userInfo);
        setUserImage(userInfo.userProfile);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data.message);
        }
      }
    };

    getUserData();
  }, []);

  const handlePartSelect = async (selectedPart: string) => {
    try {
      const response = await selectPart(selectedPart);
      if (response.success) {
        alert("주특기가 선택되었습니다.");
        window.location.reload();
      } else {
        alert("주특기 선택에 실패했습니다.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  const confirmPart = async () => {
    try {
      const response = await confirmUserPart();
      if (response.success) {
        alert("주특기가 확정되었습니다.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  const handleNicknameChange = async () => {
    try {
      if (editInfo.userNickname.length < 2) {
        alert("닉네임은 2글자 이상이어야 합니다.");
        return;
      }

      const nicknameCheck = await publicApi.get(
        "/public/auth/duplicate-test/nickname",
        {
          params: {
            nickname: editInfo.userNickname,
          },
        }
      );

      if (nicknameCheck.data.duplicate) {
        alert("이미 사용 중인 닉네임입니다.");
        return;
      }

      const params = {
        userNickname: editInfo.userNickname || "",
      };

      const formData = new FormData();
      if (editInfo.userProfileImage !== null) {
        formData.append("userProfileImage", editInfo.userProfileImage);
      }

      const editUserInfo = await editUserProfile(formData, params);

      if (editUserInfo.success) {
        const updatedUserRes = await getUserInfo();

        if (updatedUserRes) {
          const updatedUserInfo = updatedUserRes;

          setUserInfo(updatedUserInfo);
          alert("닉네임 변경이 완료되었습니다.");
          setNickNameEdit(false);
        }
      } else {
        alert("닉네임 변경에 실패했습니다.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  const handleProfileImageChange = async () => {
    try {
      const formData = new FormData();
      if (editInfo.userProfileImage !== null) {
        formData.append("userProfileImage", editInfo.userProfileImage);
      }

      const editUserInfo = await editUserProfile(formData, null);

      if (editUserInfo.success) {
        const updatedUserRes = await getUserInfo();

        if (updatedUserRes) {
          const updatedUserInfo = updatedUserRes;

          setUserInfo(updatedUserInfo);
          setUserImage(updatedUserInfo.userProfile);
          alert("프로필 사진 변경이 완료되었습니다.");
          setProfileEdit(false);
        }
      } else {
        alert("프로필 사진 변경에 실패했습니다.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  const handleNicknameEdit = () => {
    setNickNameEdit(true);
    setEditInfo({
      userNickname: userInfo?.userNickname || "",
      userProfileImage: null,
    });
  };

  const handleProfileEdit = () => {
    setProfileEdit(true);
    setEditInfo({
      userNickname: userInfo?.userNickname || "",
      userProfileImage: null,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setEditInfo({
      ...editInfo,
      userProfileImage: files?.[0] || null,
    });
  };

  const handleImageDelete = async () => {
    try {
      const response = await deleteProfileImage();
      if (response.success) {
        alert("프로필 사진이 삭제되었습니다.");
        window.location.reload();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message);
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await deleteUserAccount();
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
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-full max-w-[767px] p-4 bg-white">
        <Header />
        <div className="w-full min-h-[600px] p-4 bg-white">
          <main>
            <p className="flex justify-center text-xl font-mono font-semibold m-4">
              마이페이지
            </p>
            <ul className="flex flex-col gap-4">
              <li className="flex justify-evenly items-center p-2">
                <div className="relative">
                  <Avatar
                    className="w-24 h-24 bg-white"
                    src={
                      isProfileEdit
                        ? editInfo.userProfileImage
                          ? URL.createObjectURL(editInfo.userProfileImage)
                          : undefined
                        : userInfo?.userProfile?.userProfileFilePath
                    }
                  />

                  {isProfileEdit && (
                    <>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        className="absolute top-0 right-0 font-bold text-red-500"
                        onClick={handleImageDelete}
                      >
                        X
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        className="absolute bottom-0 right-0"
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="opacity-0 absolute"
                        />
                        <img src="/icons/photo.png" className="w-6 h-6" />
                      </Button>
                    </>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
                    <p className="font-mono">
                      {userInfo?.semester.semesterDetailName}
                    </p>
                    <div className="flex gap-2">
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            size="sm"
                            variant="bordered"
                            className="border-main_blue text-main_blue"
                          >
                            {userInfo?.part || "주특기 선택"}
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                          {partOptions.map((part) => (
                            <DropdownItem
                              key={part}
                              onClick={() => handlePartSelect(part)}
                            >
                              {part}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="primary"
                        onClick={confirmPart}
                      >
                        확정
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-red-500">
                    *주특기를 선택해주세요.
                  </p>
                </div>
              </li>
              <li>
                <div className="flex flex-col justify-center gap-2">
                  <Input
                    isDisabled={isProfileEdit && isNickNameEdit}
                    isReadOnly={!isProfileEdit && !isNickNameEdit}
                    size="sm"
                    type="email"
                    label="이메일"
                    variant="underlined"
                    value={userInfo?.userId}
                  />
                  <Input
                    isDisabled={isProfileEdit && isNickNameEdit}
                    isReadOnly={!isProfileEdit && !isNickNameEdit}
                    size="sm"
                    type="text"
                    label="이름"
                    variant="underlined"
                    value={userInfo?.userName}
                  />
                  <Input
                    isReadOnly={!isNickNameEdit}
                    size="sm"
                    type="text"
                    label="닉네임"
                    variant="underlined"
                    value={
                      isNickNameEdit
                        ? editInfo.userNickname
                        : userInfo?.userNickname
                    }
                    onChange={(e) =>
                      setEditInfo((prevEditInfo) => ({
                        ...prevEditInfo,
                        userNickname: e.target.value,
                      }))
                    }
                  />
                </div>
              </li>

              <div className="flex justify-end items-center mb-4">
                {isNickNameEdit && (
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="light"
                      onClick={() => setNickNameEdit(false)}
                    >
                      취소
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleNicknameChange}
                      className="bg-sub_purple text-white"
                    >
                      변경
                    </Button>
                  </div>
                )}
                {isProfileEdit && (
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="light"
                      onClick={() => setProfileEdit(false)}
                    >
                      취소
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleProfileImageChange}
                      className="bg-sub_purple text-white"
                    >
                      변경
                    </Button>
                  </div>
                )}
                {!isNickNameEdit && !isProfileEdit && (
                  <>
                    <Button
                      size="sm"
                      onClick={handleNicknameEdit}
                      className="bg-main_blue text-white mr-2"
                    >
                      닉네임 변경
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleProfileEdit}
                      className="bg-main_blue text-white"
                    >
                      프로필 변경
                    </Button>
                  </>
                )}
              </div>

              <li className="flex flex-col">
                <Button
                  onClick={() => router.push(`${pathname}/myboard`)}
                  variant="bordered"
                  className="flex justify-between font-semibold border-main_blue text-main_blue"
                >
                  <p>내가 쓴 게시글</p>
                  <p> {">"}</p>
                </Button>
              </li>
              <li className="flex flex-col">
                <Button
                  onClick={() => router.push(`${pathname}/myinquiry`)}
                  variant="bordered"
                  className="flex justify-between font-semibold border-main_blue text-main_blue"
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
                <LogoutButton />
              </li>
            </ul>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}

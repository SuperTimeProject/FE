"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import { privateApi, setToken } from "@/api/axiosConfig";
import {
  Avatar,
  Button,
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

export default function Users() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // modal

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await privateApi.get("/auth/getUserInfo");

        if (response.data.success) {
          const userInfoData = response.data.userInfo;
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
  }, []);

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
            <header> OOO 님</header>
            <section>
              <ul>
                <li>
                  <p>프로필</p>
                  <div>
                    <Avatar src="" className="w-24 h-24 text-large" />
                    <p>이메일</p>
                    <p>이름</p>
                    <p>닉네임</p>
                  </div>
                  <Button>이미지 변경</Button>
                  <Button>프로필 수정</Button>
                </li>
                <li>
                  <p>기수 관리</p>
                  <div>
                    <p>기수</p>
                    <p>풀타임</p>
                    <Button>파트</Button> // dropdown
                  </div>
                </li>
                <li>
                  <Button onClick={() => router.push("/profile/users/myboard")}>
                    <p>내가 쓴 게시글</p>
                    <p> {">"}</p>
                  </Button>
                </li>
                <li>
                  <Button
                    onClick={() => router.push("/profile/users/myservice")}
                  >
                    <p>문의 하기</p>
                    <p> {">"}</p>
                  </Button>
                </li>
                <li>
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
            </section>
          </main>

          {/* {userInfo && (
            <main>
              <header>{userInfo.userName} 프로필</header>
              <section>
                <ul>
                  <li>
                    <p>유저 프로필 수정</p>
                    <div>
                      {userInfo.userProfile.userProfileFileName && (
                        <img
                          src={userInfo.userProfile.userProfileFilePath}
                          alt="Profile Imgae"
                        />
                      )}
                      {userInfo.userName}
                      {userInfo.userId}
                      {userInfo.userNickname}
                    </div>
                  </li>
                  <li>
                    <p>기수 / 주특기 관리</p>
                    <div>
                      {userInfo.semester.semesterDetailName}
                      {userInfo.semester.isFull}
                      {userInfo.part}
                    </div>
                  </li>
                  <li>
                    <p>게시물 관리</p>
                    <div>
                      {userInfo.boardList.map((boardId) => (
                        <span key={boardId}>{boardId} </span>
                      ))}
                    </div>
                  </li>
                  <li>
                    <p>문의</p>
                  </li>
                  <Button onClick={() => handleLogout()}>로그아웃</Button>
                </ul>
              </section>
            </main>
          )} */}
        </div>
        <Footer />
      </div>
    </div>
  );
}

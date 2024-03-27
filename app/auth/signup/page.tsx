"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { privateApi, publicApi, setToken } from "@/api/axiosConfig";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "@/components/shared/header";
import { signUpUser } from "@/api/auth/authUser";
import { checkEmail, checkNickname } from "@/api/auth/authCheck";
import { getSemesterList } from "@/api/semester";

interface SignUpData {
  userId: string;
  userName: string;
  userNickname: string;
  semesterCid: number;
  userPassword: string;
}
interface SemesterListItem {
  semesterCid: number;
  semesterDetailName: string;
}

export default function SignUp() {
  const router = useRouter();
  const [signUpData, setSignUpData] = useState<SignUpData>({
    userId: "",
    userName: "",
    userNickname: "",
    semesterCid: 0,
    userPassword: "",
  });

  const [semesterList, setSemesterList] = useState<SemesterListItem[]>([]);
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchSemesterList = async () => {
      try {
        const semesterListData = await getSemesterList();
        setSemesterList(semesterListData);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data.message);
        }
      }
    };

    fetchSemesterList();
  }, []);

  useEffect(() => {
    if (signUpData.userPassword !== passwordConfirm) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  }, [signUpData.userPassword, passwordConfirm]);

  const handleSignup = async () => {
    try {
      // 유효성 검사
      if (!Object.values(signUpData).every(Boolean)) {
        setErrorMessage("모든 빈칸을 입력해주세요.");
        return;
      }

      // Email 형식 검사
      const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailFormat.test(signUpData.userId)) {
        setErrorMessage("올바른 이메일 주소를 입력해주세요.");
        return;
      }

      if (signUpData.userName.length < 2) {
        setErrorMessage("이름은 2글자 이상이어야 합니다.");
        return;
      }

      if (signUpData.userNickname.length < 2) {
        setErrorMessage("닉네임은 2글자 이상이어야 합니다.");
        return;
      }

      if (signUpData.userPassword.length < 8) {
        setErrorMessage("비밀번호는 8자 이상이어야 합니다.");
        return;
      }

      // 비밀번호 일치 여부 확인
      if (signUpData.userPassword !== passwordConfirm) {
        setPasswordMismatch(true);
        setErrorMessage("비밀번호가 일치하지 않습니다.");
        return;
      } else {
        setPasswordMismatch(false);
        setErrorMessage(""); // 비밀번호 일치 시 에러 메시지 초기화
      }

      // 기수 리스트에 있는 학기인지 확인
      const semesterCidExists = semesterList.some(
        (semester) => semester.semesterCid === signUpData.semesterCid
      );

      if (!semesterCidExists) {
        setErrorMessage("유효한 기수를 선택해주세요.");
        return;
      }

      // const isNicknameAvailable = await checkNickname(signUpData.userNickname);
      // if (!isNicknameAvailable) {
      //   setErrorMessage("이미 사용 중인 닉네임입니다.");
      //   return;
      // }
      const nicknameCheck = await publicApi.get(
        "/public/auth/duplicate-test/nickname",
        {
          params: {
            nickname: signUpData.userNickname,
          },
        }
      );

      if (nicknameCheck.data.duplicate) {
        setErrorMessage("이미 사용 중인 닉네임입니다.");
        return;
      }

      // const isEmailAvailable = await checkEmail(signUpData.userId);
      // if (!isEmailAvailable) {
      //   setErrorMessage("이미 사용 중인 이메일 주소입니다.");
      //   return;
      // }
      const emailCheck = await publicApi.get(
        "/public/auth/duplicate-test/email",
        {
          params: {
            userEmail: signUpData.userId,
          },
        }
      );

      if (emailCheck.data.duplicate) {
        setErrorMessage("이미 사용 중인 이메일 주소입니다.");
        return;
      }

      // const response = await signUpUser(signUpData);
      const response = await privateApi.post(
        "/public/auth/signup",
        signUpData,
        {
          data: signUpData, // JSON 형식으로 데이터 전송
        }
      );

      if (response.data.success) {
        setToken(response.data.token);
        alert("회원가입이 성공적으로 완료되었습니다.");

        router.push("/auth/login");
      } else {
        setErrorMessage("회원가입에 실패했습니다.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-full p-8">
        <Header />
        {/* <header className="flex justify-center text-3xl font-mono m-8">
          회원가입
        </header> */}
        <main className="flex flex-col gap-4">
          <form className="flex flex-col gap-4">
            <Input
              type="email"
              label="이메일"
              onChange={(e) =>
                setSignUpData({ ...signUpData, userId: e.target.value })
              }
            />
            <Input
              type="text"
              label="이름"
              onChange={(e) =>
                setSignUpData({ ...signUpData, userName: e.target.value })
              }
            />
            <Input
              type="text"
              label="닉네임"
              onChange={(e) =>
                setSignUpData({ ...signUpData, userNickname: e.target.value })
              }
            />
            <Dropdown>
              <DropdownTrigger>
                <Button className="bg-[#f5f5f5]">
                  {signUpData.semesterCid
                    ? semesterList.find(
                        (semester) =>
                          semester.semesterCid === signUpData.semesterCid
                      )?.semesterDetailName || "기수 선택"
                    : "기수 선택"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                {semesterList.map((semester) => (
                  <DropdownItem
                    key={semester.semesterCid}
                    onClick={() =>
                      setSignUpData({
                        ...signUpData,
                        semesterCid: semester.semesterCid,
                      })
                    }
                  >
                    {semester.semesterDetailName}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Input
              type="password"
              label="비밀번호"
              onChange={(e) =>
                setSignUpData({ ...signUpData, userPassword: e.target.value })
              }
            />
            <Input
              type="password"
              label="비밀번호 확인"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </form>

          {errorMessage && (
            <p className="flex justify-center text-red-500">{errorMessage}</p>
          )}

          <Button
            className="bg-main_blue font-semibold text-white"
            onClick={handleSignup}
          >
            회원가입
          </Button>
        </main>
        <footer className="m-10">
          <Button
            onClick={() => router.push("/auth/login")}
            className="w-full bg-white border-solid border-1.5 border-main_blue text-main_blue"
          >
            로그인
          </Button>
        </footer>
      </div>
    </div>
  );
}

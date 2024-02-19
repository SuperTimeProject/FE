"use client";

import { privateApi } from "@/api/axiosConfig";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserInfo {
  userCid: number;
  userId: string;
  userName: string;
  userNickname: string;
  part: string;
  semester: Semester;
  userProfile: UserProfile;
  valified: string;
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
export default function Pending() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  // const status = ["PENDING", "DENIED", "COMPLETED", "NEEDED"];

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await privateApi.get("/auth/getUserInfo");

        if (response.data.success) {
          setUserInfo(response.data.getUserInfo);

          if (userInfo?.valified === "DENIED") {
            router.push("/auth/verify/denied");
          } else if (userInfo?.valified === "COMPLETED") {
            router.push("/auth/verify/completed");
          } else if (userInfo?.valified === "PENDING") {
            router.push("/auth/verify/pending");
          }
        } else {
          alert("로그인한 유저 정보를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data.message);
        }
      }
    };

    getUserInfo();
  }, []);

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <header className="flex flex-col items-center">
        <div className="flex justify-center items-center m-4 gap-2">
          <p className="text-4xl font-mono">SUPER</p>
          <p className="text-4xl font-mono">TIME</p>
        </div>
        <img src="/icons/info.png" width="64" height="64" />
        <p className="font-medium text-xl m-4">인증 처리가 진행 중입니다.</p>
      </header>
      <main className="max-w-md">
        인증 처리에는 최대 72시간 (토, 일, 공휴일 제외)이 소요될 수 있습니다.
        인증 처리가 완료되면 슈퍼타임을 사용하실 수 있습니다.
      </main>
    </div>
  );
}

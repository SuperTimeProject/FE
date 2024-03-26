"use client";

import { privateApi } from "@/api/axiosConfig";

interface UserProfile {
  userProfileCid: number;
  userProfileFileName: string;
  userProfileFilePath: string;
}

interface Semester {
  semesterCid: number;
  semesterDetailName: string;
  isFull: string;
}

interface UserInfo {
  userCid: number;
  userId: string;
  userName: string;
  userNickname: string;
  part: string;
  role: string;
  boardList: number[];
  semester: Semester;
  userProfile: UserProfile;
  valified: string;
}

export default async function GetUserInfo(): Promise<UserInfo> {
  try {
    const res = await privateApi.get("/public/auth/user-info");
    return res.data.getUserInfo;
  } catch (error) {
    throw error;
  }
}

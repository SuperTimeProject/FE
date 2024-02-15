"use client";

import { privateApi } from "@/api/axiosConfig";

export default async function GetUserInfo() {
  try {
    const res = await privateApi.get(`/auth/getUserInfo`);
    return res.data.getUserInfo;
  } catch (error) {
    return error;
  }
}

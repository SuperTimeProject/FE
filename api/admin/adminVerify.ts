import axios from "axios";
import { privateApi } from "@/api/axiosConfig";

export interface UserList {
  userCid: number;
  userId: string;
  userName: string;
  userNickname: string;
  image: {
    authImageCid: number;
    authImageFileName: string;
    authImageFilePath: string;
  };
  semester: number;
  valified: string;
}

export const getPendingUsers = async (page: number): Promise<UserList[]> => {
  try {
    const response = await privateApi.get(`/admin/pending-user/${page}`, {
      params: {
        valified: "PENDING",
      },
    });
    if (response.data.success) {
      return response.data.userList;
    }
    return [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.message);
    }
    return [];
  }
};

export const getPendingUsersDetail = async (
  userId: string
): Promise<UserList> => {
  try {
    const response = await privateApi.get(
      `/admin/pending-user/detail/${userId}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.message);
    }
    throw error;
  }
};

export const updateVerificationStatus = async (
  userId: string,
  valified: string
): Promise<boolean> => {
  try {
    const response = await privateApi.put("/admin/verification", null, {
      params: {
        userId,
        valified,
      },
    });
    return response.data.success;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data.message);
    }
    return false;
  }
};

import { privateApi } from "@/api/axiosConfig";

export interface UserInfo {
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

export interface Semester {
  semesterCid: number;
  semesterDetailName: string;
  isFull: string;
}

export interface UserProfile {
  userProfileCid: number;
  userProfileFileName: string;
  userProfileFilePath: string;
}

export interface EditUserInfo {
  userNickname: string;
  userProfileImage: File | null;
}

export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const response = await privateApi.get("/public/auth/user-info");
    return response.data.getUserInfo;
  } catch (error) {
    throw error;
  }
};

export const selectPart = async (selectedPart: string) => {
  try {
    const response = await privateApi.put(`/user/part/${selectedPart}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const confirmUserPart = async () => {
  try {
    const response = await privateApi.put("/user/part/confirmed");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editUserProfile = async (formData: FormData, params: any) => {
  try {
    const response = await privateApi.put("/user/info", formData, {
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProfileImage = async () => {
  try {
    const response = await privateApi.put("/user/info/profile-image");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserAccount = async () => {
  try {
    const response = await privateApi.delete("api");
    return response.data;
  } catch (error) {
    throw error;
  }
};

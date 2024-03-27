import { privateApi } from "@/api/axiosConfig";

export const getUserInfo = async () => {
  try {
    const response = await privateApi.get("/public/auth/user-info");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserPart = async (selectedPart: string) => {
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
    const response = await privateApi.put("/user/info/edit", formData, {
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

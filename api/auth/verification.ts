import { privateApi } from "@/api/axiosConfig";

export const applyVerification = async (formData: FormData) => {
  try {
    const response = await privateApi.post(
      "/user/verification/apply",
      formData
    );
    return response.data.success;
  } catch (error) {
    throw error;
  }
};

export const reapplyVerification = async (formData: FormData) => {
  try {
    const response = await privateApi.put(
      "/user/verification/reapply",
      formData
    );
    return response.data.success;
  } catch (error) {
    throw error;
  }
};

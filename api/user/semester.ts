import { privateApi, publicApi } from "../axiosConfig";

export const getSemesterList = async () => {
  try {
    const response = await publicApi.get("/public/semester");
    return response.data.semesterList;
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

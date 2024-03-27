import { privateApi, publicApi } from "../axiosConfig";

export const getSemesterList = async () => {
  try {
    const response = await publicApi.get("/public/semester");
    return response.data.semesterList;
  } catch (error) {
    throw error;
  }
};

interface SemesterCreate {
  semesterName: string;
  startDate: string;
}

export const createSemester = async (semesterCreate: SemesterCreate) => {
  try {
    const currentDate = new Date().toISOString();
    const response = await privateApi.post("/admin/semester", {
      ...semesterCreate,
      startDate: currentDate,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

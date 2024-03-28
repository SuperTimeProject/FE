import { privateApi } from "../axiosConfig";

export interface InquiryList {
  inquiryCid: number;
  author: string;
  inquiryTitle: string;
  inquiryContent: string;
  answer: string;
  createdAt: string;
}

export const getAdminInquiry = async (page: number): Promise<InquiryList[]> => {
  try {
    const res = await privateApi.get(`/admin/inquiry/${page}`);
    if (res.data.success) {
      return res.data.inquiryList;
    }
    return [];
  } catch (error) {
    throw error;
  }
};

export const submitInquiryAnswer = async (
  inquiryCid: number,
  answer: string
): Promise<boolean> => {
  try {
    const res = await privateApi.put(
      `/admin/inquiry/answer/${inquiryCid}`,
      null,
      {
        params: {
          inquiryContent: answer,
        },
      }
    );
    return res.data.success;
  } catch (error) {
    throw error;
  }
};

export const deleteInquiry = async (inquiryCid: number): Promise<boolean> => {
  try {
    const res = await privateApi.delete(`/admin/inquiry/${inquiryCid}`);
    return res.data.success;
  } catch (error) {
    throw error;
  }
};

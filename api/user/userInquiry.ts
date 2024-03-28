import { privateApi } from "@/api/axiosConfig";

export interface InquiryList {
  inquiryCid: number;
  userId: string;
  inquiryTitle: string;
  inquiryContent: string;
  imageList: InquiryImage[];
  answer: string;
  isClosed: string;
}

export interface InquiryImage {
  postImageCid: number;
  postImageFileName: string;
  postImageFilePath: string;
}

export const getUserInquiry = async (page: number): Promise<InquiryList[]> => {
  try {
    const res = await privateApi.get("/user/inquiry", {
      params: { page },
    });

    if (res.data.success) {
      return res.data.inquiryList;
    }
    return [];
  } catch (error) {
    throw error;
  }
};

export interface InquiryBody {
  inquiryTitle: string;
  inquiryContent: string;
  inquiryImage: File[];
}

export const submitInquiry = async (formData: FormData) => {
  try {
    const response = await privateApi.post("/user/inquiry", formData);

    if (response.data.success) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

export interface InquiryDetail {
  inquiryCid: number;
  userId: string;
  inquiryTitle: string;
  inquiryContent: string;
  imageList: InquiryImage[];
  answer: string;
  isClosed: string;
}

export const getInquiryDetail = async (inquiryCid: number) => {
  try {
    const res = await privateApi.get(`/user/inquiry/${inquiryCid}`);
    if (res.data.success) {
      return res.data.inquiryInfo;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

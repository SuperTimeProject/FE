import { privateApi } from "@/api/axiosConfig";
import axios from "axios";

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
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    }
    return [];
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
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    }
    return false;
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
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    }
    return null;
  }
};

import axios, { AxiosInstance } from "axios";

const BASE_URL = "http://54.180.152.105:8080/";

export const publicApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const privateApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: "",
  },
});

export const setToken = (token: string) => {
  privateApi.defaults.headers["Authorization"] = `Bearer ${token}`;
  console.log("토큰 설정 완료");
};

import axios, { AxiosInstance } from "axios";

const BASE_URL = "http://54.180.122.9:8080/";

export const publicApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const privateApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    TOKEN: "",
  },
});

export const setToken = (token: string) => {
  privateApi.defaults.headers["TOKEN"] = token;
  console.log("토큰 설정 완료");
};

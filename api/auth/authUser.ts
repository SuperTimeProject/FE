import { privateApi, publicApi } from "../axiosConfig";

export interface LoginData {
  userId: string;
  userPassword: string;
}
export interface SignUpData {
  userId: string;
  userName: string;
  userNickname: string;
  semesterCid: number;
  userPassword: string;
}

export async function signUpUser(signUpData: SignUpData) {
  try {
    const response = await privateApi.post("/public/auth/signup", signUpData);
    return response.data.success;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(loginData: LoginData) {
  try {
    const response = await privateApi.post("/public/auth/login", loginData);
    return response.data.success;
  } catch (error) {
    throw error;
  }
}

export async function checkNickname(nickname: string) {
  try {
    const response = await publicApi.get(
      "/public/auth/duplicate-test/nickname",
      {
        params: {
          nickname: nickname,
        },
      }
    );
    return response.data.duplicate;
  } catch (error) {
    throw error;
  }
}

export async function checkEmail(email: string) {
  try {
    const response = await publicApi.get("/public/auth/duplicate-test/email", {
      params: {
        userEmail: email,
      },
    });
    return response.data.duplicate;
  } catch (error) {
    throw error;
  }
}

export const logoutUser = async () => {
  try {
    const response = await privateApi.post("/public/auth/logout");
    return response.data.success;
  } catch (error) {
    throw error;
  }
};

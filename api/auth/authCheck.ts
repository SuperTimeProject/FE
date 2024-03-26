import { publicApi } from "../axiosConfig";

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

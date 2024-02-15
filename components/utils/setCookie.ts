export const setCookie = (token: string) => {
  if (typeof document !== "undefined") {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 30 * 60 * 1000);
    const expires = "expires=" + expirationDate.toUTCString();
    document.cookie = "TOKEN" + "=" + token + "; " + expires + "; path=/";
  }
};

export const getCookie = () => {
  if (typeof document !== "undefined") {
    const cookieName = "TOKEN" + "=";
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return "";
  }
};

export const deleteCookie = () => {
  if (typeof document !== "undefined") {
    document.cookie = "TOKEN" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
};

import jwtDecode from "jwt-decode";
import { TOKEN } from "./consts";

export const setToken = token => {
  localStorage.setItem(TOKEN, token);
};

export const getToken = () => localStorage.getItem(TOKEN);

export const removeToken = () => {
  localStorage.removeItem(TOKEN);
};

export const hasExpiredToken = token => {
  const decodedToken = jwtDecode(token);
  const expireDate = decodedToken?.exp * 1000;
  const currentDate = new Date().getTime();
  return currentDate > expireDate;
};

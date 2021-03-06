import axios from "axios";
import { SERVER_HOST } from "../utils/consts";
import { tokenizedRequest } from "../utils/requests";

export const registerUserRequest = async userData => {
  try {
    const url = `${SERVER_HOST}/auth/local/register`;
    const res = await axios.post(url, userData);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const logInRequest = async userData => {
  try {
    const url = `${SERVER_HOST}/auth/local`;
    const res = await axios.post(url, userData);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const forgotPasswordRequest = async email => {
  try {
    const url = `${SERVER_HOST}/auth/forgot-password`;
    const res = await axios.post(url, { email });
    return res;
  } catch (err) {
    return err.response;
  }
};

export const getMeRequest = async () => {
  const url = `${SERVER_HOST}/users/me`;
  return await tokenizedRequest(url, { method: "GET" });
};

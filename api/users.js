import axios from "axios";
import { SERVER_HOST } from "../utils/consts";

export const registerUserRequest = async (userData) => {
  try {
    const url = `${SERVER_HOST}/auth/local/register`;
    const res = await axios.post(url, userData);
    return res;
  } catch (err) {
    console.error(err);
    return err.response;
  }
};

export const logInRequest = async (userData) => {
  try {
    const url = `${SERVER_HOST}/auth/local`;
    const res = await axios.post(url, userData);
    return res;
  } catch (err) {
    console.error(err);
    return err.response;
  }
};

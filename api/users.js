import axios from "axios";
import { SERVER_HOST } from "../utils/consts";

export const registerUserRequest = async (userData) => {
  try {
    const url = `${SERVER_HOST}/auth/local/register`;
    const res = await axios.post(url, userData);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

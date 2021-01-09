import axios from "axios";
import { SERVER_HOST } from "../utils/consts";

export const loadPlatforms = async userData => {
  try {
    const url = `${SERVER_HOST}/platforms?_sort=position:asc`;
    const res = await axios.get(url, userData);
    return res;
  } catch (err) {
    return err.response;
  }
};

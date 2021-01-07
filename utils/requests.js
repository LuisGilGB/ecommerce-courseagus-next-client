import axios from "axios";
import { getToken, hasExpiredToken } from "./token";

export const tokenizedRequest = async (
  url,
  requestConfig = {},
  tokenFailureCallback
) => {
  const token = getToken();
  if (!token) {
    tokenFailureCallback && tokenFailureCallback();
    return false;
  } else {
    if (hasExpiredToken(token)) {
      tokenFailureCallback && tokenFailureCallback();
      return false;
    } else {
      try {
        return await axios({
          ...requestConfig,
          url,
          headers: {
            ...requestConfig?.headers,
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        return err.response;
      }
    }
  }
};

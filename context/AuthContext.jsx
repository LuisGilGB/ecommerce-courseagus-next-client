import { createContext, useEffect, useMemo, useState } from "react";
import jwtDecode from "jwt-decode";
import { getToken, setToken } from "../utils/token";

export const AuthContext = createContext({
  auth: undefined,
  logIn: () => null,
  logOut: () => null,
  setReloadUser: () => null,
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(undefined);

  const setAuthFromToken = (token) => {
    setAuth({
      token,
      userId: jwtDecode(token)?.id,
    });
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuthFromToken(token);
    } else {
      setAuth(undefined);
    }
  }, []);

  const logIn = (token) => {
    setToken(token);
    setAuthFromToken(token);
  };

  const value = useMemo(
    () => ({
      auth,
      logIn,
    }),
    [auth, logIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

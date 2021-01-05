import { createContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";
import { getToken, removeToken, setToken } from "../utils/token";

export const AuthContext = createContext({
  auth: undefined,
  logIn: () => null,
  logOut: () => null,
  setReloadUser: () => null,
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(undefined);
  const router = useRouter();

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
      setAuth(null);
    }
  }, []);

  const logIn = (token) => {
    setToken(token);
    setAuthFromToken(token);
  };

  const logOut = () => {
    router.push("/");
    removeToken();
    setAuth(null);
  };

  const value = useMemo(
    () => ({
      auth,
      logIn,
      logOut,
    }),
    [auth, logIn, logOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

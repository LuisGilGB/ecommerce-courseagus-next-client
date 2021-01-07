import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getMeRequest } from "../api/users";
import useAuth from "../hooks/useAuth";
import BasicLayout from "../layouts/BasicLayout";

const account = () => {
  const [userData, setUserData] = useState(undefined);
  const { auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await getMeRequest();
      const draftUser = res?.data;
      setUserData(draftUser || null);
    })();
  }, [auth]);

  if (userData === undefined) return <BasicLayout />;
  if (!auth && !userData) {
    router.replace("/");
    return null;
  }

  return (
    <BasicLayout>
      <h1>Welcome, {`${userData?.name} ${userData?.lastname}`.trim()}</h1>
    </BasicLayout>
  );
};

export default account;

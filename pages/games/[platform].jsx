import { useRouter } from "next/router";
import BasicLayout from "../../layouts/BasicLayout";

const PlatformGames = () => {
  const {
    query: { platform },
  } = useRouter();
  return <BasicLayout>Games from {platform}</BasicLayout>;
};

export default PlatformGames;

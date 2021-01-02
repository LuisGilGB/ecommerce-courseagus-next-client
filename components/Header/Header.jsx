import { Layout } from "antd";
import TopBar from "./TopBar/TopBar";

const { Header: AntHeader } = Layout;

const Header = () => {
  return (
    <AntHeader className="header">
      <TopBar />
    </AntHeader>
  );
};

export default Header;

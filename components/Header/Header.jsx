import { Layout } from "antd";
import TopBar from "./TopBar/TopBar";
import Nav from "./Nav/Nav";

const { Header: AntHeader } = Layout;

const Header = () => {
  return (
    <AntHeader className="header">
      <TopBar />
      <Nav />
    </AntHeader>
  );
};

export default Header;

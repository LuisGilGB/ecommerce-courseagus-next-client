import { Col, Row, Image, Input } from "antd";
import Link from "next/link";

const { Search: AntSearch } = Input;

const Logo = () => (
  <Link href="/">
    <a>
      <Image
        src="/logo.png"
        className="logo-image"
        alt="Gaming logo"
        width={140}
      />
    </a>
  </Link>
);

const Search = () => (
  <AntSearch
    className="search"
    placeholder="Games search"
    size="large"
    onSearch={console.log}
  />
);

const TopBar = () => (
  <Row className="top-bar" justify="space-between" align="middle">
    <Col flex="none" className="logo-col">
      <Logo />
    </Col>
    <Col flex="auto" className="search-col">
      <Search />
    </Col>
  </Row>
);

export default TopBar;

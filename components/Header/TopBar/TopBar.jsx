import Link from "next/link";
import { Col, Row, Image } from "antd";

const Logo = () => {
  return (
    <Link href="/">
      <a>
        <Image
          src="/logo.png"
          className="logo-image"
          alt="Gaming logo"
          width={140}
        ></Image>
      </a>
    </Link>
  );
};

const TopBar = () => {
  return (
    <Row className="top-bar">
      <Col span={12}>
        <Logo />
      </Col>
      <Col span={12}>Search</Col>
    </Row>
  );
};

export default TopBar;

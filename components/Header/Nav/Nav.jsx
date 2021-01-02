import { Col, Menu, Row } from "antd";
import Link from "next/link";
import { UserOutlined } from "@ant-design/icons";

const NavMenu = (props) => {
  return (
    <Menu
      {...props}
      forceSubMenuRender={false}
      mode="horizontal"
      className="menu"
    />
  );
};

const NavItem = ({ to, href, children, ...otherProps }) => {
  return (
    <Menu.Item {...otherProps} className="menu-item">
      <Link href={to || href}>
        <a>{children}</a>
      </Link>
    </Menu.Item>
  );
};

const Nav = () => {
  return (
    <Row className="nav" justify="space-between">
      <Col>
        <NavMenu mode="horizontal">
          <NavItem href="/playstation">PlayStation</NavItem>
          <NavItem href="/xbox">Xbox</NavItem>
          <NavItem href="/switch">Switch</NavItem>
          <NavItem href="/pc">PC</NavItem>
        </NavMenu>
      </Col>
      <Col>
        <NavMenu mode="horizontal">
          <NavItem href="/login" icon={<UserOutlined />}>
            User login
          </NavItem>
        </NavMenu>
      </Col>
    </Row>
  );
};

export default Nav;

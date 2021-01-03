import { Col, Menu, Row } from "antd";
import Link from "next/link";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import AuthModal from "../../Modal/AuthModal";

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
      {to || href ? (
        <Link href={to || href}>
          <a>{children}</a>
        </Link>
      ) : (
        children
      )}
    </Menu.Item>
  );
};

const Nav = () => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  return (
    <>
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
            <NavItem
              icon={<UserOutlined />}
              onClick={() => {
                setLoginModalVisible(!loginModalVisible);
              }}
            >
              User login
            </NavItem>
          </NavMenu>
        </Col>
      </Row>
      <AuthModal
        visible={loginModalVisible}
        onOk={() => {
          setLoginModalVisible(false);
        }}
        onCancel={() => {
          setLoginModalVisible(false);
        }}
      />
    </>
  );
};

export default Nav;

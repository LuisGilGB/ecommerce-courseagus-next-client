import { useContext, useState } from "react";
import { Col, Menu, Row } from "antd";
import Link from "next/link";
import { LoginOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import AuthModal from "../../Modal/AuthModal";
import useAuth from "../../../hooks/useAuth";
import { PlatformsContext } from "../../../context/PlatformsContext";

const NavMenu = props => (
  <Menu
    {...props}
    forceSubMenuRender={false}
    mode="horizontal"
    className="menu"
  />
);

const NavItem = ({ to, href, children, ...otherProps }) => (
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

const Nav = () => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const { auth, logOut } = useAuth();
  const { platforms = [] } = useContext(PlatformsContext);

  return (
    <>
      <Row className="nav" justify="space-between">
        <Col>
          <NavMenu mode="horizontal">
            {platforms.map(p => (
              <NavItem key={p.pathname} href={`/games/${p.pathname}`}>
                {p.shortName}
              </NavItem>
            ))}
          </NavMenu>
        </Col>
        <Col>
          <NavMenu mode="horizontal">
            {auth ? (
              <>
                <NavItem
                  key="current-user"
                  href="/account"
                  icon={<UserOutlined />}
                >
                  Current user
                </NavItem>
                <NavItem
                  key="logout"
                  icon={<LogoutOutlined />}
                  onClick={logOut}
                >
                  Logout
                </NavItem>
              </>
            ) : (
              <NavItem
                key="auth"
                icon={<LoginOutlined />}
                onClick={() => {
                  setLoginModalVisible(!loginModalVisible);
                }}
              >
                User login
              </NavItem>
            )}
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
        onSubmitDone={() => {
          setLoginModalVisible(false);
        }}
      />
    </>
  );
};

export default Nav;

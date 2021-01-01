import { Layout } from "antd";

const { Content } = Layout;

const BasicLayout = ({ children }) => {
  return (
    <Layout className="basic-layout">
      <Content className="content">{children}</Content>
    </Layout>
  );
};

export default BasicLayout;

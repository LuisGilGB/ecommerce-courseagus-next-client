import { Layout } from "antd";
import Header from "../../components/Header/Header";

const { Content } = Layout;

const BasicLayout = ({ children }) => (
  <Layout className="basic-layout">
    <Header />
    <Content className="content">{children}</Content>
  </Layout>
);

export default BasicLayout;

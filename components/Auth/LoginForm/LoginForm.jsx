import { Form, Input } from "antd";

const LoginForm = ({ form, ...otherProps }) => {
  return (
    <Form {...otherProps} form={form}>
      <Form.Item
        name="identifier"
        label="Email"
        rules={[{ required: true, type: "string" }]}
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
    </Form>
  );
};

export default LoginForm;

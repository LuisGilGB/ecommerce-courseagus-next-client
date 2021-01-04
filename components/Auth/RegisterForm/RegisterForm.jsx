import { Form, Input } from "antd";

const RegisterForm = ({ form, ...otherProps }) => {
  return (
    <Form {...otherProps} form={form}>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, type: "string" }]}
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item name="lastname" label="Last name" rules={[{ type: "string" }]}>
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="username"
        label="User name"
        rules={[{ required: true, type: "string" }]}
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, type: "email" }]}
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;

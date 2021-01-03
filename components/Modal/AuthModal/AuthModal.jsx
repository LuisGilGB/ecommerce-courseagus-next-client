import { Button, Form } from "antd";
import { useCallback, useState } from "react";
import LoginForm from "../../Auth/LoginForm";
import RegisterForm from "../../Auth/RegisterForm";
import Modal from "../Modal";

const LoginFooter = ({ onModeSwitch, ...props }) => {
  return (
    <>
      <Button type="text" onClick={onModeSwitch}>
        Don't have an account?
      </Button>
      <Button>Cancel</Button>
      <Button type="primary">Log In</Button>
    </>
  );
};

const RegisterFooter = ({ onModeSwitch, ...otherProps }) => {
  return (
    <>
      <Button type="text" onClick={onModeSwitch}>
        Already have an account?
      </Button>
      <Button>Cancel</Button>
      <Button type="primary">Register</Button>
    </>
  );
};

const AuthModal = (props) => {
  const [registerMode, setRegisterMode] = useState(false);
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  const onSwitchToLogin = useCallback(() => {
    setRegisterMode(false);
  }, []);

  const onSwitchToRegister = useCallback(() => {
    setRegisterMode(true);
  }, []);

  const CONFIG = {
    LOGIN: {
      FormComponent: LoginForm,
      FooterComponent: LoginFooter,
      form: loginForm,
      title: "Log in",
      onModeSwitch: onSwitchToRegister,
    },
    REGISTER: {
      FormComponent: RegisterForm,
      FooterComponent: RegisterFooter,
      form: registerForm,
      title: "Register",
      onModeSwitch: onSwitchToLogin,
    },
  };

  const { FormComponent, FooterComponent, form, title, onModeSwitch } = CONFIG[
    registerMode ? "REGISTER" : "LOGIN"
  ];

  return (
    <Modal
      {...props}
      title={title}
      footer={<FooterComponent onModeSwitch={onModeSwitch} />}
    >
      {<FormComponent form={form} />}
    </Modal>
  );
};

export default AuthModal;

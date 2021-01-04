import { Button, Form } from "antd";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { logInRequest, registerUserRequest } from "../../../api/users";
import LoginForm from "../../Auth/LoginForm";
import RegisterForm from "../../Auth/RegisterForm";
import Modal from "../Modal";

const LoginFooter = ({ onModeSwitch, canSubmit, onOk, ...props }) => {
  return (
    <>
      <Button type="text" onClick={onModeSwitch}>
        Don't have an account?
      </Button>
      <Button>Cancel</Button>
      <Button type="primary" disabled={!canSubmit} onClick={onOk}>
        Log In
      </Button>
    </>
  );
};

const RegisterFooter = ({ onModeSwitch, canSubmit, onOk, ...otherProps }) => {
  return (
    <>
      <Button type="text" onClick={onModeSwitch}>
        Already have an account?
      </Button>
      <Button>Cancel</Button>
      <Button type="primary" disabled={!canSubmit} onClick={onOk}>
        Register
      </Button>
    </>
  );
};

const doLogIn = async (inputData) => {
  const { data } = await logInRequest(inputData);
  if (data?.jwt) {
    toast.success("Welcome!!");
    return true;
  } else {
    toast.error(data?.message[0]?.messages[0]?.message || "Error at log in.");
    return false;
  }
};

const doRegister = async (inputData) => {
  const { data } = await registerUserRequest(inputData);
  if (data?.jwt) {
    toast.success("User registered");
    return true;
  } else {
    toast.error(
      data?.message[0]?.messages[0]?.message || "Error at registration."
    );
    return false;
  }
};

// TODO: Try validation with a Form Provider.
const AuthModal = (props) => {
  const [registerMode, setRegisterMode] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  const onSwitchToLogin = useCallback(() => {
    setCanSubmit(false);
    setRegisterMode(false);
    registerForm.resetFields();
  }, [loginForm]);

  const onSwitchToRegister = useCallback(() => {
    setCanSubmit(false);
    setRegisterMode(true);
    loginForm.resetFields();
  }, [registerForm]);

  const CONFIG = {
    LOGIN: {
      FormComponent: LoginForm,
      FooterComponent: LoginFooter,
      form: loginForm,
      title: "Log in",
      onModeSwitch: onSwitchToRegister,
      onFinish: async (formData) => {
        const success = await doLogIn(formData);
        if (success) {
          loginForm.resetFields();
        }
      },
    },
    REGISTER: {
      FormComponent: RegisterForm,
      FooterComponent: RegisterFooter,
      form: registerForm,
      title: "Register",
      onModeSwitch: onSwitchToLogin,
      onFinish: async (formData) => {
        const success = await doRegister(formData);
        if (success) {
          registerForm.resetFields();
        }
      },
    },
  };

  const {
    FormComponent,
    FooterComponent,
    form,
    title,
    onModeSwitch,
    onFinish,
  } = CONFIG[registerMode ? "REGISTER" : "LOGIN"];

  return (
    <Modal
      {...props}
      title={title}
      footer={
        <FooterComponent
          onModeSwitch={onModeSwitch}
          canSubmit={canSubmit}
          onOk={() => {
            form.submit();
          }}
        />
      }
    >
      <FormComponent
        form={form}
        onValuesChange={() => {
          /*
            This approach is ugly and looks antipattern, but it's the only
            way I've found to trigger a new validation to update submit button
            state due to form updates not triggering a new render of this Modal
            component.
            
            The setTimeout is used because of the outOfDate: true issue (the
            validation of valid data returns an error because it sets an outOfDate
            set as true if called before listener's execution end).
          */
          setTimeout(() => {
            form
              .validateFields()
              .then(() => {
                setCanSubmit(true);
              })
              .catch((err) => {
                setCanSubmit(false);
              });
          });
        }}
        onFinish={onFinish}
      />
    </Modal>
  );
};

export default AuthModal;

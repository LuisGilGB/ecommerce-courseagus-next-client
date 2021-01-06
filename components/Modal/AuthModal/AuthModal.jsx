import { Form } from "antd";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { logInRequest, registerUserRequest } from "../../../api/users";
import useAuth from "../../../hooks/useAuth";
import LoginForm from "../../Auth/LoginForm";
import RegisterForm from "../../Auth/RegisterForm";
import Modal from "../Modal";
import { LoginFooter, RegisterFooter } from "./footers";

const doLogIn = async inputData => {
  const { data } = await logInRequest(inputData);
  if (data?.jwt) {
    toast.success("Welcome!!");
    return data;
  }
  toast.error(data?.message[0]?.messages[0]?.message || "Error at log in.");
  return false;
};

const doRegister = async inputData => {
  const { data } = await registerUserRequest(inputData);
  if (data?.jwt) {
    toast.success("User registered");
    return data;
  }
  toast.error(
    data?.message[0]?.messages[0]?.message || "Error at registration."
  );
  return false;
};

// TODO: Try validation with a Form Provider.
const AuthModal = ({ onCancel, onSubmitDone, ...otherProps }) => {
  const [registerMode, setRegisterMode] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { logIn } = useAuth();
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
      onFinish: async formData => {
        setSubmitLoading(true);
        const res = await doLogIn(formData);
        if (res) {
          logIn(res.jwt);
          loginForm.resetFields();
          onSubmitDone();
        }
        setSubmitLoading(false);
      },
    },
    REGISTER: {
      FormComponent: RegisterForm,
      FooterComponent: RegisterFooter,
      form: registerForm,
      title: "Register",
      onModeSwitch: onSwitchToLogin,
      onFinish: async formData => {
        setSubmitLoading(true);
        const res = await doRegister(formData);
        if (res) {
          logIn(res.jwt);
          registerForm.resetFields();
          onSubmitDone();
        }
        setSubmitLoading(false);
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
      {...otherProps}
      title={title}
      footer={
        <FooterComponent
          form={form}
          canSubmit={canSubmit}
          okLoading={submitLoading}
          onModeSwitch={onModeSwitch}
          onOk={() => {
            form.submit();
          }}
          onCancel={() => {
            onCancel();
            form.resetFields();
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
              .catch(() => {
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

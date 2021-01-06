import { Button } from "antd";

const LoginFooter = ({
  form,
  onModeSwitch,
  canSubmit,
  okLoading,
  onOk,
  onCancel,
}) => (
  <>
    <Button type="text" onClick={onModeSwitch}>
      Don't have an account?
    </Button>
    <Button htmlType="reset" onClick={onCancel}>
      Cancel
    </Button>
    <Button
      form={form}
      type="primary"
      htmlType="submit"
      disabled={!canSubmit}
      loading={okLoading}
      onClick={onOk}
    >
      Log In
    </Button>
  </>
);

export default LoginFooter;

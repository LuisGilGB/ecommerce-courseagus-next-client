import { Button } from "antd";

const RegisterFooter = ({
  form,
  onModeSwitch,
  canSubmit,
  okLoading,
  onOk,
  onCancel,
}) => {
  return (
    <>
      <Button type="text" onClick={onModeSwitch}>
        Already have an account?
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
        Register
      </Button>
    </>
  );
};

export default RegisterFooter;

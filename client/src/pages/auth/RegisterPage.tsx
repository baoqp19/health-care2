import { Form, Input, Space, Button, message } from "antd";
import Title from "antd/es/typography/Title";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { RegisterProps, useRegister } from "../../api/auth/register";
import { useTranslation } from "react-i18next";
import { useState } from "react";


const RegisterPage = () => {

  const [form] = Form.useForm();

  const navigate = useNavigate();

  const [loadingComfirm, setLoadingComfirm] = useState(false);

  const { t } = useTranslation(); // Correct hook

  const registerMutation = useRegister({
    onSuccess: () => {
      message.success("Registration successful! Please check your email for verification.");
      form.resetFields();
      // window.location.replace("https://mail.google.com/"); // Redirect to Email Page
      navigate(`/auth/login`);
    },
    onError: (error) => {
      message.error("Registration failed");
      setLoadingComfirm(false);
    },
  });

  const onFinish = (values: RegisterProps) => {
    setLoadingComfirm(true);
    registerMutation.mutate(values);
  };

  return (
    <Space direction="vertical" className="p-10 w-full bg-white rounded-xl">
      <Link to='/' className="cursor-pointer">
        <img src={logo} alt="logo" className="w-24 mx-auto" />
      </Link>
      <Title level={4} className="text-center">
        {t("RegisterPage.Welcome")} <span className="text-1xl font-bold ml-2 text-green-600">FamilyHealth</span>
      </Title>
      <Title level={3}>
        {t("RegisterPage.Register")}
      </Title>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        requiredMark="optional"
        validateTrigger="onBlur"
        initialValues={{ code: "", password: "" }}
      >
        <Form.Item
          label={t("RegisterPage.FirstName")}
          name="firstname"
          rules={[
            {
              required: true,
              whitespace: true,
              message: t("RegisterPage.PleaseEnterYourFirstName"),
            },
          ]}
        >
          <Input variant="filled" placeholder={t("RegisterPage.EnterYourFirstName")} />
        </Form.Item>

        <Form.Item
          label={t("RegisterPage.LastName")}
          name="lastname"
          rules={[
            {
              required: true,
              whitespace: true,
              message: t("RegisterPage.PleaseEnterYourLastName"),
            },
          ]}
        >
          <Input variant="filled" placeholder={t("RegisterPage.EnterYourLastName")} />
        </Form.Item>

        <Form.Item
          label={t("RegisterPage.Email")}
          name="email"
          rules={[
            {
              required: true,
              whitespace: true,
              message: t("RegisterPage.PleaseEnterYourEmail"),
            },
            {
              type: "email",
              message: t("RegisterPage.PleaseEnterAValidEmail"),
            }
          ]}
        >
          <Input variant="filled" placeholder={t("RegisterPage.EnterYourEmail")} />
        </Form.Item>

        <Form.Item
          label={t("RegisterPage.Password")}
          name="password"
          rules={[
            { required: true, message: t("Register.PleaseEnterYourPassword") },
            {
              min: 6,
              message: t("RegisterPage.PasswordMustBeAtLeast6Characters"),
            },
          ]}
        >
          <Input.Password variant="filled" placeholder={t("RegisterPage.EnterYourPassword")} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full" loading={loadingComfirm}>
            {t("RegisterPage.Register")}
          </Button>
        </Form.Item>
      </Form>

      <p className="mb-2 flex justify-between">
        <Link className="text-primary" to="/auth/forgot-password">
          {t("RegisterPage.ForgotPassword")}
        </Link>
        <Link className="text-primary" to="/auth/login">
          {t("RegisterPage.Login")}
        </Link>
      </p>
    </Space>
  );
};

export default RegisterPage;

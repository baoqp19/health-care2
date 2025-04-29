import { Form, Input, Space, Button, message, Divider, Flex, Spin } from "antd";
import Title from "antd/es/typography/Title";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useGoogleLoginMutation, useLogin } from "../../api/auth/login";
import { useVerify } from "../../api/auth/verify";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { GoogleLogin } from "@react-oauth/google";

type PropsLogin = {
  email: string;
  password: string;
};

type GoogleLoginResponse = {
  credential?: string;
  select_by?: string;
  clientId?: string;
};

type GoogleLoginRequest = {
  credential?: string;
  select_by?: string;
  clientId?: string;
};

type CredentialResponse = {
  credential?: string; // Token từ Google Sign-In
  select_by?: string;  // Tùy chọn, nếu có
  clientId?: string;   // Tùy chọn, nếu có
};

const LoginPage = () => {
  const [form] = Form.useForm();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get("username");
  const navigate = useNavigate();

  // Hook for verification based on username
  const verifyMutation = useVerify({
    onSuccess: () => {
      form.setFieldsValue({ email: username });
      message.success("Your account verified. Please enter your password to login.");
    },
    onError: () => {
      message.error("Verification failed. Please try again.");
    },
  });

  const googleLoginMutation = useGoogleLoginMutation({
    mutationConfig: {
      onSuccess: (data: GoogleLoginResponse) => {
        console.log(data);
      },
      onError: ({ response }: { response?: { data: { detail: string } } }) => {
        message.error(response?.data?.detail || "Something went wrong!");
      },
    },
  });

  const handleGoogleLogin = (response: CredentialResponse) => {
    if (!response.credential) {
      console.error("Missing Google credential!");
      return;
    }

    const requestData: GoogleLoginRequest = {
      credential: response.credential,
      select_by: response.select_by,
      clientId: response.clientId,
    };

    googleLoginMutation.mutate({ data: requestData });
  };


  // Call verify mutation if username exists in URL
  useEffect(() => {
    if (username) {
      verifyMutation.mutate(username);
    }
  }, [username]);


  const mutation = useLogin({
    onSuccess: () => {
      console.log("🎉 Đăng nhập thành công!");
      message.success("Login successful");
      form.resetFields();
      navigate("/manager")
    },
    onError: (error) => {
      message.error("Login failed");
    },
  });

  const onFinish = (values: PropsLogin) => {
    console.log("Đang gửi login request:", values);
    mutation.mutate(values);
  };

  const { t } = useTranslation();


  return (

    <Space direction="vertical" className="p-10 w-full bg-white rounded-xl">
      <Link to='/' className="cursor-pointer">
        <img src={logo} alt="logo" className="w-40 mx-auto" />
      </Link>
      <Title level={4} className="text-center">
        Welcome to <span className="text-1xl font-bold ml-2 text-green-600"> {t("LoginPage.Name")}</span>
      </Title>
      <Title level={3}>
        {t("LoginPage.Name")}
      </Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark="optional"
        validateTrigger="onBlur"
        initialValues={{ code: "", password: "" }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              whitespace: true,
              message: t("LoginPage.PleaseEnterYourEmail"),
            },
            {
              type: "email",
              message: t("LoginPage.PleaseEnterAValidEmail"),
            }
          ]}
        >
          <Input variant="filled" placeholder={t("LoginPage.EnterYourEmail")} />
        </Form.Item>

        <Form.Item
          label={t("LoginPage.Password")}
          name="password"
          rules={[
            { required: true, message: t("LoginPage.PleaseEnterYourPassword") },
            {
              min: 6,
              message: t("LoginPage.PasswordMustBeAtLeast6Characters"),
            },
          ]}
        >
          <Input.Password
            variant="filled"
            placeholder={t("LoginPage.EnterYourPassword")}
          />
        </Form.Item>
        <Form.Item>
          <Button
            loading={mutation.isPending}
            type="primary"
            htmlType="submit"
            className="w-full"
          >
            {t("LoginPage.Login")}
          </Button>
        </Form.Item>
      </Form>
      <p className="mb-2 flex justify-between items-center">
        <Link className="text-primary" to="/auth/forgot-password">
          {t("LoginPage.ForgotPassword")}
        </Link>
        <Link className="text-primary ml-3" to="/auth/register">
          {t("LoginPage.Register")}
        </Link>
      </p>
      <Divider></Divider>
      <Flex justify="center" align="center">
        <GoogleLogin
          text="signin_with"
          onSuccess={(response) => handleGoogleLogin(response)}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </Flex>
    </Space>
  );
};

export default LoginPage;


import Loadable from "../components/Loadable";
import AuthRoute from "../gurads/AuthRoute";
import AuthLayout from "../layouts/AuthLayout";
import React from "react";

const LoginPage = Loadable(React.lazy(() => import("../pages/auth/LoginPage")));
const RegisterPage = Loadable(React.lazy(() => import("../pages/auth/RegisterPage")));
const ForgotPasswordPage = Loadable(React.lazy(() => import("../pages/auth/ForgotPasswordPage")));

export const AuthRoutes = [
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <AuthRoute element={<LoginPage />} />,
        // Nếu login không cần bảo vệ: element: <LoginPage />
      },
      {
        path: "register",
        element: <AuthRoute element={<RegisterPage />} />
      },
      {
        path: "forgot-password",
        element: <AuthRoute element={<ForgotPasswordPage />} />
      }
    ]
  }
];
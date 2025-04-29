import { Avatar, Divider, Dropdown, Flex, Space } from "antd";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";
import useToken from "antd/es/theme/useToken";
import React from "react";
import Cookies from "js-cookie";

const UserDropdown = () => {
  const navigate = useNavigate();
  const { user, clearUser } = useAuthStore();

  console.log("user", user);

  const handleLogout = () => {
    Cookies.remove('token');
    clearUser();
    navigate('/auth/login');
  };

  const moveProfile = () => {
    navigate('/admin/profile');
  };

  const moveSetting = () => {
    navigate('/admin/settings');
  };

  const [, token] = useToken();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: 'none',
  };

  const items = [
    {
      key: "1",
      label: "Account info",
      icon: <UserOutlined />,
      onClick: moveProfile,
    },
    {
      key: "2",
      label: "Settings",
      icon: <SettingOutlined />,
      onClick: moveSetting,
    },
    {
      key: "3",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
      dropdownRender={(menu) => {
        if (!React.isValidElement(menu)) {
          return <div>Invalid Menu</div>; // Nếu không hợp lệ, trả về div mặc định
        }
        return (
          <div style={contentStyle}>
            <Space
              style={{
                padding: 8,
              }}
            >
              <Flex vertical justify="start">
                <p className="text-primary font-medium text-sm">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-[red] text-xs">{user?.email}</p>
              </Flex>
            </Space>
            <Divider
              style={{
                margin: 0,
              }}
            />
            {React.cloneElement(menu as React.ReactElement, {
              style: menuStyle,
            })}
          </div>
        );
      }}
      trigger={['click']}
      placement="bottomRight"
      arrow
    >
      <Avatar
        src={"https://avatars.githubusercontent.com/u/120194990?v=4"}
        className="border-2 border-primary cursor-pointer"
        size={40}
      >
        P
      </Avatar>
    </Dropdown>
  );
};

export default UserDropdown;
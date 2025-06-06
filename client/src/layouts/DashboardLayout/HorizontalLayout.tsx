import { Layout } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import ResponsiveSider from "./Slider";
import HeaderLayout from "./Header";
import FooterLayout from "./Footer";
import { Content } from "antd/es/layout/layout";


const HorizontalLayout = () => {

    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout hasSider className="h-screen">
            <ResponsiveSider collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout>
                <HeaderLayout collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content className="px-6 py-6 content overflow-auto">
                    <Outlet />
                </Content>
                <FooterLayout />
            </Layout>
        </Layout>
    );
};

export default HorizontalLayout;

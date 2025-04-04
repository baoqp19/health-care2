import { ConfigProvider, Menu, MenuProps } from "antd";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";
import MenuDashboardConfig from "../../constants/menuDashBoardConfig"

type MenuCustomProps = {
    mode: "inline" | "vertical" | "horizontal";
    isMobile: boolean;
    theme: "light" | "dark";
    onClose: () => void;
};

const MenuCustom: React.FC<MenuCustomProps> = ({ isMobile, onClose, theme = "light", ...props }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = MenuDashboardConfig();

    const findItemByPath = useCallback((items: any[], path: string): any => {
        for (const item of items) {
            if (item.path && item.path.includes(path)) {
                return item;
            }
            if (item.children) {
                const child = findItemByPath(item.children, path);
                if (child) return child;
            }
        }
    }, []);


    const selectedKeys = useMemo(() => {
        const item = findItemByPath(menuItems, location.pathname);
        return item ? [item.key] : [];
    }, [location.pathname, findItemByPath]);

    const handleMenuClick: MenuProps["onClick"] = useCallback(
        (e: any) => {
            if (isMobile) {
                onClose();
            }
            if (e.item?.props?.path) {
                navigate(e.item.props.path);
            }
        },
        [isMobile, onClose, navigate]
    );

    return (
        <ConfigProvider
            theme={{
                token: {
                    controlHeight: 32,
                },
            }}
        >
            <SimpleBar className="h-full overflow-hidden">
                <Menu
                    theme={theme}
                    selectedKeys={selectedKeys}
                    items={menuItems}
                    rootClassName="!border-none"
                    onClick={handleMenuClick}
                    {...props}
                ></Menu>
            </SimpleBar>
        </ConfigProvider>
    );
};

export default MenuCustom;

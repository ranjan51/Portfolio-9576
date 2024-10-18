import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    NAV_STYLE_FIXED,
    NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
    NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
    THEME_TYPE_LITE
} from '../../constants/ThemeSetting';
import CustomScrollbars from '../../util/CustomScrollbars';
import SidebarLogo from './SidebarLogo';
import "./SidebarContent.css"

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const SidebarContent = ({ sidebarCollapsed, setSidebarCollapsed }: any) => {
    const { navStyle, themeType } = useSelector(({ settings }: any) => settings),
        pathname = useSelector(({ common }: any) => common.pathname),
        getNoHeaderClass = (navStyle: any) => {
            if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
                return 'gx-no-header-notifications';
            }
            return '';
        },
        getNavStyleSubMenuClass = (navStyle: any) => {
            if (navStyle === NAV_STYLE_FIXED) {
                return 'gx-no-header-submenu-popup ant-menu-item-selected';
            }
            return '';
        },
        selectedKeys = pathname.substr(1),
        defaultOpenKeys = selectedKeys.split('/')[1],
        location = useLocation();

    // Hardcoded menu data
    const menusData = {
        data: {
            Menu: [
                {
                    MenuId: 1,
                    MenuTitle: 'Home',
                    IconClass: 'icon icon-apps',
                    path: '/Home',
                },
                {
                    MenuId: 2,
                    MenuTitle: 'Quotes',
                    IconClass: 'icon icon-avatar',
                    subMenu: [
                        {
                            id: 201,
                            SubmenuTitle: 'Quotes List',
                            Url: '/Product',
                            IconClass: 'icon-user-list'
                        },
                        {
                            id: 202,
                            SubmenuTitle: 'Add Quotes',
                            Url: '/Product/add-product',
                            IconClass: 'icon-user-roles'
                        }
                    ]
                }
                // Add more menu items as needed
            ]
        }
    };

    const [openedMenu, setOpenedMenu] = useState<any>(null),
        [selectedMainMenu, setSelectedMainMenu] = useState<string>(''),
        handleMenuClick = (menuId: any) => {
            if (openedMenu === menuId) {
                setOpenedMenu(null);
            } else {
                setOpenedMenu(menuId);
            }
        };

    return (
        <>
            <SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
            <div className="gx-sidebar-content" style={{ maxHeight: 'calc(100vh - 20px)', overflowY: 'auto' }}>
                <div className={` ${getNoHeaderClass(navStyle)}`}>
                </div>

                <CustomScrollbars className="gx-layout-sider-scrollbar">
                    <Menu
                        defaultOpenKeys={[selectedMainMenu.toString()]}
                        selectedKeys={[selectedKeys]}
                        theme={themeType === THEME_TYPE_LITE ? 'light' : 'dark'}
                        mode="inline"
                    >
                        <MenuItemGroup key="main" className="gx-menu-group" title={''}>
                            {menusData?.data?.Menu?.map((menu: any) => (
                                menu?.subMenu ? (
                                    <SubMenu
                                        key={menu?.MenuId}
                                        popupClassName={getNavStyleSubMenuClass(navStyle)}
                                        title={
                                            <span onClick={() => handleMenuClick(menu.MenuId)}>
                                                <i className={menu?.IconClass} />
                                                <span>{menu.MenuTitle}</span>
                                            </span>
                                        }
                                    >
                                        {menu?.subMenu?.map((submenu: any) => (
                                            <Menu.Item
                                                key={submenu.id}
                                                onClick={() => {
                                                    setOpenedMenu(submenu.id);
                                                }}
                                                className={openedMenu === submenu.id ? 'ant-menu-item-selected' : ''}
                                            >
                                                <Link to={submenu.Url}>
                                                    <i className={submenu?.IconClass} />
                                                    <span>{submenu?.SubmenuTitle}</span>
                                                </Link>
                                            </Menu.Item>
                                        ))}
                                    </SubMenu>
                                ) : (
                                    <Menu.Item key={menu?.MenuId}>
                                        <Link to={menu?.path}>
                                            <i className={menu?.IconClass} />
                                            <span>{menu?.MenuTitle}</span>
                                        </Link>
                                    </Menu.Item>
                                )
                            ))}
                        </MenuItemGroup>
                    </Menu>
                </CustomScrollbars>
            </div>
        </>
    );
};

export default React.memo(SidebarContent);

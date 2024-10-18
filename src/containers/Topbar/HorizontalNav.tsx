import { Menu } from 'antd';
import { Link } from 'react-router-dom';
// import IntlMessages from "../../util/IntlMessages";
import {
	NAV_STYLE_ABOVE_HEADER,
	NAV_STYLE_BELOW_HEADER,
	NAV_STYLE_DEFAULT_HORIZONTAL,
	NAV_STYLE_INSIDE_HEADER_HORIZONTAL
} from '../../constants/ThemeSetting';
import { useSelector } from 'react-redux';
import './HorizontalNav.css';

const HorizontalNav = () => {
	const navStyle = useSelector(({ settings }: any) => settings.navStyle);
	const pathname = useSelector(({ common }: any) => common.pathname);

	const getNavStyleSubMenuClass = (navStyle: any) => {
		switch (navStyle) {
			case NAV_STYLE_DEFAULT_HORIZONTAL:
				return 'gx-menu-horizontal gx-submenu-popup-curve';
			case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
				return 'gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve';
			case NAV_STYLE_BELOW_HEADER:
				return 'gx-menu-horizontal gx-submenu-popup-curve gx-below-submenu-popup-curve';
			case NAV_STYLE_ABOVE_HEADER:
				return 'gx-menu-horizontal gx-submenu-popup-curve gx-above-submenu-popup-curve';
			default:
				return 'gx-menu-horizontal';
		}
	};

	const selectedKeys = pathname.substr(1);
	const defaultOpenKeys = selectedKeys.split('/')[1];

	// Hardcoded menu data
	const menusData = {
		data: {
			Menu: [
				{
					MenuTitle: 'Dashboard',
					subMenu: [
						{
							SubmenuTitle: 'Home',
							Url: '/home',
							IconClass: 'icon-home',
						},
						{
							SubmenuTitle: 'Analytics',
							Url: '/analytics',
							IconClass: 'icon-chart',
						},
					],
				},
				{
					MenuTitle: 'Quotes',
					subMenu: [
						{
							SubmenuTitle: 'Quotes List',
							Url: '/products',
							IconClass: 'icon-users',
						},
						{
							SubmenuTitle: 'Add User',
							Url: '/users/add',
							IconClass: 'icon-user-add',
						},
					],
				},
				{
					MenuTitle: 'Settings',
					subMenu: [
						{
							SubmenuTitle: 'Profile',
							Url: '/settings/profile',
							IconClass: 'icon-profile',
						},
						{
							SubmenuTitle: 'Security',
							Url: '/settings/security',
							IconClass: 'icon-shield',
						},
					],
				},
			],
		},
	};

	return (
		<div className="gx-header-horizontal-nav gx-header-horizontal-nav-curve">
			<div className="gx-container">
				<div className="gx-header-horizontal-nav-flex">
					<div className="gx-header-horizontal-nav gx-header-horizontal-nav-curve">
						<div className="gx-container">
							<div className="gx-header-horizontal-nav-flex">
								{menusData?.data?.Menu?.map((menu: any, index: number) => (
									<ul key={index} className="ant-menu-overflow ant-menu ant-menu-root ant-menu-horizontal ant-menu-light" role="menu" data-menu-list="true">
										<li
											className="ant-menu-overflow-item ant-menu-overflow-item-rest ant-menu-submenu ant-menu-submenu-horizontal"
											role="none"
											style={{ opacity: 1, order: -1 }}
										>
											<div role="menuitem" className="ant-menu-submenu-title" title={menu.MenuTitle}>
												{menu?.MenuTitle}
												<ul className="submenu">
													{menu?.subMenu?.map((subMenu: any, subIndex: number) => (
														<li
															key={subIndex}
															className="ant-menu-overflow-item ant-menu-overflow-item-rest ant-menu-submenu ant-menu-submenu-horizontal"
															role="none"
															style={{ zIndex: '5000' }}
														>
															<Link to={subMenu.Url} style={{ fontSize: '12px' }}>
																<i className={subMenu?.IconClass} style={{ marginRight: '10px' }} />
																{subMenu.SubmenuTitle}
															</Link>
														</li>
													))}
												</ul>
											</div>
										</li>
									</ul>
								))}
								<div aria-hidden="true" style={{ display: 'none' }}></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HorizontalNav;

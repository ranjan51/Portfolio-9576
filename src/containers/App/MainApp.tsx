import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import HorizontalDefault from '../Topbar/HorizontalDefault/index';
import HorizontalDark from '../Topbar/HorizontalDark/index';
import InsideHeader from '../Topbar/InsideHeader/index';
import AboveHeader from '../Topbar/AboveHeader/index';

import BelowHeader from '../Topbar/BelowHeader/index';
import Topbar from '../Topbar/index';
import footerText from '../../util/config';
import Customizer from '../Customizer';
import {
	NAV_STYLE_ABOVE_HEADER,
	NAV_STYLE_BELOW_HEADER,
	NAV_STYLE_DARK_HORIZONTAL,
	NAV_STYLE_DEFAULT_HORIZONTAL,
	NAV_STYLE_DRAWER,
	NAV_STYLE_FIXED,
	NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
	NAV_STYLE_MINI_SIDEBAR,
	NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
	NAV_STYLE_NO_HEADER_MINI_SIDEBAR
} from '../../constants/ThemeSetting';
import NoHeaderNotification from '../Topbar/NoHeaderNotification/index';
// import {useRouteMatch} from "react-router-dom";
import { Outlet, useLocation } from 'react-router-dom';
import { updateWindowWidth } from '../../appRedux/actions';
import AppSidebar from './AppSidebar';
import AppRoutes from '../../routes/index';
// import { fetchMenusDataApi } from "../../redux/features/Menus/Menus";
import { log } from 'console';

const { Content, Footer } = Layout;

const getContainerClass = (navStyle: any) => {
	switch (navStyle) {
		case NAV_STYLE_DARK_HORIZONTAL:
			return 'gx-container-wrap';
		case NAV_STYLE_DEFAULT_HORIZONTAL:
			return 'gx-container-wrap';
		case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
			return 'gx-container-wrap';
		case NAV_STYLE_BELOW_HEADER:
			return 'gx-container-wrap';
		case NAV_STYLE_ABOVE_HEADER:
			return 'gx-container-wrap';
		default:
			return '';
	}
};

const getNavStyles = (navStyle: any) => {
	switch (navStyle) {
		case NAV_STYLE_DEFAULT_HORIZONTAL:
			return <HorizontalDefault />;
		case NAV_STYLE_DARK_HORIZONTAL:
			return <HorizontalDark />;
		case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
			return <InsideHeader />;
		case NAV_STYLE_ABOVE_HEADER:
			return <AboveHeader />;
		case NAV_STYLE_BELOW_HEADER:
			return <BelowHeader />;
		case NAV_STYLE_FIXED:
			return <Topbar />;
		case NAV_STYLE_DRAWER:
			return <Topbar />;
		case NAV_STYLE_MINI_SIDEBAR:
			return <Topbar />;
		case NAV_STYLE_NO_HEADER_MINI_SIDEBAR:
			return <NoHeaderNotification />;
		case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR:
			return <NoHeaderNotification />;
		default:
			return null;
	}
};

const MainApp = () => {
	const { navStyle } = useSelector(({ settings }: any) => settings);
	// const match = useRouteMatch();
	const location = useLocation();
	const dispatch = useDispatch();
	const { switchRoleData } = useSelector((state: any) => state.switchRole);

	useEffect(() => {
		window.addEventListener('resize', () => {
			dispatch(updateWindowWidth(window.innerWidth));
		});

		// dispatch(fetchMenusDataApi())
	}, [dispatch, switchRoleData]);

	return (
		<Layout className="gx-app-layout">
			<AppSidebar navStyle={navStyle} />
			<Layout>
				{getNavStyles(navStyle)}
				<Content className={`gx-layout-content ${getContainerClass(navStyle)} `}>
					<div
						style={{
							padding: '10px 24px 0 24px'
						}}
					>
						<Outlet />
					</div>
				</Content>
			</Layout>
			<Customizer />
		</Layout>
	);
};
export default MainApp;

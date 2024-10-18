import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	NAV_STYLE_DRAWER,
	NAV_STYLE_FIXED,
	NAV_STYLE_MINI_SIDEBAR,
	NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
	TAB_SIZE,
	THEME_TYPE_LITE
} from '../../constants/ThemeSetting';

const SidebarLogo = ({ sidebarCollapsed, setSidebarCollapsed }: any) => {
	const { width, themeType } = useSelector(({ settings }: any) => settings);
	let navStyle = useSelector(({ settings }: any) => settings.navStyle);
	if (width < TAB_SIZE && navStyle === NAV_STYLE_FIXED) {
		navStyle = NAV_STYLE_DRAWER;
	}
	return (
		<div className="gx-layout-sider-header">
			{navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR ? (
				<div className="gx-linebar">
					<i
						className={`gx-icon-btn icon icon-${!sidebarCollapsed ? 'menu-unfold' : 'menu-fold'} ${
							themeType !== THEME_TYPE_LITE ? 'gx-text-white' : ''
						}`}
						onClick={() => {
							setSidebarCollapsed(!sidebarCollapsed);
						}}
					/>
				</div>
			) : null}

			<Link to="/realtimedashboard" className="gx-site-logo">
				{navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR && width >= TAB_SIZE ? (
					<img alt="lo" src={'/assets/images/PoetryLogo.png'} />
				) : themeType === THEME_TYPE_LITE ? (
					<img alt="logo1" src={'/assets/images/PoetryLogo.png'} width={70} />
				) : (
					<img alt="logo2" src={'/assets/images/PoetryLogo.png'} width={70} />
				)}
			</Link>
		</div>
	);
};

export default SidebarLogo;

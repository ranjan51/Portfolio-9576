import { useState } from 'react';
import { Button, Dropdown, Layout, Menu, message, Popover, Select } from 'antd';
import Icon from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import SearchBox from '../../../components/layout/SearchBox';
import UserInfo from '../../../components/layout/UserInfo';
import AppNotification from '../../../components/layout/AppNotification';
import MailNotification from '../../../components/layout/MailNotification';
import { toggleCollapsedSideNav } from '../../../appRedux/actions/Setting';

import { TAB_SIZE } from '../../../constants/ThemeSetting';
import HorizontalNav from '../HorizontalNav';
import { Link } from 'react-router-dom';
import SwitchRole from '../../Sidebar/SwitchRole';

const { Header } = Layout;

const Option = Select.Option;
const menu = (
	<Menu onClick={handleMenuClick}>
		<Menu.Item key="1">Products</Menu.Item>
		<Menu.Item key="2">Blog</Menu.Item>
		<Menu.Item key="3">Apps</Menu.Item>
	</Menu>
);

function handleMenuClick() {
	message.info('Click on menu item.');
}

function handleChange(value: any) {}

const AboveHeader = () => {
	const navCollapsed = useSelector(({ common }: any) => common.navCollapsed);
	const width = useSelector(({ common }: any) => common.width);
	const [searchText, setSearchText] = useState('');
	const dispatch = useDispatch();

	const updateSearchChatUser = (evt: any) => {
		setSearchText(evt.target.value);
	};

	return (
		// 10th section
		<div className="gx-header-horizontal gx-header-horizontal-dark gx-above-header-horizontal">
			{width >= TAB_SIZE && (
				<div className="gx-header-horizontal-nav gx-header-horizontal-nav-curve">
					<div className="gx-container">
						<div className="gx-header-horizontal-nav-flex">
							<HorizontalNav />
							{/* <ul className="gx-header-notifications gx-ml-auto">
                <li><span className="gx-pointer gx-d-block"><i className="icon icon-menu-lines"/></span></li>
                <li><span className="gx-pointer gx-d-block"><i className="icon icon-setting"/></span></li>
                <li><span className="gx-pointer gx-d-block"><i className="icon icon-apps-new"/></span></li>
              </ul> */}
						</div>
					</div>
				</div>
			)}

			{/* <div className="gx-header-horizontal-top">
        <div className="gx-container">
          <div className="gx-header-horizontal-top-flex">
            <div className="gx-header-horizontal-top-left">
              <i className="icon icon-alert gx-mr-3"/>
              <p className="gx-mb-0 gx-text-truncate"></p>
            </div>
            <ul className="gx-login-list">
              <li>ssss</li>
              <li>ssss</li>
            </ul>
          </div>
        </div>
      </div> */}

			<Header className="gx-header-horizontal-main">
				<div className="gx-container">
					<div className="gx-header-horizontal-main-flex">
						<div className="gx-d-block gx-d-lg-none gx-linebar gx-mr-xs-3">
							<i
								className="gx-icon-btn icon icon-menu"
								onClick={() => {
									if (width <= TAB_SIZE) {
										dispatch(toggleCollapsedSideNav(!navCollapsed));
									}
								}}
							/>
						</div>
						<Link to="/realtimedashboard" className="gx-d-block gx-d-lg-none gx-pointer gx-mr-xs-3 gx-pt-xs-1 gx-w-logo">
							<img alt="" src="/assets/images/nobg.png" width={90} />
						</Link>
						<Link to="/realtimedashboard" className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo">
							<img alt="" src="/assets/images/nobg.png" width={90} />
						</Link>
						{/* <div className="gx-header-search gx-d-none gx-d-lg-flex">
              <SearchBox styleName="gx-lt-icon-search-bar-lg"
                         placeholder="Search in app..."
                         onChange={updateSearchChatUser}
                         value={searchText}/>

              <Select defaultValue="lucy" style={{width: 120}} onChange={handleChange}>
                <Option value="jack">Products</Option>
                <Option value="lucy">Apps</Option>
                <Option value="Yiminghe">Blogs</Option>
              </Select>
            </div> */}

						<ul className="gx-header-notifications gx-ml-auto">
							<li className="gx-notify gx-notify-search gx-d-inline-block gx-d-lg-none">
								<Popover
									overlayClassName="gx-popover-horizantal"
									placement="bottomRight"
									content={
										<div className="gx-d-flex">
											<Dropdown overlay={menu}>
												<Button>
													Category <Icon type="down" />
												</Button>
											</Dropdown>
											<SearchBox
												styleName="gx-popover-search-bar"
												placeholder="Search in app..."
												onChange={updateSearchChatUser}
												value={searchText}
											/>
										</div>
									}
									trigger="click"
								>
									<span className="gx-pointer gx-d-block">
										<i className="icon icon-search-new" />
									</span>
								</Popover>
							</li>

							<li className="gx-notify">
								<Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={<AppNotification />} trigger="click">
									<span className="gx-pointer gx-d-block">
										<i className="icon icon-notification" />
									</span>
								</Popover>
							</li>

							<li className="gx-msg">
								<Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={<MailNotification />} trigger="click">
									<span className="gx-pointer gx-status-pos gx-d-block">
										<i className="icon icon-chat-new" />
										<span className="gx-status gx-status-rtl gx-small gx-orange" />
									</span>
								</Popover>
							</li>
							<li className="gx-user-nav">
								<SwitchRole />
							</li>
							<li className="gx-user-nav" style={{ marginLeft: '0px' }}>
								<UserInfo />
							</li>
						</ul>
					</div>
				</div>
			</Header>
		</div>
	);
};

export default AboveHeader;

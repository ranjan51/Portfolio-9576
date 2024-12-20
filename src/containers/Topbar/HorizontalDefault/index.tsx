import { Layout, Menu, message, Select } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleCollapsedSideNav } from '../../../appRedux/actions';
import UserInfo from '../../../components/layout/UserInfo';
import { TAB_SIZE } from '../../../constants/ThemeSetting';
import SwitchRole from '../../Sidebar/SwitchRole';
import HorizontalNav from '../HorizontalNav';

const { Header } = Layout;
const Option = Select.Option;
const menu = (
	<Menu onClick={handleMenuClick}>
		<Menu.Item key="1">Products</Menu.Item>
		<Menu.Item key="2">Apps</Menu.Item>
		<Menu.Item key="3">Blogs</Menu.Item>
	</Menu>
);

function handleMenuClick(e: any) {
	message.info('Click on menu item.');
}

function handleChange(value: any) {}

const HorizontalDefault = () => {
	const navCollapsed = useSelector(({ common }: any) => common.navCollapsed);
	const width = useSelector(({ common }: any) => common.width);
	const [searchText, setSearchText] = useState('');
	const dispatch = useDispatch();

	const updateSearchChatUser = (evt: any) => {
		setSearchText(evt.target.value);
	};

	return (
		// 6th section
		<div className="gx-header-horizontal">
			{/* <div className="gx-header-horizontal-top">
        <div className="gx-container">
          <div className="gx-header-horizontal-top-flex">
            <div className="gx-header-horizontal-top-left">
              <i className="icon icon-alert gx-mr-3"/>
              <p className="gx-mb-0 gx-text-truncate"></p>
            </div>
            <ul className="gx-login-list">
              <li>Login</li>
              <li>Signup</li>
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
									dispatch(toggleCollapsedSideNav(!navCollapsed));
								}}
							/>
						</div>
						<Link to="/realtimedashboard" className="gx-d-block gx-d-lg-none gx-pointer gx-w-logo">
							<img alt="" src="/assets/images/nobg.png" width={90} />
						</Link>
						<Link to="/realtimedashboard" className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo">
							<img alt="" src="/assets/images/nobg.png" width={90} />
						</Link>
						<div className="gx-header-search gx-d-none gx-d-lg-flex">
							{/* <SearchBox styleName="gx-lt-icon-search-bar-lg"
                         placeholder="Search in app..."
                         onChange={updateSearchChatUser}
                         value={searchText}/> */}

							{/* <Select defaultValue="lucy" style={{width: 120}} onChange={handleChange}>
                <Option value="jack">Products</Option>
                <Option value="lucy">Apps</Option>
                <Option value="Yiminghe">Blogs</Option>
              </Select> */}
						</div>

						<ul className="gx-header-notifications gx-ml-auto">
							{/* <li className="gx-notify gx-notify-search gx-d-inline-block gx-d-lg-none">
                <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={
                  <div className="gx-d-flex">
                    <Dropdown overlay={menu}>
                      <Button>
                        Category <Icon type="down"/>
                      </Button>
                    </Dropdown>
                    <SearchBox styleName="gx-popover-search-bar"
                               placeholder="Search in app..."
                               onChange={updateSearchChatUser}
                               value={searchText}/>
                  </div>
                } trigger="click">
                  <span className="gx-pointer gx-d-block"><i className="icon icon-search-new"/></span>

                </Popover>
              </li>
              <li className="gx-notify">
                <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={<AppNotification/>}
                         trigger="click">
                  <span className="gx-pointer gx-d-block"><i className="icon icon-notification"/></span>
                </Popover>
              </li>

              <li className="gx-msg">
                <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
                         content={<MailNotification/>} trigger="click">
                <span className="gx-pointer gx-status-pos gx-d-block">
                <i className="icon icon-chat-new"/>
                <span className="gx-status gx-status-rtl gx-small gx-orange"/>
                </span>
                </Popover>
              </li> */}
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
		</div>
	);
};

export default HorizontalDefault;

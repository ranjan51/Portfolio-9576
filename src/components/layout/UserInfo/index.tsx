import { Avatar, Modal, Popover } from 'antd';
import { useEffect, useState } from 'react';
import { CiLogout } from 'react-icons/ci';
import { MdAdminPanelSettings, MdEmail } from 'react-icons/md';
import { SiNamecheap } from 'react-icons/si';
import { decodeToken } from 'react-jwt';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../../../redux/features/auth/Authentication';

const UserInfo = () => {
	const [userData, setUserdata] = useState<any>({});
	const dispatch = useDispatch(); // Initialize useDispatch hook
	const navigate = useNavigate(); // Initialize useNavigate hook
	const status = useSelector((state: any) => state.logout.logoutStatus);
	const { appTokenData } = useSelector((state: any) => state.appToken);

	const { switchRoleData, switchRoleLoading } = useSelector((state: any) => state.switchRole);

	const confirm = Modal.confirm;

	useEffect(() => {
		const myDecodedToken: any = decodeToken(sessionStorage.accessToken);
		setUserdata(myDecodedToken);
	}, [appTokenData.code, switchRoleData.code, switchRoleLoading]);

	useEffect(() => {
		if (status === 'success') {
			sessionStorage.clear();
			navigate('/');
		}
	}, [status, navigate]);

	const [visible, setVisible] = useState(false);

	const handleLogout = async () => {
		setVisible(false);
		confirm({
			title: 'Are you sure you want to log out?',
			okText: 'Yes',
			okType: 'primary',
			cancelText: 'No',
			onOk() {
				dispatch(logoutAction(sessionStorage.caAccessToken));
			},
			onCancel() {}
		});
	};

	const userMenuOptions = (
		<ul className="gx-user-popover">
			<li style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '5px' }}>
				{/* <SiNamecheap size={18} /> {'Sonu Kishor'} */}
				<SiNamecheap size={18} /> {'Sonu Kishor'}
			</li>
			<li style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '5px' }}>
				<MdEmail size={18} /> {'sonuyadav957670@gmail.com'}
				{/* <MdEmail size={18} /> {'Ranjankishor83@gmail.com '} */}
			</li>
			{/* <li style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '5px' }}>
				<MdAdminPanelSettings size={18} /> {'Dummy Admin'}
			</li> */}
			{/* <li
				style={{ backgroundColor: '#f1f5f9', color: 'red', display: 'flex', alignItems: 'center', gap: '2px', width: '100%' }}
				onClick={() => {
					navigate('/');
				}}
			>
				<CiLogout style={{ marginRight: '5px' }} /> Log out
			</li> */}
		</ul>
	);

	return (
		<Popover
			overlayClassName="gx-popover-horizantal"
			placement="bottomRight"
			content={userMenuOptions}
			trigger="click"
			visible={visible}
			onVisibleChange={setVisible}
		>
			{/* <Avatar src={"/assets/images/Mypic.png.jpeg"} className="gx-avatar gx-pointer" alt="" style={{ width: '40px', height: '40px' }} /> */}
			<Avatar src={"/assets/images/sonukishordp.png"} className="gx-avatar gx-pointer" alt="" style={{ width: '40px', height: '40px' }} />
			{/* <Avatar src="/assets/images/sonukishordp.png" className="gx-avatar gx-pointer" alt="" style={{ width: '40px', height: '40px' }} /> */}
		</Popover>
	);
};

export default UserInfo;

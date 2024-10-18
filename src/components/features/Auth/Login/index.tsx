import React, { useMemo, useState } from 'react';
import './loginPage.css';
import { Form, Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import config from '../../../../util/config';
import MailOutlined from '@ant-design/icons/lib/icons/MailOutlined';
import { CiMail } from 'react-icons/ci';

const { Option } = Select;

const countries = [
	{ code: 'US', name: 'United States', flag: 'https://cdn.britannica.com/81/4481-004-660915ED/flag-Stars-and-Stripes-July-4-1912.jpg' },
	{ code: 'IN', name: 'India', flag: 'https://media.istockphoto.com/id/1409466493/vector/india-flag-design-waving-indian-flag-made-of-satin-or-silk-fabric-vector-illustration.jpg?s=612x612&w=0&k=20&c=rTLIf6BF0WRnzCFHQYjJSjknue725U7gcBd_f94W3fM=' },
	{ code: 'UK', name: 'United Kingdom', flag: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg' },
	// Add more countries as needed
];

function LoginPage() {
	const [selectedCountry, setSelectedCountry] = useState(countries[0].code);

	useMemo(() => sessionStorage.clear(), []);

	const navigate = useNavigate();

	const onFinish = (values: any) => {
		navigate('/home');
	};

	const handleCountryChange = (value: string) => {
		setSelectedCountry(value);
	};

	const selectedFlag = countries.find(country => country.code === selectedCountry)?.flag;
	return (
		<div className="loginMaindiv">
			

			<div className="loginCard">
				<div className="loginCardLeft">
					<img alt="" src="/assets/images/goshop.png" className="loginlogo" style={{marginBottom:"10px", width: '80px',height:"80px" }} />

				

					<Form className="loginform" name="basic" initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off">
					
						<Form.Item
							className="countrySelection"
							validateTrigger="onChange"
						>
							<div style={{ display: 'flex', alignItems: 'center' }}>
							
								<Select
									value={selectedCountry}
									onChange={handleCountryChange}
									className="countryDropdown"
									style={{ width: '100%' }}
								>
									{countries.map((country) => (
										<Option key={country.code} value={country.code} label={
											<div style={{ display: 'flex', alignItems: 'center' }}>
												<img src={country.flag} alt="" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
												{country.name}
											</div>
										}>
											<div style={{ display: 'flex', alignItems: 'center' }}>
												<img src={country.flag} alt="" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
												{country.name}
											</div>
										</Option>
									))}
								</Select>
							</div>
						</Form.Item>

						<Form.Item
  name="email"
  validateTrigger="onChange"
  rules={[
    {
      required: true,
      message: 'Please enter your email address',
    },
    {
      type: 'email',
      message: 'Please enter a valid email address!',
    },
  ]}
>
  <Input
    prefix={<CiMail style={{color:"grey", fontSize:20}}/>
	}
    maxLength={150}
    placeholder="Enter email address"
    style={{ marginTop: '0px' }}
    autoFocus
  />
</Form.Item>

						<button type="submit" className="loginbtn">
							<img style={{ margin: '0px 5px' }} src="/assets/images/microimg.png" alt="Login Icon" width={15} />
							LOGIN
						</button>
					</Form>
					<p style={{ marginTop: '10px', width: '200px' }} className="loginFormCopyright">
						{config.footerText}
					</p>
				</div>

				<div style={{display:"flex"}} className="loginCardRight">
					<img src="/assets/images/login.gif" alt="" />
				
					
				
				</div>
			</div>
		</div>
	);
}

export default LoginPage;

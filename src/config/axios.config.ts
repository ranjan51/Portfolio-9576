import { Modal } from 'antd';
import axios from 'axios';
import { differenceInSeconds } from 'date-fns';
import { decodeToken } from 'react-jwt';
import { environment } from '../environments/environment';
import { API_ENDPOINTS } from '../shared/api-endpoints';
import { encryptInput } from '../shared/shared-functions';
const API = axios.create({
	baseURL: environment.APP_API_URL
});
let refreshTokenPromise: Promise<string> | null = null;
const refreshToken = async (): Promise<string> => {
	if (refreshTokenPromise === null) {
		refreshTokenPromise = (async (): Promise<string> => {
			const inputBody = {
				isSwitchRole: false
			};
			const encRefreshToken = encryptInput(sessionStorage?.refreshToken);
			try {
				const result = await API.post(`${API_ENDPOINTS.APP_TOKEN}`, JSON.stringify(inputBody), {
					headers: {
						'Content-Type': 'application/json',
						authtype: 'refresh_token',
						refreshtoken: encRefreshToken,
						'Ocp-Apim-Subscription-Key': ``
					}
				});

				if (result.status === 200) {
					sessionStorage.setItem('accessToken', result.data.data.accessToken);
					sessionStorage.setItem('refreshToken', result.data.data.refreshToken);
					if (result.data.data.caRefreshToken) {
						sessionStorage.setItem('caAccessToken', result.data.data.caAccessToken);
						sessionStorage.setItem('caRefreshToken', result.data.data.caRefreshToken);
					}
					return result.data.data.accessToken;
				} else {
					sessionStorage.clear();
					throw new Error('Token refresh failed');
				}
			} catch (error: any) {
				if (error.response && error.response.data && error.response.data.code === 401) {
					sessionStorage.clear();
					Modal.warning({
						title: 'Your session has timed out!',
						content: `Please login again if necessary.`,
						onOk() {
							setTimeout(() => {
								window.location.href = '/';
							}, 100);
						}
					});
				}
				throw error;
			} finally {
				refreshTokenPromise = null;
			}
		})();
	}

	return refreshTokenPromise;
};

const getBearerToken = async () => {
	try {
		let token = sessionStorage.getItem('accessToken');
		let decodedToken: any = token ? decodeToken(token!) : '';
		if (differenceInSeconds(new Date(decodedToken.exp * 1000), new Date()) <= 0) {
			return refreshToken();
		} else {
			return token;
		}
	} catch (error) {
		return error;
	}
};

API.interceptors.request.use(
	async (config: any) => {
		const token = await getBearerToken();
		if (token) {
			return {
				...config,
				headers: {
					...config.headers,
					Authorization: `Bearer ${token}`,
					'Ocp-Apim-Subscription-Key': ``
				}
			};
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

API.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		if (error?.response?.status === 401) {
			window.location.href = '/401';
		} else if (error?.response?.status === 403) {
			window.location.href = '/403';
		}
		return Promise.reject(error);
	}
);

export default API;

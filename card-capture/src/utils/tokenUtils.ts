import Cookies from 'js-cookie';

const setTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set('accessToken', accessToken, { secure: true });
  Cookies.set('refreshToken', refreshToken, { secure: true });
};

const getAccessToken = () => Cookies.get('accessToken');
const getRefreshToken = () => Cookies.get('refreshToken');

const clearTokens = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};

export default { setTokens, getAccessToken, getRefreshToken, clearTokens };

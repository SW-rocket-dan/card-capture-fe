import tokenUtils from '@/utils/tokenUtils';

const getIsLoggedIn = () => {
  const token = tokenUtils.getAccessToken();

  return !!token;
};

export default { getIsLoggedIn };
